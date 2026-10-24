// FlagForge Service Worker
// Version: 1.0.0
const CACHE_VERSION = "flagforge-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const FLAGS_CACHE = `${CACHE_VERSION}-flags`;
const DATA_CACHE = `${CACHE_VERSION}-data`;
const PAGES_CACHE = `${CACHE_VERSION}-pages`;

const PRECACHE_RESOURCES = [
  "/",
  "/explore",
  "/play",
  "/daily",
  "/compare",
  "/stats",
  "/offline.html",
  "/manifest.webmanifest",
  "/icons/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Maximum entries for dynamic caches to prevent unbounded storage
const MAX_FLAG_ENTRIES = 300;
const MAX_DATA_ENTRIES = 100;

async function trimCache(cacheName, maxEntries) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxEntries) {
      const deleteCount = keys.length - maxEntries;
      for (let i = 0; i < deleteCount; i++) {
        await cache.delete(keys[i]);
      }
    }
  } catch (err) {
    console.warn("[SW] Cache trim error:", err);
  }
}

// 1. Install Event: Precache core shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(async (cache) => {
        // Add individually to tolerate routes still generating in dynamic environments
        for (const url of PRECACHE_RESOURCES) {
          try {
            await cache.add(url);
          } catch (err) {
            console.warn(`[SW] Precache failed for ${url}:`, err);
          }
        }
      })
      .then(() => self.skipWaiting())
  );
});

// 2. Activate Event: Purge old cache versions and claim clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (!name.startsWith(CACHE_VERSION)) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. Fetch Event Routing
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET and chrome-extension / non-http requests
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // A. Flag CDN & Wikimedia Images -> Cache-First Strategy
  if (
    url.hostname === "flagcdn.com" ||
    url.hostname === "upload.wikimedia.org" ||
    url.hostname === "commons.wikimedia.org" ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".webp")
  ) {
    event.respondWith(
      caches.open(FLAGS_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
            trimCache(FLAGS_CACHE, MAX_FLAG_ENTRIES);
          }
          return networkResponse;
        } catch (fetchErr) {
          // If network failed and not in cache, try offline icon placeholder
          return caches.match("/icons/icon.svg");
        }
      })
    );
    return;
  }

  // B. REST Countries, Wikipedia, Weather APIs -> Stale-While-Revalidate Strategy
  if (
    url.hostname === "restcountries.com" ||
    url.hostname === "en.wikipedia.org" ||
    url.hostname === "api.open-meteo.com" ||
    url.pathname.startsWith("/api/")
  ) {
    event.respondWith(
      caches.open(DATA_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);

        const networkFetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
              trimCache(DATA_CACHE, MAX_DATA_ENTRIES);
            }
            return networkResponse;
          })
          .catch((err) => {
            console.warn("[SW] Background API fetch failed:", err);
            return null;
          });

        // Return cached immediately if available, else await network
        return cachedResponse || networkFetchPromise;
      })
    );
    return;
  }

  // C. Static Next.js Bundles & Fonts -> Cache-First
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/fonts/")
  ) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          return cached;
        }
      })
    );
    return;
  }

  // D. HTML Navigation Routes -> Network-First with Cache Fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const cache = await caches.open(PAGES_CACHE);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(async () => {
          // Try matched page in cache
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;

          // Try static home page
          const cachedHome = await caches.match("/");
          if (cachedHome) return cachedHome;

          // Fallback to offline fallback page
          const offlinePage = await caches.match("/offline.html");
          if (offlinePage) return offlinePage;

          return new Response("Offline - FlagForge", {
            headers: { "Content-Type": "text/html" },
          });
        })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request))
  );
});

// 4. Background Sync / Offline Message Listener
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

"use client";

import * as React from "react";
import { WifiOff, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export function PwaPrompt() {
  const [isOffline, setIsOffline] = React.useState(false);
  const [installPrompt, setInstallPrompt] = React.useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = React.useState(false);

  // Register Service Worker
  React.useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            // Periodic update check
            reg.addEventListener("updatefound", () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener("statechange", () => {
                  if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                    console.info("[SW] New version available.");
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.warn("[SW] Registration error:", err);
          });
      });
    }

    // Network connectivity tracking
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
    }

    // PWA Install prompt capture
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstallPrompt(null);
      }
    } catch (err) {
      console.warn("PWA install error:", err);
    }
  };

  return (
    <>
      {/* Offline Status Alert Banner */}
      {isOffline && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-16 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-amber-500/90 text-amber-950 font-medium text-xs sm:text-sm shadow-xl backdrop-blur-md border border-amber-400/40 animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <WifiOff className="h-4 w-4 shrink-0 text-amber-900 animate-pulse" aria-hidden="true" />
          <span>Offline mode active — using cached atlas dataset</span>
        </aside>
      )}

      {/* PWA Install Banner */}
      {installPrompt && !isDismissed && !isOffline && (
        <aside
          role="dialog"
          aria-label="Install application prompt"
          className="fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 p-3 sm:p-4 rounded-xl bg-card/95 text-card-foreground border border-border/80 shadow-2xl backdrop-blur-md max-w-sm animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Download className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold">Install FlagForge</p>
            <p className="text-xs text-muted-foreground truncate">
              Instant offline access & desktop app experience
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button
              size="sm"
              variant="default"
              className="h-8 text-xs font-medium px-2.5"
              onClick={handleInstallClick}
            >
              Install
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
              aria-label="Dismiss install banner"
              onClick={() => setIsDismissed(true)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </aside>
      )}
    </>
  );
}

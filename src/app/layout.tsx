import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/layout/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://flagforge.app"),
  title: {
    template: "%s | FlagForge",
    default: "FlagForge — Interactive World Atlas & Vexillology Arena",
  },
  description:
    "Master world geography, flags, capitals, and country demographics through interactive quizzes, daily challenges, and side-by-side nation comparisons.",
  keywords: [
    "flags",
    "world atlas",
    "vexillology",
    "geography quiz",
    "capitals",
    "countries",
    "flag game",
    "geography game",
  ],
  authors: [{ name: "FlagForge Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flagforge.app",
    title: "FlagForge — Interactive World Atlas & Vexillology Arena",
    description:
      "Master world geography, flags, capitals, and demographics with interactive quizzes and global daily challenges.",
    siteName: "FlagForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlagForge — Interactive World Atlas & Vexillology Arena",
    description:
      "Master world geography, flags, capitals, and demographics with interactive quizzes and global daily challenges.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0f19" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Inline script to prevent theme flash before hydration
const themeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('flagforge-theme');
      var root = document.documentElement;
      root.classList.remove('dark', 'contrast-high');
      if (theme === 'dark') {
        root.classList.add('dark');
      } else if (theme === 'contrast') {
        root.classList.add('dark', 'contrast-high');
      } else if (theme === 'light') {
        // light mode is default
      } else {
        var isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) root.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}

"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "./navbar";
import { MobileTabBar } from "./mobile-tab-bar";
import { Footer } from "./footer";

// Not needed for first paint: load the palette on first open and the install prompt after hydration.
const CommandPalette = dynamic(() => import("./command-palette").then((m) => m.CommandPalette), {
  ssr: false,
});
const PwaPrompt = dynamic(() => import("./pwa-prompt").then((m) => m.PwaPrompt), { ssr: false });

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);
  // Mount the palette only once it has been opened; keep it mounted afterwards.
  const [paletteLoaded, setPaletteLoaded] = React.useState(false);
  const openPalette = React.useCallback((open: boolean) => {
    if (open) setPaletteLoaded(true);
    setCommandPaletteOpen(open);
  }, []);

  // Global shortcut lives here so Ctrl/Cmd+K works before the palette chunk has loaded.
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteLoaded(true);
        setCommandPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Skip to Main Content Link for WCAG 2.2 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-[var(--ring)]"
      >
        Skip to main content
      </a>

      {/* Top Desktop Navigation */}
      <Navbar onOpenCommandPalette={() => openPalette(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Global Command Palette */}
      {paletteLoaded && (
        <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      )}

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar />

      {/* PWA Offline & Install Prompt */}
      <PwaPrompt />
    </div>
  );
}

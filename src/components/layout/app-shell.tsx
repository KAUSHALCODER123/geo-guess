"use client";

import * as React from "react";
import { Navbar } from "./navbar";
import { MobileTabBar } from "./mobile-tab-bar";
import { CommandPalette } from "./command-palette";
import { Footer } from "./footer";
import { PwaPrompt } from "./pwa-prompt";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false);

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
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {children}
      </main>

      {/* Global Command Palette */}
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Tab Bar */}
      <MobileTabBar />

      {/* PWA Offline & Install Prompt */}
      <PwaPrompt />
    </div>
  );
}

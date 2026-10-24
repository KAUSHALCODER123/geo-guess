import * as React from "react";
import Link from "next/link";
import { Compass, ExternalLink, Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 backdrop-blur-xs text-muted-foreground transition-colors mt-auto pb-16 md:pb-0">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/20">
                <Compass className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-foreground tracking-tight text-lg">
                FlagForge
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              The premier interactive world atlas and competitive vexillology arena. Master global
              geography, sovereign flags, capitals, and demographics with rich cartographic data.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground font-mono">
              <Globe2 className="h-3.5 w-3.5 text-primary" />
              <span>Covering 250+ nations, territories, and dependencies</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="hover:text-primary transition-colors">
                  Explore Countries
                </Link>
              </li>
              <li>
                <Link href="/play" className="hover:text-primary transition-colors">
                  Flag Quiz Arena
                </Link>
              </li>
              <li>
                <Link href="/daily" className="hover:text-primary transition-colors">
                  Daily Challenge
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  Compare Nations
                </Link>
              </li>
              <li>
                <Link href="/design" className="hover:text-primary transition-colors">
                  Design System Spec
                </Link>
              </li>
            </ul>
          </div>

          {/* Data Sources & Attribution */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Data Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://restcountries.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>REST Countries v3.1</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.wikipedia.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>Wikipedia & Wikimedia</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  <span>Open-Meteo Weather API</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>

            {/* Keyboard Shortcuts Hint */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-muted-foreground block">
                Press{" "}
                <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px] border border-border">
                  ⌘K
                </kbd>{" "}
                to search anytime
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© {new Date().getFullYear()} FlagForge. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">WCAG 2.2 AA Compliant</span>
            <span>•</span>
            <span className="font-mono text-[11px]">Next.js 15 App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

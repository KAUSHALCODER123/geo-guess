"use client";

import * as React from "react";
import { Moon, Sun, Contrast, Monitor } from "lucide-react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export type Theme = "light" | "dark" | "contrast" | "system";

function applyThemeToDocument(newTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.remove("dark", "contrast-high");

  if (newTheme === "system") {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) root.classList.add("dark");
  } else if (newTheme === "dark") {
    root.classList.add("dark");
  } else if (newTheme === "contrast") {
    root.classList.add("dark", "contrast-high");
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("flagforge-theme") as Theme | null;
    if (stored) {
      setTheme(stored);
      applyThemeToDocument(stored);
    } else {
      // Check system preference
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = isDark ? "dark" : "light";
      setTheme(initialTheme);
      applyThemeToDocument(initialTheme);
    }
  }, []);

  const handleSelectTheme = (selected: Theme) => {
    setTheme(selected);
    localStorage.setItem("flagforge-theme", selected);
    applyThemeToDocument(selected);
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        className="h-9 w-9 text-muted-foreground"
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Current theme: ${theme}. Click to change theme.`}
          className="h-9 w-9 text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
        >
          {theme === "light" && <Sun className="h-4 w-4 text-amber-500" />}
          {theme === "dark" && <Moon className="h-4 w-4 text-sky-400" />}
          {theme === "contrast" && <Contrast className="h-4 w-4 text-yellow-400" />}
          {theme === "system" && <Monitor className="h-4 w-4 text-muted-foreground" />}
        </Button>
      </DropdownMenuPrimitive.Trigger>

      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={8}
          className="z-50 min-w-[9rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-80"
        >
          <DropdownMenuPrimitive.Item
            onClick={() => handleSelectTheme("light")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none hover:bg-muted focus:bg-muted text-foreground transition-colors"
          >
            <Sun className="h-4 w-4 text-amber-500" />
            <span>Light</span>
            {theme === "light" && <span className="ml-auto text-xs font-bold text-primary">✓</span>}
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={() => handleSelectTheme("dark")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none hover:bg-muted focus:bg-muted text-foreground transition-colors"
          >
            <Moon className="h-4 w-4 text-sky-400" />
            <span>Dark</span>
            {theme === "dark" && <span className="ml-auto text-xs font-bold text-primary">✓</span>}
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={() => handleSelectTheme("contrast")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none hover:bg-muted focus:bg-muted text-foreground transition-colors"
          >
            <Contrast className="h-4 w-4 text-yellow-400" />
            <span>High Contrast</span>
            {theme === "contrast" && (
              <span className="ml-auto text-xs font-bold text-primary">✓</span>
            )}
          </DropdownMenuPrimitive.Item>

          <DropdownMenuPrimitive.Item
            onClick={() => handleSelectTheme("system")}
            className="relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm outline-none hover:bg-muted focus:bg-muted text-foreground transition-colors"
          >
            <Monitor className="h-4 w-4 text-muted-foreground" />
            <span>System</span>
            {theme === "system" && (
              <span className="ml-auto text-xs font-bold text-primary">✓</span>
            )}
          </DropdownMenuPrimitive.Item>
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Compass,
  Trophy,
  Calendar,
  Layers,
  BarChart3,
  Palette,
  ArrowRight,
  Sun,
  Moon,
  Contrast,
  Sparkles,
} from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Game Modes" | "Countries" | "Settings";
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Global keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const navigateTo = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  const setTheme = (themeName: string) => {
    const root = document.documentElement;
    root.classList.remove("dark", "contrast-high");
    if (themeName === "dark") root.classList.add("dark");
    if (themeName === "contrast") root.classList.add("dark", "contrast-high");
    localStorage.setItem("flagforge-theme", themeName);
    onOpenChange(false);
  };

  const allItems: CommandItem[] = React.useMemo(
    () => [
      // Navigation
      {
        id: "nav-home",
        title: "Home",
        subtitle: "Return to FlagForge home & live statistics",
        category: "Navigation",
        icon: <Compass className="h-4 w-4 text-primary" />,
        action: () => navigateTo("/"),
      },
      {
        id: "nav-explore",
        title: "Explore Nations",
        subtitle: "Browse 250+ world atlas entries and flags",
        category: "Navigation",
        icon: <Compass className="h-4 w-4 text-sky-400" />,
        action: () => navigateTo("/explore"),
      },
      {
        id: "nav-quiz",
        title: "Flag Quiz",
        subtitle: "Test your vexillology knowledge",
        category: "Navigation",
        icon: <Trophy className="h-4 w-4 text-amber-500" />,
        action: () => navigateTo("/quiz"),
        badge: "Popular",
      },
      {
        id: "nav-daily",
        title: "Daily Challenge",
        subtitle: "Compete in today's 10-question global round",
        category: "Navigation",
        icon: <Calendar className="h-4 w-4 text-emerald-500" />,
        action: () => navigateTo("/daily"),
        badge: "Daily",
      },
      {
        id: "nav-compare",
        title: "Compare Countries",
        subtitle: "Side-by-side geographic & demographic showdown",
        category: "Navigation",
        icon: <Layers className="h-4 w-4 text-indigo-400" />,
        action: () => navigateTo("/compare"),
      },
      {
        id: "nav-stats",
        title: "Personal Statistics",
        subtitle: "Review your win rates, streaks, and achievements",
        category: "Navigation",
        icon: <BarChart3 className="h-4 w-4 text-rose-400" />,
        action: () => navigateTo("/stats"),
      },
      {
        id: "nav-design",
        title: "Design System Showcase",
        subtitle: "Inspect themed UI primitives, typography, and tokens",
        category: "Navigation",
        icon: <Palette className="h-4 w-4 text-purple-400" />,
        action: () => navigateTo("/design"),
      },

      // Game Modes
      {
        id: "mode-sprint",
        title: "World Flag Sprint",
        subtitle: "60-second rapid-fire flag identification",
        category: "Game Modes",
        icon: <Sparkles className="h-4 w-4 text-amber-400" />,
        action: () => navigateTo("/quiz?mode=sprint"),
      },
      {
        id: "mode-capitals",
        title: "Capital City Match",
        subtitle: "Pair sovereign nations with their capital cities",
        category: "Game Modes",
        icon: <Trophy className="h-4 w-4 text-sky-400" />,
        action: () => navigateTo("/quiz?mode=capitals"),
      },
      {
        id: "mode-highlow",
        title: "Higher or Lower",
        subtitle: "Compare populations and landmasses",
        category: "Game Modes",
        icon: <Layers className="h-4 w-4 text-teal-400" />,
        action: () => navigateTo("/quiz?mode=higher-lower"),
      },

      // Featured Countries
      {
        id: "country-jpn",
        title: "Japan (Nihon)",
        subtitle: "Asia • Tokyo • 125M population",
        category: "Countries",
        icon: <span className="text-sm">🇯🇵</span>,
        action: () => navigateTo("/country/JPN"),
      },
      {
        id: "country-fra",
        title: "France",
        subtitle: "Europe • Paris • 68M population",
        category: "Countries",
        icon: <span className="text-sm">🇫🇷</span>,
        action: () => navigateTo("/country/FRA"),
      },
      {
        id: "country-bra",
        title: "Brazil (Brasil)",
        subtitle: "Americas • Brasília • 214M population",
        category: "Countries",
        icon: <span className="text-sm">🇧🇷</span>,
        action: () => navigateTo("/country/BRA"),
      },
      {
        id: "country-ind",
        title: "India (Bharat)",
        subtitle: "Asia • New Delhi • 1.4B population",
        category: "Countries",
        icon: <span className="text-sm">🇮🇳</span>,
        action: () => navigateTo("/country/IND"),
      },
      {
        id: "country-can",
        title: "Canada",
        subtitle: "Americas • Ottawa • 38M population",
        category: "Countries",
        icon: <span className="text-sm">🇨🇦</span>,
        action: () => navigateTo("/country/CAN"),
      },

      // Settings
      {
        id: "set-dark",
        title: "Theme: Oceanic Dark",
        subtitle: "Switch to deep indigo & navy dark mode",
        category: "Settings",
        icon: <Moon className="h-4 w-4 text-sky-400" />,
        action: () => setTheme("dark"),
      },
      {
        id: "set-light",
        title: "Theme: Parchment Light",
        subtitle: "Switch to high-clarity daylight theme",
        category: "Settings",
        icon: <Sun className="h-4 w-4 text-amber-500" />,
        action: () => setTheme("light"),
      },
      {
        id: "set-contrast",
        title: "Theme: High Contrast",
        subtitle: "Maximum WCAG contrast with vibrant yellow focus",
        category: "Settings",
        icon: <Contrast className="h-4 w-4 text-yellow-400" />,
        action: () => setTheme("contrast"),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return allItems;
    const lower = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(lower)) ||
        item.category.toLowerCase().includes(lower)
    );
  }, [allItems, query]);

  // Reset selected index on filter
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Handle keyboard navigation within list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev <= 0 ? filteredItems.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] rounded-xl border border-border bg-card shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          {/* Accessible Title */}
          <DialogPrimitive.Title className="sr-only">
            Navigation and Command Palette
          </DialogPrimitive.Title>

          {/* Search Header */}
          <div className="flex items-center border-b border-border px-4 py-3 bg-card">
            <Search className="h-5 w-5 text-muted-foreground shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, nation, or quiz mode..."
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground outline-none border-none focus:ring-0"
              autoFocus
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground border border-border font-mono">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                No matching destinations found for &quot;{query}&quot;
              </div>
            ) : (
              filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => item.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors select-none",
                      isSelected
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md border shrink-0 transition-colors",
                        isSelected
                          ? "border-primary/40 bg-card text-primary shadow-xs"
                          : "border-border bg-muted/60"
                      )}
                    >
                      {item.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground truncate">{item.title}</span>
                        {item.badge && (
                          <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent uppercase tracking-wider">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.subtitle && (
                        <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                      )}
                    </div>

                    <span className="text-[11px] text-muted-foreground/80 uppercase font-mono tracking-wider shrink-0 hidden sm:inline">
                      {item.category}
                    </span>

                    {isSelected && <ArrowRight className="h-4 w-4 text-primary shrink-0" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer Controls Hint */}
          <div className="flex items-center justify-between border-t border-border/60 bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">
                  ↑
                </kbd>
                <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">
                  ↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] border border-border">
                  ↵
                </kbd>
                Select
              </span>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground/70">FlagForge v1.0</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

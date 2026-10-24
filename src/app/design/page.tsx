"use client";

import * as React from "react";
import { Compass, Trophy, Flame, Globe, Sparkles, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { useToast } from "@/components/ui/toast";

import { PageHeader } from "@/components/common/page-header";
import { StatCard } from "@/components/common/stat-card";
import { FlagImage } from "@/components/common/flag-image";
import { CountryChip } from "@/components/common/country-chip";
import { fireConfetti } from "@/components/common/confetti-burst";

export default function DesignShowcasePage() {
  const { toast } = useToast();

  // Input state
  const [searchValue, setSearchValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState("FlagForge Explorer");
  const [hasInputError, setHasInputError] = React.useState(false);

  // Button loading state
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);

  // Progress state
  const [progressVal, setProgressVal] = React.useState(68);

  // Sheet side
  const [sheetSide, setSheetSide] = React.useState<"right" | "left" | "top" | "bottom">("right");

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Page Header */}
      <PageHeader
        title="FlagForge Design System Showcase"
        description="Comprehensive living catalog of accessible primitives, design tokens, and cartographic components supporting Light, Oceanic Dark, and High-Contrast modes."
        badge={<Badge variant="accent">v1.0.0 Spec</Badge>}
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              fireConfetti({ particleCount: 100, spread: 90 });
              toast({
                title: "Vexillology Fireworks!",
                description: "Confetti triggered while honoring reduced-motion preferences.",
                variant: "success",
              });
            }}
          >
            <Sparkles className="h-4 w-4 mr-1.5 text-accent" />
            Fire Celebration Confetti
          </Button>
        }
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. COLOR TOKENS & SYSTEM PALETTE */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">1. Color Tokens & Mode Scale</h2>
          <p className="text-sm text-muted-foreground">
            Built with HSL CSS variables configured for dark oceanic navy, daylight parchment, and
            7:1+ high contrast.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
            <div className="h-10 w-full rounded bg-primary" />
            <div className="text-xs">
              <span className="font-semibold block text-foreground">Primary</span>
              <span className="text-muted-foreground font-mono text-[10px]">--primary</span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
            <div className="h-10 w-full rounded bg-accent" />
            <div className="text-xs">
              <span className="font-semibold block text-foreground">Accent</span>
              <span className="text-muted-foreground font-mono text-[10px]">--accent</span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
            <div className="h-10 w-full rounded bg-secondary" />
            <div className="text-xs">
              <span className="font-semibold block text-foreground">Secondary</span>
              <span className="text-muted-foreground font-mono text-[10px]">--secondary</span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
            <div className="h-10 w-full rounded bg-muted" />
            <div className="text-xs">
              <span className="font-semibold block text-foreground">Muted</span>
              <span className="text-muted-foreground font-mono text-[10px]">--muted</span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
            <div className="h-10 w-full rounded bg-destructive" />
            <div className="text-xs">
              <span className="font-semibold block text-foreground">Destructive</span>
              <span className="text-muted-foreground font-mono text-[10px]">--destructive</span>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3 space-y-2 bg-card">
            <div className="h-10 w-full rounded bg-card border border-border" />
            <div className="text-xs">
              <span className="font-semibold block text-foreground">Card Surface</span>
              <span className="text-muted-foreground font-mono text-[10px]">--card</span>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. BUTTONS & INTERACTIVE STATES */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">2. Button Primitives</h2>
          <p className="text-sm text-muted-foreground">
            All variants support loading spinners (`aria-busy`), icons, disabled states, and WCAG
            focus rings.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Variants */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Variants
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">Primary Default</Button>
                <Button variant="accent">Accent Terracotta</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link Style</Button>
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                Sizes
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small (sm)</Button>
                <Button size="md">Medium (md)</Button>
                <Button size="lg">Large (lg)</Button>
                <Button size="icon" aria-label="Icon only button">
                  <Compass className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* States & Icons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
                States & Icons
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  isLoading={isButtonLoading}
                  onClick={() => {
                    setIsButtonLoading(true);
                    setTimeout(() => setIsButtonLoading(false), 2000);
                  }}
                >
                  {isButtonLoading ? "Simulating Request..." : "Click to Test Loading State"}
                </Button>

                <Button disabled>Disabled State</Button>

                <Button leftIcon={<Trophy className="h-4 w-4 text-amber-400" />}>Left Icon</Button>

                <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Right Icon</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. INPUTS & FORM CONTROLS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">3. Form Inputs & Select</h2>
          <p className="text-sm text-muted-foreground">
            Accessible inputs with clear buttons, search icons, error state validations, and Radix
            Select.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Text Inputs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search variant with clear */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Search Variant (with auto-clear)
                </label>
                <Input
                  isSearch
                  placeholder="Search countries, capitals, continents..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue("")}
                />
              </div>

              {/* Standard input with error toggle */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Input Validation State
                  </label>
                  <button
                    type="button"
                    onClick={() => setHasInputError(!hasInputError)}
                    className="text-xs text-primary hover:underline"
                  >
                    {hasInputError ? "Clear Error" : "Trigger Error State"}
                  </button>
                </div>
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  error={
                    hasInputError ? "Invalid country identifier or territory code." : undefined
                  }
                />
              </div>

              {/* Disabled input */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Disabled Field
                </label>
                <Input disabled value="Read-only ISO alpha-3 code (e.g. FRA)" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Radix Select Dropdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Filter by UN Continental Region
                </label>
                <Select defaultValue="europe">
                  <SelectTrigger aria-label="Select continent">
                    <SelectValue placeholder="Choose a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Continents</SelectLabel>
                      <SelectItem value="africa">Africa (54 Nations)</SelectItem>
                      <SelectItem value="americas">Americas (35 Nations)</SelectItem>
                      <SelectItem value="asia">Asia (50 Nations)</SelectItem>
                      <SelectItem value="europe">Europe (44 Nations)</SelectItem>
                      <SelectItem value="oceania">Oceania (14 Nations)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">
                  Select Game Difficulty
                </label>
                <Select defaultValue="normal">
                  <SelectTrigger aria-label="Select difficulty">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual (Untimed)</SelectItem>
                    <SelectItem value="normal">Standard (20s per question)</SelectItem>
                    <SelectItem value="hard">Grandmaster (10s blitz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. TABS & PROGRESS CONTROLS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">4. Tabs & Progress Indicator</h2>
          <p className="text-sm text-muted-foreground">
            Radix Tabs and Progress bar with ARIA role=&quot;progressbar&quot; and color variants.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="geography">Geography</TabsTrigger>
                <TabsTrigger value="demographics">Demographics</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4 text-sm text-muted-foreground">
                The Overview tab summarizes key national identity markers, including the sovereign
                flag, capital city, official languages, and currency specifications.
              </TabsContent>
              <TabsContent value="geography" className="pt-4 text-sm text-muted-foreground">
                Geographic details include lat/long coordinates, total surface area in km²,
                bordering neighboring nations, and landlocked status.
              </TabsContent>
              <TabsContent value="demographics" className="pt-4 text-sm text-muted-foreground">
                Demographic indicators include census population estimates, UN membership status,
                and regional classification.
              </TabsContent>
            </Tabs>

            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-foreground">
                  Interactive Progress: {progressVal}%
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => setProgressVal((p) => Math.max(0, p - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs"
                    onClick={() => setProgressVal((p) => Math.min(100, p + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </div>
              <Progress value={progressVal} variant="default" />
              <Progress value={progressVal} variant="accent" />
              <Progress value={progressVal} variant="success" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. MODAL DIALOGS, SHEETS, TOOLTIPS, & TOASTS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            5. Overlays, Dialogs, Tooltips & Toasts
          </h2>
          <p className="text-sm text-muted-foreground">
            Accessible Radix Dialog, slide-over Sheet, Tooltips with delay, and dynamic alert
            toasts.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dialog Trigger */}
              <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground">Accessible Dialog</h3>
                <p className="text-xs text-muted-foreground">
                  Traps keyboard focus, listens for Escape key, backdrop blur.
                </p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                      Open Modal Dialog
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Vexillology Rule of Tincture</DialogTitle>
                      <DialogDescription>
                        A foundational heraldic rule stating that metal should not be put on metal,
                        nor color on color.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-2 text-sm text-muted-foreground">
                      Metals include Or (gold/yellow) and Argent (white/silver). Colors include
                      Gules (red), Azure (blue), Vert (green), and Sable (black).
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="secondary" size="sm">
                          Close
                        </Button>
                      </DialogClose>
                      <Button variant="accent" size="sm">
                        Acknowledge
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Slide-over Sheet */}
              <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground">Slide-over Sheet</h3>
                <p className="text-xs text-muted-foreground">
                  Slide-over drawer for country side panels and navigation filters.
                </p>
                <div className="flex items-center gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="secondary" size="sm" onClick={() => setSheetSide("right")}>
                        Open Side Sheet
                      </Button>
                    </SheetTrigger>
                    <SheetContent side={sheetSide}>
                      <SheetHeader>
                        <SheetTitle>Country Quick Inspector</SheetTitle>
                        <SheetDescription>
                          Viewing detailed metadata for Japan (JPN).
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-4 space-y-4">
                        <FlagImage countryCode="jp" countryName="Japan" />
                        <div className="text-xs space-y-2 text-muted-foreground">
                          <p>
                            <strong>Capital:</strong> Tokyo
                          </p>
                          <p>
                            <strong>Region:</strong> Asia (Eastern Asia)
                          </p>
                          <p>
                            <strong>Population:</strong> 125,836,021
                          </p>
                          <p>
                            <strong>Currencies:</strong> Japanese yen (¥)
                          </p>
                        </div>
                      </div>
                      <SheetFooter>
                        <SheetClose asChild>
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>

              {/* Toasts and Tooltips */}
              <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground">Toasts & Tooltip</h3>
                <p className="text-xs text-muted-foreground">
                  Trigger alert notifications and inspect hover tooltips.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="sm">
                          Hover for Tooltip
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ISO 3166-1 Alpha-3 Geographic Standard</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      toast({
                        title: "Streak Extended!",
                        description: "You answered 5 consecutive flag questions correctly.",
                        variant: "success",
                      })
                    }
                  >
                    Success Toast
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      toast({
                        title: "Quiz Out of Sync",
                        description: "Lost contact with daily challenge timer. Retrying...",
                        variant: "error",
                      })
                    }
                  >
                    Error Toast
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. BADGES, SKELETONS, EMPTY & ERROR STATES */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            6. Badges, Skeletons, Empty & Error States
          </h2>
          <p className="text-sm text-muted-foreground">
            Status indicators and fallback patterns for network states and zero-data scenarios.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success" dot>
            Success
          </Badge>
          <Badge variant="warning" dot>
            Warning
          </Badge>
          <Badge variant="destructive" dot>
            Destructive
          </Badge>
          <Badge size="sm" variant="default">
            Small Badge
          </Badge>
        </div>

        {/* Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg space-y-3 bg-card">
            <span className="text-xs text-muted-foreground">Flag Card Loading Skeleton</span>
            <Skeleton className="h-28 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>

          {/* Empty State Preview */}
          <EmptyState
            title="No Nations Filtered"
            description="Adjust your search query or continent filters to discover more atlas entries."
            action={
              <Button size="sm" variant="outline">
                Clear Filters
              </Button>
            }
          />

          {/* Error State Preview */}
          <ErrorState
            title="Cartographic Feed Disrupted"
            message="Could not establish connection to the country registry."
            onRetry={() => {
              toast({
                title: "Retry Triggered",
                description: "Reconnecting to REST Countries repository...",
                variant: "info",
              });
            }}
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. REUSABLE COMMON PATTERNS */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">7. Common Atlas Patterns</h2>
          <p className="text-sm text-muted-foreground">
            Domain-specific components: StatCard, FlagImage, and CountryChip.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Sovereign Nations"
            value="195"
            icon={<Globe className="h-4 w-4" />}
            trend={{ value: "UN Member States", isNeutral: true }}
          />
          <StatCard
            label="Global Win Rate"
            value="78.4%"
            icon={<Trophy className="h-4 w-4" />}
            trend={{ value: "+4.2% this week", isPositive: true }}
          />
          <StatCard
            label="Longest Streak"
            value="14 Days"
            icon={<Flame className="h-4 w-4" />}
            trend={{ value: "Personal Best", isPositive: true }}
          />
          <StatCard
            label="Avg Response Time"
            value="2.8s"
            icon={<Compass className="h-4 w-4" />}
            trend={{ value: "-0.4s faster", isPositive: true }}
          />
        </div>

        {/* Flag Images & Country Chips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Flags & Country Chips</CardTitle>
            <CardDescription>
              Flags render with subtle micro-borders so white flag fields don&apos;t blend into
              light mode.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">Japan (JPN)</span>
                <FlagImage countryCode="jp" countryName="Japan" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">Finland (FIN)</span>
                <FlagImage countryCode="fi" countryName="Finland" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">Brazil (BRA)</span>
                <FlagImage countryCode="br" countryName="Brazil" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">South Africa (ZAF)</span>
                <FlagImage countryCode="za" countryName="South Africa" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">Canada (CAN)</span>
                <FlagImage countryCode="ca" countryName="Canada" />
              </div>
              <div>
                <span className="text-xs text-muted-foreground mb-1 block">
                  Fallback Error Test
                </span>
                <FlagImage countryCode="xyz" countryName="Unknown Territory" />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <span className="text-xs font-semibold text-muted-foreground block">
                Country Chips (Interactive navigation pills)
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <CountryChip name="Japan" cca2="jp" cca3="JPN" region="Asia" />
                <CountryChip name="France" cca2="fr" cca3="FRA" region="Europe" />
                <CountryChip name="Brazil" cca2="br" cca3="BRA" region="Americas" />
                <CountryChip name="Kenya" cca2="ke" cca3="KEN" region="Africa" />
                <CountryChip name="Australia" cca2="au" cca3="AUS" region="Oceania" />
                <CountryChip name="Non-link Chip" cca3="ABC" asLink={false} size="sm" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

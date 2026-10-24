"use client";

import * as React from "react";
import {
  LayoutGrid,
  List,
  SlidersHorizontal,
  Share2,
  Check,
  RotateCcw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/components/ui/toast";
import type {
  ExplorerFilterState,
  SortOption,
  LandlockedFilter,
  UNMemberFilter,
} from "./types";
import { cn } from "@/lib/utils";

export interface ExplorerFilterBarProps {
  filterState: ExplorerFilterState;
  onFilterChange: <K extends keyof ExplorerFilterState>(
    key: K,
    value: ExplorerFilterState[K]
  ) => void;
  onClearFilters: () => void;
  isFiltered: boolean;
  availableRegions: string[];
  availableSubregions: string[];
  totalCount: number;
  matchCount: number;
}

export function ExplorerFilterBar({
  filterState,
  onFilterChange,
  onClearFilters,
  isFiltered,
  availableRegions,
  availableSubregions,
  totalCount,
  matchCount,
}: ExplorerFilterBarProps) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      toast({
        title: "Filter saved & copied!",
        description: "Shareable link copied to clipboard.",
        variant: "success",
      });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handlePopulationSliderChange = (vals: number[]) => {
    onFilterChange("minPopulation", vals[0]);
    onFilterChange("maxPopulation", vals[1]);
  };

  const formatPopDisplay = (val: number) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`;
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`;
    return String(val);
  };

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card/95 p-4 shadow-sm backdrop-blur-md sm:p-5 lg:sticky lg:top-20 lg:z-20">
      {/* Primary Row: Search Bar, Region, Sort, and View Mode */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            isSearch
            placeholder="Search by country, capital, official name, or cca3 (e.g. FRA)..."
            value={filterState.searchQuery}
            onChange={(e) => onFilterChange("searchQuery", e.target.value)}
            onClear={() => onFilterChange("searchQuery", "")}
            aria-label="Search countries"
          />
        </div>

        {/* Region Select */}
        <div className="w-full sm:w-48">
          <Select
            value={filterState.region}
            onValueChange={(val) => onFilterChange("region", val)}
          >
            <SelectTrigger aria-label="Filter by Region">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {availableRegions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Select */}
        <div className="w-full sm:w-48">
          <Select
            value={filterState.sortBy}
            onValueChange={(val) => onFilterChange("sortBy", val as SortOption)}
          >
            <SelectTrigger aria-label="Sort Countries">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name_asc">Name (A – Z)</SelectItem>
              <SelectItem value="name_desc">Name (Z – A)</SelectItem>
              <SelectItem value="population_desc">Population (High – Low)</SelectItem>
              <SelectItem value="population_asc">Population (Low – High)</SelectItem>
              <SelectItem value="area_desc">Area (High – Low)</SelectItem>
              <SelectItem value="area_asc">Area (Low – High)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Mode Toggle & Advanced Filters Button */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            type="button"
            variant={showAdvanced ? "secondary" : "outline"}
            size="md"
            onClick={() => setShowAdvanced(!showAdvanced)}
            aria-expanded={showAdvanced}
            aria-label="Toggle advanced filters"
            leftIcon={<SlidersHorizontal className="h-4 w-4" />}
          >
            Filters
            {isFiltered && (
              <span className="ml-1 h-2 w-2 rounded-full bg-primary" />
            )}
          </Button>

          {/* Grid / List Mode */}
          <div className="flex items-center rounded-lg border border-border p-0.5 bg-muted/40">
            <button
              type="button"
              onClick={() => onFilterChange("viewMode", "grid")}
              aria-label="Grid View"
              aria-pressed={filterState.viewMode === "grid"}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                filterState.viewMode === "grid"
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onFilterChange("viewMode", "list")}
              aria-label="List View"
              aria-pressed={filterState.viewMode === "list"}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                filterState.viewMode === "list"
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Expandable Drawer */}
      {showAdvanced && (
        <div className="pt-4 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in-50 duration-200">
          {/* Subregion Filter */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Subregion
            </label>
            <Select
              value={filterState.subregion}
              onValueChange={(val) => onFilterChange("subregion", val)}
              disabled={availableSubregions.length === 0}
            >
              <SelectTrigger aria-label="Filter by Subregion">
                <SelectValue placeholder="All Subregions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subregions</SelectItem>
                {availableSubregions.map((subregion) => (
                  <SelectItem key={subregion} value={subregion}>
                    {subregion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Landlocked Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Coastline Status
            </label>
            <Select
              value={filterState.landlocked}
              onValueChange={(val) => onFilterChange("landlocked", val as LandlockedFilter)}
            >
              <SelectTrigger aria-label="Filter by Coastline">
                <SelectValue placeholder="All Coastlines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Nations</SelectItem>
                <SelectItem value="landlocked">Landlocked Only</SelectItem>
                <SelectItem value="coastal">Coastal Nations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* UN Member Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              UN Membership
            </label>
            <Select
              value={filterState.unMember}
              onValueChange={(val) => onFilterChange("unMember", val as UNMemberFilter)}
            >
              <SelectTrigger aria-label="Filter by UN Membership">
                <SelectValue placeholder="All Memberships" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                <SelectItem value="member">UN Members Only</SelectItem>
                <SelectItem value="non-member">Non-members / Territories</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Population Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                Population
              </span>
              <span className="font-mono text-muted-foreground font-medium">
                {formatPopDisplay(filterState.minPopulation)} –{" "}
                {formatPopDisplay(filterState.maxPopulation)}
              </span>
            </div>
            <div className="pt-2">
              <Slider
                value={[filterState.minPopulation, filterState.maxPopulation]}
                min={0}
                max={1_500_000_000}
                step={5_000_000}
                onValueChange={handlePopulationSliderChange}
                aria-label="Population range"
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: Results Count, Clear Filters, and Save Filter Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/30 text-xs text-muted-foreground">
        <div>
          Showing <span className="font-bold text-foreground font-mono">{matchCount}</span> of{" "}
          <span className="font-bold text-foreground font-mono">{totalCount}</span> countries
          {isFiltered && <span className="ml-1 text-primary">(filtered)</span>}
        </div>

        <div className="flex items-center gap-2">
          {/* Save Filter / Copy Link */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCopyLink}
            leftIcon={isCopied ? <Check className="h-3.5 w-3.5 text-success" /> : <Share2 className="h-3.5 w-3.5" />}
          >
            {isCopied ? "Link Copied" : "Save Filter"}
          </Button>

          {/* Reset Filters */}
          {isFiltered && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              leftIcon={<RotateCcw className="h-3.5 w-3.5" />}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

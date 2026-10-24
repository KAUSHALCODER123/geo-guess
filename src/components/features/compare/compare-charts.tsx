"use client";

import * as React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { BarChart3, Radar as RadarIcon } from "lucide-react";
import type { Country } from "@/types";

export interface CompareChartsProps {
  countries: Country[];
}

const COUNTRY_COLORS = ["#3b82f6", "#10b981", "#f59e0b"];

export function CompareCharts({ countries }: CompareChartsProps) {
  // Bar Chart Data (Population & Area)
  const barData = React.useMemo(() => {
    return countries.map((c) => ({
      name: c.name.common,
      population: c.population,
      area: c.area,
    }));
  }, [countries]);

  // Radar Chart Data (Normalized metrics 0 - 100)
  const radarData = React.useMemo(() => {
    if (countries.length === 0) return [];

    const maxPop = Math.max(...countries.map((c) => c.population), 1);
    const maxArea = Math.max(...countries.map((c) => c.area), 1);
    const maxDensity = Math.max(
      ...countries.map((c) => (c.area > 0 ? c.population / c.area : 0)),
      1
    );
    const maxLanguages = Math.max(
      ...countries.map((c) => Object.keys(c.languages || {}).length),
      1
    );
    const maxBorders = Math.max(
      ...countries.map((c) => (c.borders || []).length),
      1
    );

    const metrics = [
      {
        subject: "Population",
        compute: (c: Country) => Math.round((c.population / maxPop) * 100),
      },
      {
        subject: "Surface Area",
        compute: (c: Country) => Math.round((c.area / maxArea) * 100),
      },
      {
        subject: "Density",
        compute: (c: Country) =>
          Math.round(((c.area > 0 ? c.population / c.area : 0) / maxDensity) * 100),
      },
      {
        subject: "Languages",
        compute: (c: Country) =>
          Math.round((Object.keys(c.languages || {}).length / maxLanguages) * 100),
      },
      {
        subject: "Borders",
        compute: (c: Country) =>
          Math.round(((c.borders || []).length / maxBorders) * 100),
      },
    ];

    return metrics.map(({ subject, compute }) => {
      const entry: Record<string, string | number> = { subject };
      countries.forEach((c) => {
        entry[c.name.common] = compute(c);
      });
      return entry;
    });
  }, [countries]);

  const formatPopTicks = (val: number) => {
    if (val >= 1_000_000_000) return `${(val / 1_000_000_000).toFixed(1)}B`;
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)}M`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k`;
    return String(val);
  };

  const formatAreaTicks = (val: number) => {
    if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(1)}M km²`;
    if (val >= 1_000) return `${(val / 1_000).toFixed(0)}k km²`;
    return `${val} km²`;
  };

  return (
    <div className="space-y-6">
      {/* Charts Header */}
      <div>
        <h2 className="text-lg font-bold text-foreground tracking-tight flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Comparative Visual Analysis
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Side-by-side metric distributions and multidimensional radar profile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Population Bar Chart */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-foreground">
            Population Comparison
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={formatPopTicks}
                />
                <Tooltip
                  formatter={(val: unknown) => [Number(val || 0).toLocaleString(), "Population"]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)",
                  }}
                />
                <Bar dataKey="population" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Surface Area Bar Chart */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-foreground">
            Surface Area Comparison (km²)
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={formatAreaTicks}
                />
                <Tooltip
                  formatter={(val: unknown) => [`${Number(val || 0).toLocaleString()} km²`, "Surface Area"]}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "0.5rem",
                    color: "var(--foreground)",
                  }}
                />
                <Bar dataKey="area" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Multidimensional Radar Chart */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <RadarIcon className="h-4 w-4 text-primary" />
            Normalized Profile Matrix (0 – 100%)
          </h3>
          <span className="text-xs text-muted-foreground">
            Relative scale against group maximums
          </span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="75%">
              <PolarGrid stroke="#888888" opacity={0.25} />
              <PolarAngleAxis dataKey="subject" stroke="#888888" fontSize={12} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#888888" opacity={0.3} />
              {countries.map((c, i) => (
                <Radar
                  key={c.cca3}
                  name={c.name.common}
                  dataKey={c.name.common}
                  stroke={COUNTRY_COLORS[i % COUNTRY_COLORS.length]}
                  fill={COUNTRY_COLORS[i % COUNTRY_COLORS.length]}
                  fillOpacity={0.3}
                />
              ))}
              <Legend
                wrapperStyle={{
                  paddingTop: "10px",
                  fontSize: "12px",
                }}
              />
              <Tooltip
                formatter={(val: unknown) => [`${String(val)}%`, "Relative Index"]}
                contentStyle={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                  borderRadius: "0.5rem",
                  color: "var(--foreground)",
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  description?: string;
  className?: string;
}

export function StatCard({ label, value, icon, trend, description, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-primary/40",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {icon && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20 transition-transform group-hover:scale-105"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground font-mono">
          {value}
        </div>

        {(trend || description) && (
          <div className="flex items-center gap-2 pt-1 text-xs">
            {trend && (
              <span
                className={cn(
                  "font-semibold rounded-sm px-1.5 py-0.5",
                  trend.isPositive && "bg-success/15 text-success",
                  trend.isNeutral && "bg-muted text-muted-foreground",
                  !trend.isPositive && !trend.isNeutral && "bg-destructive/15 text-destructive"
                )}
              >
                {trend.value}
              </span>
            )}
            {description && (
              <span className="text-muted-foreground leading-tight">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

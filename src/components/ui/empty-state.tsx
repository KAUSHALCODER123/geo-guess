import * as React from "react";
import { Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-dashed border-border bg-card/50",
        className
      )}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 shrink-0"
        aria-hidden="true"
      >
        {icon || <Compass className="h-7 w-7" />}
      </div>
      <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">{description}</p>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default: "border border-primary/20 bg-primary/10 text-primary",
        secondary: "border border-border bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        success: "border border-success/30 bg-success/10 text-success dark:text-emerald-400",
        warning: "border border-warning/30 bg-warning/10 text-warning dark:text-amber-400",
        destructive:
          "border border-destructive/30 bg-destructive/10 text-destructive dark:text-rose-400",
        accent: "border border-accent/30 bg-accent/15 text-accent font-semibold",
      },
      size: {
        sm: "px-2 py-0.5 text-[11px] rounded-md leading-tight",
        md: "px-2.5 py-1 text-xs rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

function Badge({ className, variant, size, dot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current shrink-0" aria-hidden="true" />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };

"use client";

import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
  isRetrying?: boolean;
  className?: string;
}

export function ErrorState({
  title = "Something went off course",
  message = "We encountered an issue loading this navigational data. Please check your connection and try again.",
  details,
  onRetry,
  isRetrying = false,
  className,
}: ErrorStateProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-destructive/30 bg-destructive/5",
        className
      )}
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/15 text-destructive mb-4 shrink-0"
        aria-hidden="true"
      >
        <AlertCircle className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">{message}</p>

      {onRetry && (
        <Button
          variant="outline"
          size="md"
          onClick={onRetry}
          isLoading={isRetrying}
          loadingText="Retrying..."
          leftIcon={<RefreshCw className="h-4 w-4" />}
          className="border-destructive/40 hover:bg-destructive/10"
        >
          Try Again
        </Button>
      )}

      {details && (
        <div className="mt-4 max-w-sm text-left">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            {showDetails ? "Hide technical details" : "Show technical details"}
          </button>
          {showDetails && (
            <pre className="mt-2 p-3 text-[11px] bg-muted rounded-md text-foreground overflow-x-auto whitespace-pre-wrap break-all font-mono">
              {details}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

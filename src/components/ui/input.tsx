"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  isSearch?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      isSearch = false,
      error,
      leftIcon,
      rightIcon,
      value,
      onClear,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const hasValue = value !== undefined && value !== "" && value !== null;

    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center w-full">
          {/* Left search or custom icon */}
          {isSearch && !leftIcon && (
            <Search
              className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
          )}
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={isSearch && type === "text" ? "search" : type}
            ref={ref}
            value={value}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-colors",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
              "disabled:cursor-not-allowed disabled:opacity-50",
              (isSearch || leftIcon) && "pl-9",
              (onClear || rightIcon) && "pr-9",
              error && "border-destructive focus-visible:outline-destructive",
              className
            )}
            {...props}
          />

          {/* Right clear button or custom icon */}
          {onClear && hasValue && !disabled && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className="absolute right-3 flex items-center justify-center h-5 w-5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
          {!onClear && rightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className="text-xs font-medium text-destructive mt-1 flex items-center gap-1"
          >
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

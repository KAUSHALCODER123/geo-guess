"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "default" | "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  title?: string;
  description: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  toast: (item: Omit<ToastItem, "id">) => string;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Standalone global dispatch for calling toast outside React tree if needed
let globalToastHandler: ((item: Omit<ToastItem, "id">) => string) | null = null;

export function toast(item: Omit<ToastItem, "id"> | string): string {
  const normalizedItem =
    typeof item === "string" ? { description: item, variant: "default" as ToastVariant } : item;

  if (globalToastHandler) {
    return globalToastHandler(normalizedItem);
  }
  return "";
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = Math.random().toString(36).slice(2, 9);
      const newToast: ToastItem = {
        ...item,
        id,
        duration: item.duration ?? 4500,
      };

      setToasts((prev) => [...prev, newToast]);

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, newToast.duration);
      }

      return id;
    },
    [dismiss]
  );

  React.useEffect(() => {
    globalToastHandler = addToast;
    return () => {
      globalToastHandler = null;
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ toasts, toast: addToast, dismiss }}>
      {children}
      {/* Toast Render Viewport */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-16 md:bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col-reverse gap-2 p-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.variant === "error" ? "alert" : "status"}
            className={cn(
              "pointer-events-auto relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-5",
              t.variant === "success" && "border-success/40 bg-card text-foreground",
              t.variant === "error" && "border-destructive/40 bg-card text-foreground",
              t.variant === "warning" && "border-warning/40 bg-card text-foreground",
              t.variant === "info" && "border-primary/40 bg-card text-foreground",
              (!t.variant || t.variant === "default") && "border-border bg-card text-foreground"
            )}
          >
            {/* Variant Icon */}
            <div className="shrink-0 pt-0.5" aria-hidden="true">
              {t.variant === "success" && <CheckCircle2 className="h-5 w-5 text-success" />}
              {t.variant === "error" && <AlertCircle className="h-5 w-5 text-destructive" />}
              {t.variant === "warning" && <AlertTriangle className="h-5 w-5 text-warning" />}
              {t.variant === "info" && <Info className="h-5 w-5 text-primary" />}
              {(!t.variant || t.variant === "default") && <Info className="h-5 w-5 text-primary" />}
            </div>

            <div className="flex-1 space-y-0.5">
              {t.title && <p className="text-sm font-semibold">{t.title}</p>}
              <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>
            </div>

            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss notification"
              className="rounded-sm p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 hover:bg-muted focus-visible:outline-2 focus-visible:outline-[var(--ring)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

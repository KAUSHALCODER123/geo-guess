"use client";

import React, { type ReactNode } from "react";
import { QueryProvider } from "@/lib/query/QueryProvider";

export interface ProvidersProps {
  children: ReactNode;
}

/**
 * Top-level application providers wrapper.
 * Combines TanStack Query and any future context providers.
 */
export function Providers({ children }: ProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default Providers;

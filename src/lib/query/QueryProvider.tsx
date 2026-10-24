"use client";

import React, { useState, type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "../query-client";

export interface QueryProviderProps {
  children: ReactNode;
}

/**
 * Client-side TanStack Query provider.
 * Instantiates QueryClient once per component tree to ensure state persistence across renders.
 */
export function QueryProvider({ children }: QueryProviderProps) {
  const [client] = useState(() => createQueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;

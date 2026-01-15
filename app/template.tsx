"use client";

import { ReactNode } from "react";

/**
 * Template component that persists across route changes
 * This prevents the sidebar and header from reloading when navigating
 */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

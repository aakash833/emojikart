"use client";

import { ReactNode } from "react";
import { EmojiKeyboardClient } from "./emoji-keyboard-client";

interface PageLayoutWrapperProps {
  children: ReactNode;
  showLayout?: boolean;
}

/**
 * Wrapper component that provides consistent layout (sidebar + header) for all pages
 * Set showLayout to false to render children without the layout (for pages that need custom layout)
 */
export function PageLayoutWrapper({ children, showLayout = true }: PageLayoutWrapperProps) {
  if (!showLayout) {
    return <>{children}</>;
  }

  // For pages that should use the EmojiKeyboardClient layout
  // The EmojiKeyboardClient will handle rendering the appropriate content based on pathname
  return <EmojiKeyboardClient />;
}

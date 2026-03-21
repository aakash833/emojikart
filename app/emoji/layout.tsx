import type { ReactNode } from "react";

/**
 * Root layout uses h-screen + overflow-hidden for the keyboard shell.
 * Emoji detail pages render outside that shell but still inherit the wrapper,
 * so they need their own scroll region.
 */
export default function EmojiSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
}

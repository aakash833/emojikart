"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavigationLoader() {
  const pathname = usePathname();
  const prevPathRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize prevPath on mount
    if (prevPathRef.current === null) {
      prevPathRef.current = pathname;
      return;
    }

    if (pathname !== prevPathRef.current) {
      // Only show loader for actual navigation (not client-side transitions)
      // For category navigation, we use startTransition which doesn't trigger this
      // This prevents the loader from showing on sidebar clicks
      const isCategoryNavigation = pathname.startsWith('/') && 
        pathname !== '/' && 
        prevPathRef.current?.startsWith('/') &&
        (pathname.split('/').length === 2 || prevPathRef.current.split('/').length === 2);
      
      if (!isCategoryNavigation) {
        // route is changing (non-category navigation)
        setLoading(true);

        // Hide loader after a max timeout to avoid stuck state.
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        // Show loader for at least 300ms or until next pathname change completes
        timeoutRef.current = window.setTimeout(() => {
          setLoading(false);
          timeoutRef.current = null;
        }, 300);
      }
    }

    // Update prevPath to current for next change
    prevPathRef.current = pathname;

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 p-6 bg-card/90 rounded-lg shadow-lg">
        <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-primary" />
        <div className="text-sm text-foreground">Loading…</div>
      </div>
    </div>
  );
}

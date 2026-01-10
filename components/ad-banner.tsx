"use client";

// Ads are currently disabled because AdSense isn't serving ads.
// Keep this component in place so callers don't need edits; it returns null.
interface AdBannerProps {
  position: "top" | "sidebar" | "between" | "bottom-sticky";
  className?: string;
}
export function AdBanner(_props: AdBannerProps) {
  // Intentionally render nothing while ads are disabled.
  return null;
}

"use client";

// No-op AdSense component while ads are disabled. Keeps consumers stable.
interface AdSenseAdProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
  fullWidthResponsive?: boolean;
}

export function AdSenseAd(_props: AdSenseAdProps) {
  return null;
}

"use client";
import { useEffect } from "react";

export default function AdUnit() {
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") {
      return;
    }

    const loadAd = () => {
      try {
        // Check if AdSense script is loaded
        if (typeof (window as any).adsbygoogle === "undefined") {
          // Script might not be loaded yet, especially in preview environments
          return;
        }

        // adsbygoogle is injected by the AdSense script at runtime. Cast to any
        // so TypeScript doesn't complain during build.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        // Silently fail in preview/restricted environments
        if (process.env.NODE_ENV === "development") {
          console.warn("AdSense error:", e);
        }
      }
    };

    // Delay until layout is stable and script is loaded
    const id = setTimeout(loadAd, 500);

    return () => clearTimeout(id);
  }, []);

  return (
    <div className="emjk-ad-unit w-full">
      <ins
        className="adsbygoogle block w-full"
        style={{ display: "block", width: "100%", minHeight: "120px" }}
        data-ad-client="ca-pub-4360932072488893"
        data-ad-slot="4816005452"
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";

export default function AdUnit() {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (e) {}
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-4360932072488893"
      data-ad-slot="4816005452"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}

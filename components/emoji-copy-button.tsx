"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { hapticCopy } from "@/lib/haptics";

interface EmojiCopyButtonProps {
  emoji: string;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function EmojiCopyButton({ emoji, size = "default", className }: EmojiCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emoji);
      hapticCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy emoji:", err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      size={size}
      variant={copied ? "default" : "outline"}
      className={className}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </>
      )}
    </Button>
  );
}


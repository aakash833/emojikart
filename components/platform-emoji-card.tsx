"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { hapticCopy } from "@/lib/haptics";

interface PlatformEmojiCardProps {
  emoji: string;
  platformName: string;
  platformDisplayName: string;
}

export function PlatformEmojiCard({
  emoji,
  platformName,
  platformDisplayName,
}: PlatformEmojiCardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emoji);
      hapticCopy();
    } catch (err) {
      console.error("Failed to copy emoji:", err);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg border border-border hover:bg-accent transition-colors">
      <div className="text-6xl mb-3 filter drop-shadow-lg">{emoji}</div>
      <div className="text-sm font-medium text-foreground mb-1">{platformDisplayName}</div>
      <Button variant="ghost" size="sm" className="mt-2 text-xs" onClick={handleCopy}>
        <Download className="w-3 h-3 mr-1" />
        Copy
      </Button>
    </div>
  );
}


"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getEmojiSlug } from "@/lib/get-all-emojis";

interface EmojiTooltipProps {
  emoji: string;
  name: string;
  category?: string;
  children: React.ReactNode;
}

// Format emoji name to be more readable
function formatEmojiName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Get description based on category
function getEmojiDescription(name: string, category?: string): string {
  const descriptions: Record<string, string> = {
    "Smileys & Emotion": "A facial expression or emotion emoji",
    "People & Body": "A person, body part, or gesture emoji",
    "Animals & Nature": "An animal, plant, or nature emoji",
    "Food & Drink": "A food or beverage emoji",
    Activities: "A sports or activity emoji",
    "Travel & Places": "A location, vehicle, or travel emoji",
    Objects: "An everyday object or item emoji",
    Symbols: "A symbol, sign, or special character emoji",
    Flags: "A country or regional flag emoji",
  };

  const categoryDesc = category
    ? descriptions[category] || "An emoji"
    : "An emoji";
  return `${categoryDesc}. Click to copy to clipboard.`;
}

export function EmojiTooltip({
  emoji,
  name,
  category,
  children,
}: EmojiTooltipProps) {
  const formattedName = formatEmojiName(name);
  const description = getEmojiDescription(name, category);
  const emojiSlug = getEmojiSlug(name);

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-xs p-3 bg-popover border border-border shadow-lg"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{emoji}</span>
              <span className="font-semibold text-foreground">
                {formattedName}
              </span>
            </div>
            {category && (
              <p className="text-xs text-muted-foreground">{category}</p>
            )}
            <p className="text-xs text-muted-foreground pt-1 border-t border-border">
              {description}
            </p>
            <Link href={`/emoji/${emojiSlug}`} className="block">
              <Button
                size="sm"
                variant="outline"
                className="w-full text-gray-600 hover:cursor-pointer mt-2 text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-3 h-3 mr-1" />
                View Details
              </Button>
            </Link>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

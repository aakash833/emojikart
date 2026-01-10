"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { emojiData } from "@/lib/emoji-data";
import { searchEmojis } from "@/lib/search-utils";
import { hapticClick, hapticCopy } from "@/lib/haptics";
import { EmojiCopyPopup } from "@/components/emoji-copy-popup";
import { Search, Sparkles, Copy, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategorySEOContent } from "@/components/category-seo-content";
import { EmojiTooltip } from "@/components/emoji-tooltip";

type EmojiSize = "S" | "M" | "L" | "XL" | "XXL";

const sizeMap: Record<EmojiSize, string> = {
  S: "text-xl",
  M: "text-2xl",
  L: "text-3xl",
  XL: "text-5xl",
  XXL: "text-8xl",
};

interface EmojiCategoryPageProps {
  category: string;
  slug: string;
}

export function EmojiCategoryPage({ category, slug }: EmojiCategoryPageProps) {
  const [emojiSize, setEmojiSize] = useState<EmojiSize>("M");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedEmoji, setCopiedEmoji] = useState<{
    emoji: string;
    name: string;
    position: { x: number; y: number };
  } | null>(null);

  const categoryEmojis = emojiData[category] || [];
  const filteredEmojis = searchQuery
    ? searchEmojis(searchQuery).filter((e) => e.category === category)
    : categoryEmojis.map((e) => ({ ...e, category }));

  // Initialize emojiSize from localStorage and sync across tabs
  useEffect(() => {
    try {
      const stored = localStorage.getItem("emojiSize");
      if (stored && ["S", "M", "L", "XL", "XXL"].includes(stored)) {
        setEmojiSize(stored as EmojiSize);
      }
    } catch {}

    const onStorage = (e: StorageEvent) => {
      if (e.key === "emojiSize" && e.newValue) {
        const v = e.newValue;
        if (["S", "M", "L", "XL", "XXL"].includes(v))
          setEmojiSize(v as EmojiSize);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleEmojiClick = async (
    emoji: string,
    name: string,
    event: React.MouseEvent
  ) => {
    try {
      await navigator.clipboard.writeText(emoji);
      hapticCopy();

      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setCopiedEmoji({
        emoji,
        name,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      });

      setTimeout(() => {
        setCopiedEmoji(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy emoji:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to All Emojis</span>
              </Link>
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={`Search ${category} emojis...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Ads disabled - AdSense banner intentionally removed */}

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              {
                label: category,
                href: `/category/${slug}`,
              },
            ]}
          />

          {/* SEO Content */}
          <CategorySEOContent category={category} slug={slug} />

          <div className="mb-6">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {category} Emojis
            </h1>
            <p className="text-muted-foreground text-lg">
              {filteredEmojis.length}{" "}
              {filteredEmojis.length === 1 ? "emoji" : "emojis"} available -
              Click any emoji to copy instantly
            </p>
          </div>

          {/* Size Selector */}
          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">
              Size:
            </span>
            <div className="flex gap-2">
              {(["S", "M", "L", "XL", "XXL"] as EmojiSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setEmojiSize(size);
                    try {
                      localStorage.setItem("emojiSize", size);
                    } catch {}
                    hapticClick();
                  }}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-bold transition-all",
                    emojiSize === size
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji Grid */}
          <div
            className={cn(
              "grid gap-1.5 mb-8",
              emojiSize === "S" &&
                "grid-cols-12 sm:grid-cols-14 md:grid-cols-16",
              emojiSize === "M" &&
                "grid-cols-10 sm:grid-cols-12 md:grid-cols-14",
              emojiSize === "L" &&
                "grid-cols-8 sm:grid-cols-10 md:grid-cols-12",
              emojiSize === "XL" &&
                "grid-cols-6 sm:grid-cols-8 md:grid-cols-10",
              emojiSize === "XXL" && "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
            )}
          >
            {filteredEmojis.map((emoji, index) => (
              <EmojiTooltip
                key={`${emoji.emoji}-${emoji.name}-${index}`}
                emoji={emoji.emoji}
                name={emoji.name}
                category={emoji.category}
              >
                <button
                  onClick={(e) => handleEmojiClick(emoji.emoji, emoji.name, e)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer p-1",
                    "hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30",
                    "hover:scale-105 hover:shadow-md active:scale-95",
                    "border border-transparent hover:border-indigo-300 dark:hover:border-indigo-700",
                    sizeMap[emojiSize]
                  )}
                  aria-label={`${emoji.name} emoji`}
                >
                  {emoji.emoji}
                </button>
              </EmojiTooltip>
            ))}
          </div>

          {filteredEmojis.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No emojis found</p>
            </div>
          )}
        </main>

        {/* Copy Popup */}
        {copiedEmoji && (
          <EmojiCopyPopup
            emoji={copiedEmoji.emoji}
            name={copiedEmoji.name}
            position={copiedEmoji.position}
          />
        )}
      </div>

      {/* AdSense initialization removed while ads are disabled */}
    </>
  );
}

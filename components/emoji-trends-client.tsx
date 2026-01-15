"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Trophy, Sparkles, BarChart3 } from "lucide-react";
import { emojiData } from "@/lib/emoji-data";
import { hapticCopy } from "@/lib/haptics";
import { EmojiCopyPopup } from "@/components/emoji-copy-popup";
import { cn } from "@/lib/utils";

// Popular emojis based on real-world usage data
const popularEmojis = [
  { emoji: "😂", name: "Face with Tears of Joy", rank: 1, usage: "Most used emoji worldwide" },
  { emoji: "❤️", name: "Red Heart", rank: 2, usage: "Love and affection" },
  { emoji: "🤣", name: "Rolling on the Floor Laughing", rank: 3, usage: "Extreme laughter" },
  { emoji: "😊", name: "Smiling Face with Smiling Eyes", rank: 4, usage: "Happiness and friendliness" },
  { emoji: "😍", name: "Heart Eyes", rank: 5, usage: "Love and admiration" },
  { emoji: "😭", name: "Loudly Crying Face", rank: 6, usage: "Sadness or extreme emotion" },
  { emoji: "😘", name: "Face Blowing a Kiss", rank: 7, usage: "Affection and love" },
  { emoji: "👍", name: "Thumbs Up", rank: 8, usage: "Approval and agreement" },
  { emoji: "😁", name: "Beaming Face with Smiling Eyes", rank: 9, usage: "Joy and happiness" },
  { emoji: "🔥", name: "Fire", rank: 10, usage: "Hot, trending, or amazing" },
];

const trendingCombinations = [
  { combination: "😍🔥", meaning: "Love something hot/trending" },
  { combination: "😂💯", meaning: "Something is hilarious and perfect" },
  { combination: "❤️✨", meaning: "Love with sparkle/magic" },
  { combination: "🎉🔥", meaning: "Celebrating something amazing" },
  { combination: "😊❤️", meaning: "Happy and loving" },
  { combination: "👍🔥", meaning: "Approving something hot/trending" },
  { combination: "💯🔥", meaning: "Perfect and amazing" },
  { combination: "😍✨", meaning: "Loving something magical" },
];

export function EmojiTrendsClient() {
  const [copiedEmoji, setCopiedEmoji] = useState<{
    emoji: string;
    name: string;
    position: { x: number; y: number };
  } | null>(null);

  const handleEmojiClick = async (emoji: string, name: string, event: React.MouseEvent) => {
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
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-indigo-500" />
          Emoji Trends 2025
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover the most popular emojis and trending emoji combinations
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Most Popular Emojis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Top 10 Most Popular Emojis
            </CardTitle>
            <CardDescription>
              The most used emojis worldwide in 2025
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularEmojis.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold">
                    {item.rank}
                  </div>
                  <button
                    onClick={(e) => handleEmojiClick(item.emoji, item.name, e)}
                    className="text-4xl hover:scale-110 transition-transform"
                  >
                    {item.emoji}
                  </button>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">{item.usage}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trending Combinations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              Trending Emoji Combinations
            </CardTitle>
            <CardDescription>
              Popular emoji combinations people are using
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingCombinations.map((combo, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <button
                    onClick={(e) => handleEmojiClick(combo.combination, combo.meaning, e)}
                    className="text-3xl hover:scale-110 transition-transform"
                  >
                    {combo.combination}
                  </button>
                  <div className="flex-1">
                    <div className="font-medium">{combo.meaning}</div>
                    <div className="text-sm text-muted-foreground">Click to copy</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Emoji Usage Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">5B+</div>
              <div className="text-sm text-muted-foreground">Emojis sent daily</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">3,000+</div>
              <div className="text-sm text-muted-foreground">Available emojis</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">92%</div>
              <div className="text-sm text-muted-foreground">Of people use emojis</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">50%</div>
              <div className="text-sm text-muted-foreground">Of messages contain emojis</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Copy Popup */}
      {copiedEmoji && (
        <EmojiCopyPopup
          emoji={copiedEmoji.emoji}
          name={copiedEmoji.name}
          position={copiedEmoji.position}
        />
      )}
      </div>
    </div>
  );
}

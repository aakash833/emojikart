"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Info } from "lucide-react";
import { emojiData } from "@/lib/emoji-data";
import { searchEmojis } from "@/lib/search-utils";
import { cn } from "@/lib/utils";

// Emoji meanings database
const emojiMeanings: Record<string, { meaning: string; usage: string[]; category: string }> = {
  "😊": {
    meaning: "Smiling Face with Smiling Eyes - Expresses happiness, contentment, and friendliness",
    usage: ["Happy", "Friendly", "Content", "Pleased"],
    category: "Smileys & Emotion",
  },
  "❤️": {
    meaning: "Red Heart - Symbolizes love, affection, and romance",
    usage: ["Love", "Romance", "Affection", "Caring"],
    category: "Smileys & Emotion",
  },
  "🔥": {
    meaning: "Fire - Represents something hot, exciting, or trending",
    usage: ["Hot", "Trending", "Exciting", "Amazing"],
    category: "Smileys & Emotion",
  },
  "👍": {
    meaning: "Thumbs Up - Sign of approval, agreement, or support",
    usage: ["Approval", "Agreement", "Support", "Good"],
    category: "People & Body",
  },
  "😍": {
    meaning: "Heart Eyes - Shows love, admiration, or being in love",
    usage: ["Love", "Admiration", "Attraction", "Beautiful"],
    category: "Smileys & Emotion",
  },
  "😂": {
    meaning: "Face with Tears of Joy - Extreme laughter or finding something very funny",
    usage: ["Laughing", "Funny", "Hilarious", "Joy"],
    category: "Smileys & Emotion",
  },
  "🎉": {
    meaning: "Party Popper - Celebration, congratulations, or party time",
    usage: ["Celebration", "Congratulations", "Party", "Success"],
    category: "Activities",
  },
  "💯": {
    meaning: "Hundred Points - Perfect score, 100%, or something excellent",
    usage: ["Perfect", "Excellent", "100%", "Best"],
    category: "Symbols",
  },
};

export function EmojiMeaningsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const allEmojis = useMemo(() => {
    return Object.values(emojiData).flat();
  }, []);

  const filteredEmojis = useMemo(() => {
    if (!searchQuery) return allEmojis.slice(0, 100);
    return searchEmojis(searchQuery, allEmojis).slice(0, 100);
  }, [searchQuery, allEmojis]);

  const getEmojiMeaning = (emoji: string) => {
    return emojiMeanings[emoji] || {
      meaning: `This emoji represents ${emoji}. Use it to express emotions, ideas, or concepts in your messages.`,
      usage: ["Expression", "Communication", "Emotion"],
      category: "General",
    };
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-indigo-500" />
          Emoji Meanings Dictionary
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover what emojis mean and how to use them correctly in your messages
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Search and Emoji List */}
        <div className="md:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search emoji meanings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Emoji Dictionary</CardTitle>
              <CardDescription>
                Click on any emoji to see its meaning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-2 max-h-[600px] overflow-y-auto">
                {filteredEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEmoji(emoji.emoji)}
                    className={cn(
                      "text-3xl p-3 rounded-lg hover:bg-muted transition-colors aspect-square flex items-center justify-center",
                      selectedEmoji === emoji.emoji && "bg-indigo-100 dark:bg-indigo-900/30 ring-2 ring-indigo-500"
                    )}
                    title={emoji.name}
                  >
                    {emoji.emoji}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Meaning Panel */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Emoji Meaning
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedEmoji ? (
                <div className="space-y-4">
                  <div className="text-6xl text-center">{selectedEmoji}</div>
                  <div>
                    <h3 className="font-semibold mb-2">Meaning</h3>
                    <p className="text-sm text-muted-foreground">
                      {getEmojiMeaning(selectedEmoji).meaning}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Common Usage</h3>
                    <div className="flex flex-wrap gap-2">
                      {getEmojiMeaning(selectedEmoji).usage.map((usage, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted rounded-md text-xs"
                        >
                          {usage}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Category</h3>
                    <p className="text-sm text-muted-foreground">
                      {getEmojiMeaning(selectedEmoji).category}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Info className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Select an emoji to see its meaning</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
}

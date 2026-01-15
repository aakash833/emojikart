"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Wand2, Copy, Download } from "lucide-react";
import { emojiData } from "@/lib/emoji-data";
import { hapticCopy } from "@/lib/haptics";
import { EmojiCopyPopup } from "@/components/emoji-copy-popup";
import { cn } from "@/lib/utils";

export function EmojiGeneratorClient() {
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [generatedText, setGeneratedText] = useState("");
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

  const addEmoji = (emoji: string) => {
    setSelectedEmojis([...selectedEmojis, emoji]);
  };

  const removeEmoji = (index: number) => {
    setSelectedEmojis(selectedEmojis.filter((_, i) => i !== index));
  };

  const generateCombination = () => {
    setGeneratedText(selectedEmojis.join(""));
  };

  const copyGenerated = async () => {
    if (generatedText) {
      try {
        await navigator.clipboard.writeText(generatedText);
        hapticCopy();
        alert("Copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

  // Get popular emojis for quick selection
  const popularEmojis = [
    "😊", "❤️", "🔥", "👍", "😍", "😂", "🎉", "💯",
    "✨", "🌟", "💖", "😎", "🎈", "🎊", "💝", "🎁"
  ];

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
          <Wand2 className="w-8 h-8 text-indigo-500" />
          Emoji Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Create custom emoji combinations, generate emoji art, and combine emojis for unique expressions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Generator Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Create Emoji Combination</CardTitle>
            <CardDescription>
              Select emojis to create your custom combination
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick Select Popular Emojis */}
            <div>
              <label className="text-sm font-medium mb-2 block">Quick Select</label>
              <div className="flex flex-wrap gap-2">
                {popularEmojis.map((emoji, idx) => (
                  <button
                    key={idx}
                    onClick={() => addEmoji(emoji)}
                    className="text-2xl p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Emojis */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Selected Emojis ({selectedEmojis.length})
              </label>
              <div className="min-h-[100px] p-4 border-2 border-dashed border-muted rounded-lg flex flex-wrap gap-2 items-start">
                {selectedEmojis.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No emojis selected yet</p>
                ) : (
                  selectedEmojis.map((emoji, index) => (
                    <div key={index} className="relative group">
                      <span className="text-3xl">{emoji}</span>
                      <button
                        onClick={() => removeEmoji(index)}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateCombination}
              disabled={selectedEmojis.length === 0}
              className="w-full"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Combination
            </Button>

            {/* Generated Result */}
            {generatedText && (
              <div className="space-y-2">
                <label className="text-sm font-medium block">Generated Result</label>
                <div className="flex gap-2">
                  <Input
                    value={generatedText}
                    readOnly
                    className="text-2xl text-center"
                  />
                  <Button onClick={copyGenerated} size="icon">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Emoji Picker */}
        <Card>
          <CardHeader>
            <CardTitle>Browse Emojis</CardTitle>
            <CardDescription>
              Click emojis to add them to your combination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-8 gap-2">
                {Object.values(emojiData).flat().slice(0, 200).map((emoji, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      addEmoji(emoji.emoji);
                      handleEmojiClick(emoji.emoji, emoji.name, e);
                    }}
                    className="text-2xl p-2 rounded-lg hover:bg-muted transition-colors aspect-square flex items-center justify-center cursor-pointer"
                    title={emoji.name}
                  >
                    {emoji.emoji}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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

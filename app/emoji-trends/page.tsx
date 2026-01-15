import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Emoji Trends - Most Popular Emojis 2025 | Emoji keyboard online 😊 - Click to copy 🔥 emoji",
  description:
    "Emoji trends 2025 😊 - Discover the most popular emojis, trending emoji combinations, and emoji usage statistics. See what emojis are trending now and learn about emoji popularity. Free emoji trends tracker.",
  keywords: [
    "emoji trends",
    "popular emojis",
    "trending emojis",
    "emoji statistics",
    "most used emojis",
    "emoji trends 2025",
    "emoji keyboard",
    "emoji keyboard online",
    "emoji popularity",
    "top emojis",
    "emoji usage",
  ],
  openGraph: {
    title: "Emoji Trends - Most Popular Emojis 2025 | Emoji keyboard online 😊",
    description:
      "Emoji trends 2025 😊 - Discover the most popular emojis, trending emoji combinations, and emoji usage statistics.",
    type: "website",
    url: "https://emojikart.com/emoji-trends",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Trends - Most Popular Emojis 2025",
    description:
      "Emoji trends 2025 😊 - Discover the most popular emojis and trending emoji combinations.",
  },
  alternates: {
    canonical: "https://emojikart.com/emoji-trends",
  },
};

export default function EmojiTrendsPage() {
  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Emoji Trends 2025 - Most Popular Emojis",
          description:
            "Discover the most popular emojis, trending emoji combinations, and emoji usage statistics for 2025.",
          url: "https://emojikart.com/emoji-trends",
        }}
      />
    </>
  );
}

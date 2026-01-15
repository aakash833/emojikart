import React from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { emojiData } from "@/lib/emoji-data";

const validCategories = [
  "smileys-emotion",
  "people-body",
  "animals-nature",
  "food-drink",
  "activities",
  "travel-places",
  "objects",
  "symbols",
  "flags",
];

const categorySlugs: Record<string, string> = {
  "smileys-emotion": "Smileys & Emotion",
  "people-body": "People & Body",
  "animals-nature": "Animals & Nature",
  "food-drink": "Food & Drink",
  activities: "Activities",
  "travel-places": "Travel & Places",
  objects: "Objects",
  symbols: "Symbols",
  flags: "Flags",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (!validCategories.includes(category)) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryName = categorySlugs[category];
  const emojiCount = emojiData[categoryName]?.length || 0;

  return {
    title: `${categoryName} Emojis - Copy ${emojiCount}+ Emojis Instantly | Emoji keyboard online 😊 - Click to copy 🔥 emoji`,
    description: `Emoji keyboard online 😊 - Click to copy 🔥 emoji - Browse ${emojiCount}+ ${categoryName.toLowerCase()} emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. Free online emoji keyboard with instant copy and paste. No apps required.`,
    keywords: [
      categoryName.toLowerCase(),
      "emojis",
      "emoji keyboard",
      "emoji keyboard online",
      "online emoji keyboard",
      "free emoji keyboard",
      "copy emoji",
      "emoji picker",
      "emoji picker online",
      "paste emoji",
      "copy paste emoji",
      "emoji copy paste",
      "emoji for twitter",
      "emoji for facebook",
      "emoji for instagram",
      "emoji for whatsapp",
      "emoji for slack",
      categoryName,
    ].join(", "),
    openGraph: {
      title: `${categoryName} Emojis - ${emojiCount}+ Emojis Available`,
      description: `Browse ${emojiCount}+ ${categoryName.toLowerCase()} emojis. Copy emojis instantly!`,
      type: "website",
      url: `https://emojikart.com/${category}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} Emojis - ${emojiCount}+ Emojis`,
      description: `Browse ${emojiCount}+ ${categoryName.toLowerCase()} emojis. Copy emojis instantly!`,
    },
    alternates: {
      canonical: `https://emojikart.com/${category}`,
    },
  };
}

export default async function CategoryRoutePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // Validate category - redirect if invalid
  if (!validCategories.includes(category)) {
    redirect("/");
  }

  // Render the client component
  return <EmojiKeyboardClient />;
}

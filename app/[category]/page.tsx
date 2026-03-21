import React from "react";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { emojiData } from "@/lib/emoji-data";
import { SITE_NAME, SITE_URL } from "@/lib/site";

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
    title: `${categoryName} emojis — copy ${emojiCount}+ free | ${SITE_NAME}`,
    description: `Browse ${emojiCount}+ ${categoryName.toLowerCase()} Unicode emojis on ${SITE_NAME}. Search, click to copy, paste anywhere—browser-based, no download.`,
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
      title: `${categoryName} emojis — ${emojiCount}+ | ${SITE_NAME}`,
      description: `Browse ${emojiCount}+ ${categoryName.toLowerCase()} emojis. One-click copy on ${SITE_NAME}.`,
      type: "website",
      url: `${SITE_URL}/${category}`,
      siteName: `${SITE_NAME} — Free online emoji keyboard`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} emojis — ${emojiCount}+ | ${SITE_NAME}`,
      description: `Browse ${emojiCount}+ ${categoryName.toLowerCase()} emojis. One-click copy.`,
    },
    alternates: {
      canonical: `${SITE_URL}/${category}`,
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

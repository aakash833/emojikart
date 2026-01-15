import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Emoji Generator - Create Custom Emojis Online | Emoji keyboard online 😊 - Click to copy 🔥 emoji",
  description:
    "Emoji generator online 😊 - Create custom emojis, combine emojis, and generate emoji art. Free emoji maker tool with thousands of combinations. Generate emojis for social media, messages, and more. No download required.",
  keywords: [
    "emoji generator",
    "emoji maker",
    "create emoji",
    "custom emoji",
    "emoji creator",
    "emoji keyboard",
    "emoji keyboard online",
    "online emoji generator",
    "free emoji generator",
    "emoji art generator",
    "emoji combinations",
    "emoji mixer",
  ],
  openGraph: {
    title: "Emoji Generator - Create Custom Emojis Online | Emoji keyboard online 😊",
    description:
      "Emoji generator online 😊 - Create custom emojis, combine emojis, and generate emoji art. Free emoji maker tool with thousands of combinations.",
    type: "website",
    url: "https://emojikart.com/emoji-generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Generator - Create Custom Emojis Online",
    description:
      "Emoji generator online 😊 - Create custom emojis, combine emojis, and generate emoji art. Free emoji maker tool.",
  },
  alternates: {
    canonical: "https://emojikart.com/emoji-generator",
  },
};

export default function EmojiGeneratorPage() {
  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Emoji Generator - Create Custom Emojis Online",
          description:
            "Free online emoji generator to create custom emoji combinations and generate emoji art. Combine emojis for unique expressions.",
          url: "https://emojikart.com/emoji-generator",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
    </>
  );
}

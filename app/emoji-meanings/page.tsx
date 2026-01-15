import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Emoji Meanings - What Do Emojis Mean? | Emoji keyboard online 😊 - Click to copy 🔥 emoji",
  description:
    "Emoji meanings dictionary 😊 - Learn what emojis mean and how to use them. Complete guide to emoji meanings, definitions, and usage. Find the meaning of any emoji with our comprehensive emoji dictionary. Free emoji meanings guide.",
  keywords: [
    "emoji meanings",
    "what do emojis mean",
    "emoji dictionary",
    "emoji definitions",
    "emoji guide",
    "emoji keyboard",
    "emoji keyboard online",
    "emoji meaning list",
    "emoji symbols meaning",
    "emoji translator",
    "emoji reference",
  ],
  openGraph: {
    title: "Emoji Meanings - What Do Emojis Mean? | Emoji keyboard online 😊",
    description:
      "Emoji meanings dictionary 😊 - Learn what emojis mean and how to use them. Complete guide to emoji meanings, definitions, and usage.",
    type: "website",
    url: "https://emojikart.com/emoji-meanings",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Meanings - What Do Emojis Mean?",
    description:
      "Emoji meanings dictionary 😊 - Learn what emojis mean and how to use them. Complete guide to emoji meanings.",
  },
  alternates: {
    canonical: "https://emojikart.com/emoji-meanings",
  },
};

export default function EmojiMeaningsPage() {
  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Emoji Meanings Dictionary",
          description:
            "Complete guide to emoji meanings, definitions, and usage. Learn what emojis mean and how to use them correctly.",
          url: "https://emojikart.com/emoji-meanings",
        }}
      />
    </>
  );
}

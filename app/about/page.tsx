import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "About Us | Free Online Emoji Keyboard - EmojiKart",
  description:
    "Learn about EmojiKart - your free online emoji keyboard with thousands of emojis. Discover our mission, features, and how we help millions express themselves better through emojis. Copy and paste emojis instantly for Twitter, Facebook, Instagram, WhatsApp and more.",
  keywords: [
    "about emoji keyboard",
    "emoji keyboard about",
    "emoji tool",
    "free emoji keyboard",
    "online emoji picker",
  ],
  robots: "index, follow",
  openGraph: {
    title: "About Us | Free Online Emoji Keyboard - EmojiKart",
    description:
      "Learn about EmojiKart - your free online emoji keyboard with thousands of emojis. Discover our mission, features, and how we help millions express themselves better.",
    type: "website",
    url: "https://emojikart.com/about",
  },
  alternates: {
    canonical: "https://emojikart.com/about",
  },
};

export default function AboutPage() {
  return <EmojiKeyboardClient />;
}

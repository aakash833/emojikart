import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Emoji Keyboard - Copy Emojis Instantly | Free Online Emoji Picker",
  description:
    "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. ✂️ Copy and 📋 Paste Emoji 👍 No apps required",
  keywords: [
    "emoji keyboard",
    "emoji picker",
    "copy emoji",
    "emoji copy",
    "free emojis",
    "emoji search",
    "emoji categories",
    "unicode emojis",
    "emoji list",
    "smiley emojis",
    "emoji tool",
    "online emoji keyboard",
    "paste emoji",
    "copy paste emoji",
    "emoji for twitter",
    "emoji for facebook",
    "emoji for instagram",
    "emoji for whatsapp",
    "emoji for slack",
    "emoji for snapchat",
    "emoji for github",
    "free emoji keyboard",
    "emoji keyboard online",
    "emoji copy paste",
    "unicode emoji keyboard",
    "emoji picker online",
  ],
  openGraph: {
    title: "Emoji Keyboard - Copy Emojis Instantly | Free Online Emoji Picker",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more.",
    type: "website",
    url: "https://emojikart.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Keyboard - Copy Emojis Instantly | Free Online Emoji Picker",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis.",
  },
};

export default function HomePage() {
  return <EmojiKeyboardClient />;
}

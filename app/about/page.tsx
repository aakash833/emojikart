import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "About Us | Free Online Emoji Keyboard",
  description:
    "Learn about our free online emoji keyboard. Copy and paste emojis instantly for Twitter, Facebook, Instagram, WhatsApp and more.",
  robots: "index, follow",
};

export default function AboutPage() {
  return <EmojiKeyboardClient />;
}

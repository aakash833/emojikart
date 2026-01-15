import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Contact Us | Free Online Emoji Keyboard",
  description:
    "Get in touch with us. We'd love to hear from you about our emoji keyboard service.",
  robots: "index, follow",
};

export default function ContactPage() {
  return <EmojiKeyboardClient />;
}

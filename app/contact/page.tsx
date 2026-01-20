import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Contact Us | Free Online Emoji Keyboard - EmojiKart",
  description:
    "Get in touch with EmojiKart team. We'd love to hear your feedback, suggestions, or questions about our free online emoji keyboard service. Contact us for support, partnerships, or general inquiries.",
  keywords: [
    "contact emoji keyboard",
    "emoji keyboard contact",
    "emoji support",
    "emoji feedback",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Contact Us | Free Online Emoji Keyboard - EmojiKart",
    description:
      "Get in touch with EmojiKart team. We'd love to hear your feedback, suggestions, or questions about our free online emoji keyboard service.",
    type: "website",
    url: "https://emojikart.com/contact",
  },
  alternates: {
    canonical: "https://emojikart.com/contact",
  },
};

export default function ContactPage() {
  return <EmojiKeyboardClient />;
}

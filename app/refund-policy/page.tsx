import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Refund & Return Policy | Free Online Emoji Keyboard - EmojiKart",
  description:
    "Refund and Return Policy for EmojiKart. Learn about our refund process, return procedures, and customer satisfaction guarantee for our free online emoji keyboard service.",
  keywords: [
    "refund policy",
    "return policy",
    "emoji keyboard refund",
    "customer service",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Refund & Return Policy | Free Online Emoji Keyboard - EmojiKart",
    description:
      "Refund and Return Policy for EmojiKart. Learn about our refund process and customer satisfaction guarantee.",
    type: "website",
    url: "https://emojikart.com/refund-policy",
  },
  alternates: {
    canonical: "https://emojikart.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return <EmojiKeyboardClient />;
}

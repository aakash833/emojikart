import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Privacy Policy | Free Online Emoji Keyboard",
  description:
    "Privacy Policy for our free online emoji keyboard. Learn how we protect your data and privacy.",
  robots: "index, follow",
};

export default function PrivacyPolicyPage() {
  return <EmojiKeyboardClient />;
}

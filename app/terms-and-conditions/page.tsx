import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Terms and Conditions | Free Online Emoji Keyboard",
  description:
    "Terms and Conditions for using our free online emoji keyboard service.",
  robots: "index, follow",
};

export default function TermsAndConditionsPage() {
  return <EmojiKeyboardClient />;
}

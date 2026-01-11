import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { StructuredData } from "@/components/structured-data";

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
  return (
    <>
      <EmojiKeyboardClient />
      {generateStructuredData()}
    </>
  );
}

// Add FAQ structured data for the homepage to help rich results in search
export function generateStructuredData() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I copy an emoji?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click or tap any emoji in the keyboard to copy it to your clipboard, then paste it wherever you like.",
        },
      },
      {
        "@type": "Question",
        name: "Is this emoji keyboard free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Emoji Keyboard is free to use. No account required.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store my data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We only store optional preferences locally in your browser. See our Privacy Policy for details.",
        },
      },
    ],
  };

  return <StructuredData type="WebPage" data={faq} />;
}

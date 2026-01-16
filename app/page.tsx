import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: "Emoji keyboard online 😊",
  description:
    "Emoji keyboard online 😊 - Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. ✂️ Copy and 📋 Paste Emoji 👍 No apps required",
  keywords: [
    "emoji keyboard",
    "emoji keyboard online",
    "emoji copy and paste",
    "copy and paste emojis",
    "emojis copy and paste",
    "online emoji keyboard",
    "free emoji keyboard",
    "emoji picker",
    "emoji picker online",
    "copy emoji",
    "emoji copy",
    "paste emoji",
    "copy paste emoji",
    "emoji copy paste",
    "free emojis",
    "emoji search",
    "emoji categories",
    "unicode emojis",
    "unicode emoji keyboard",
    "emoji list",
    "smiley emojis",
    "emoji tool",
    "emoji for twitter",
    "emoji for facebook",
    "emoji for instagram",
    "emoji for whatsapp",
    "emoji for slack",
    "emoji for snapchat",
    "emoji for github",
  ],
  openGraph: {
    title: "Emoji keyboard online 😊 - Click to copy 🔥 emoji",
    description:
      "Emoji keyboard online 😊 - Click to copy 🔥 emoji - Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more.",
    type: "website",
    url: "https://emojikart.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji keyboard online 😊 - Click to copy 🔥 emoji",
    description:
      "Emoji keyboard online 😊 - Click to copy 🔥 emoji - Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis.",
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
        name: "How do I use the emoji keyboard online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Click or tap any emoji in the keyboard to copy it to your clipboard, then paste it wherever you like. No apps or downloads required - it works directly in your browser.",
        },
      },
      {
        "@type": "Question",
        name: "Is this emoji keyboard free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Emoji keyboard online 😊 is completely free to use. No account required, no registration needed.",
        },
      },
      {
        "@type": "Question",
        name: "What is an emoji keyboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An emoji keyboard is an online tool that allows you to browse, search, and copy emojis instantly. Our emoji keyboard online features thousands of emojis organized by categories like smileys, animals, food, flags, and more.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store my data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We only store optional preferences locally in your browser (like theme and emoji size). We don't collect or store any personal information. See our Privacy Policy for details.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these emojis on social media?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can copy and paste emojis from our emoji keyboard online to Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, and any other platform that supports emojis.",
        },
      },
    ],
  };

  return <StructuredData type="WebPage" data={faq} />;
}

import type { Metadata } from "next";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  title: {
    default: "Free Online Emoji Keyboard 😊 - Copy & Paste 3000+ Emojis Instantly | EmojiKart",
    template: "%s | EmojiKart - Free Online Emoji Keyboard",
  },
  description:
    "Free online emoji keyboard with 3000+ emojis to copy and paste instantly. No download required. Browse smileys, animals, flags, and latest Unicode emojis. Works on all devices. Copy emojis for Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, email, and more. ✂️ Copy and 📋 Paste Emoji 👍 100% Free Forever",
  keywords: [
    "emoji keyboard",
    "emoji keyboard online",
    "free emoji keyboard",
    "online emoji keyboard",
    "emoji copy and paste",
    "copy and paste emojis",
    "emojis copy and paste",
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
    "best emoji keyboard",
    "emoji keyboard free",
    "emoji keyboard app",
    "emoji keyboard download",
    "how to use emoji keyboard",
    "emoji keyboard chrome",
    "emoji keyboard windows",
    "emoji keyboard mac",
    "emoji keyboard android",
    "emoji keyboard iphone",
  ],
  authors: [{ name: "EmojiKart", url: "https://emojikart.com" }],
  creator: "EmojiKart",
  publisher: "EmojiKart",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Free Online Emoji Keyboard 😊 - Copy & Paste 3000+ Emojis Instantly",
    description:
      "Free online emoji keyboard with 3000+ emojis to copy and paste instantly. No download required. Works on all devices. Copy emojis for Twitter, Facebook, Instagram, WhatsApp, Slack, and more. 100% Free Forever.",
    type: "website",
    url: "https://emojikart.com",
    siteName: "EmojiKart - Free Online Emoji Keyboard",
    locale: "en_US",
    images: [
      {
        url: "https://emojikart.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "EmojiKart - Free Online Emoji Keyboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Emoji Keyboard 😊 - Copy & Paste 3000+ Emojis Instantly",
    description:
      "Free online emoji keyboard with 3000+ emojis. No download required. Copy emojis for Twitter, Facebook, Instagram, WhatsApp, and more. 100% Free Forever.",
    images: ["https://emojikart.com/og-image.svg"],
    creator: "@emojikart",
    site: "@emojikart",
  },
  alternates: {
    canonical: "https://emojikart.com",
  },
  category: "Tools",
  classification: "Utility",
};

export default function HomePage() {
  return (
    <>
      <EmojiKeyboardClient />
      {generateStructuredData()}
    </>
  );
}

// Comprehensive structured data for the homepage to help rich results in search
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
          text: "Click or tap any emoji in the keyboard to copy it to your clipboard, then paste it wherever you like. No apps or downloads required - it works directly in your browser. Simply visit emojikart.com, browse emojis by category or search, click to copy, and paste anywhere.",
        },
      },
      {
        "@type": "Question",
        name: "Is this emoji keyboard free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — EmojiKart is completely free to use forever. No account required, no registration needed, no hidden costs, and no premium features. All 3000+ emojis are available for free.",
        },
      },
      {
        "@type": "Question",
        name: "What is an emoji keyboard?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An emoji keyboard is an online tool that allows you to browse, search, and copy emojis instantly. Our free emoji keyboard features over 3000 emojis organized into 9 categories including smileys, animals, food, flags, symbols, and more. It works on all devices - desktop, tablet, and mobile.",
        },
      },
      {
        "@type": "Question",
        name: "Do you store my data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We only store optional preferences locally in your browser (like theme and emoji size). We don't collect, store, or share any personal information. Your privacy is our priority. See our Privacy Policy for complete details.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use these emojis on social media?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can copy and paste emojis from our emoji keyboard to Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, email, and any other platform that supports emojis. All emojis are Unicode standard and work universally.",
        },
      },
      {
        "@type": "Question",
        name: "How many emojis are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our free emoji keyboard includes over 3000 emojis from the latest Unicode standard, organized into 9 main categories: Smileys & Emotion, People & Body, Animals & Nature, Food & Drink, Activities, Travel & Places, Objects, Symbols, and Flags.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to download an app?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, you don't need to download anything. Our emoji keyboard works directly in your web browser. Just visit emojikart.com and start using it immediately. It works on Windows, Mac, Linux, iOS, and Android devices.",
        },
      },
      {
        "@type": "Question",
        name: "Can I search for specific emojis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Our emoji keyboard includes a powerful search feature. Simply type keywords like 'happy', 'love', 'food', or 'celebration' in the search bar to instantly find relevant emojis. You can also browse by category for easier discovery.",
        },
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://emojikart.com/#website",
    name: "EmojiKart - Free Online Emoji Keyboard",
    url: "https://emojikart.com",
    description: "Free online emoji keyboard with 3000+ emojis to copy and paste instantly. No download required. Works on all devices.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://emojikart.com?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": "https://emojikart.com/#organization",
    },
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Use the Free Online Emoji Keyboard",
    description: "Learn how to copy and paste emojis using our free online emoji keyboard",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Visit EmojiKart",
        text: "Go to emojikart.com in your web browser. No registration or download required.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Browse or Search Emojis",
        text: "Browse emojis by category using the sidebar, or use the search bar to find specific emojis by keyword.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Click to Copy",
        text: "Click on any emoji to instantly copy it to your clipboard. You'll see a confirmation popup.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Paste Anywhere",
        text: "Paste the copied emoji anywhere you want using Ctrl+V (Windows/Linux) or Cmd+V (Mac). Works on all platforms including social media, email, and messaging apps.",
      },
    ],
  };

  return (
    <>
      <StructuredData type="WebPage" data={faq} />
      <StructuredData type="WebSite" data={website} />
      <StructuredData type="HowTo" data={howTo} />
    </>
  );
}

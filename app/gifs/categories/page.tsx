import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "GIF Categories - Browse GIFs by Category | Reaction, Funny, Meme GIFs",
  description:
    "Browse GIFs by category - reactions, emotions, celebrations, animals, memes, funny, love, success, sports, food, travel, and more. Find the perfect GIF for any situation organized by category. Free GIF category browser.",
  keywords: [
    "gif categories",
    "gif by category",
    "browse gifs by category",
    "gif category browser",
    "gif category finder",
    "gif category search",
    "gif category list",
    "gif category directory",
    "reaction gifs",
    "reaction gif",
    "reaction gifs category",
    "funny gifs",
    "funny gif",
    "funny gifs category",
    "meme gifs",
    "meme gif",
    "meme gifs category",
    "celebration gifs",
    "celebration gif",
    "celebration gifs category",
    "animal gifs",
    "animal gif",
    "animal gifs category",
    "love gifs",
    "love gif",
    "love gifs category",
    "emotion gifs",
    "emotion gif",
    "emotion gifs category",
    "success gifs",
    "success gif",
    "success gifs category",
    "greeting gifs",
    "greeting gif",
    "greeting gifs category",
    "sports gifs",
    "sports gif",
    "sports gifs category",
    "food gifs",
    "food gif",
    "food gifs category",
    "travel gifs",
    "travel gif",
    "travel gifs category",
    "gif categories list",
    "all gif categories",
    "gif category types",
    "gif category browse",
    "gif category explorer",
    "gif category finder",
    "gif category search",
    "gif category directory",
    "gif category library",
    "gif category collection",
    "gif category database",
    "gif finder categories",
    "gif search categories",
    "gif browser categories",
    "gif keyboard",
    "gif online",
    "free gif categories",
    "emoji keyboard",
    "emoji keyboard online",
  ],
  openGraph: {
    title: "GIF Categories - Browse GIFs by Category | Reaction, Funny, Meme GIFs",
    description:
      "Browse GIFs by category - reactions, emotions, celebrations, animals, memes, funny, love, success, sports, food, travel, and more. Find the perfect GIF for any situation organized by category.",
    type: "website",
    url: "https://emojikart.com/gifs/categories",
    images: [
      {
        url: "https://emojikart.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GIF Categories - Browse GIFs by Category",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIF Categories - Browse GIFs by Category | Reaction, Funny, Meme GIFs",
    description:
      "Browse GIFs by category - reactions, emotions, celebrations, animals, memes, funny, love, success, and more. Find the perfect GIF for any situation.",
    images: ["https://emojikart.com/og-image.svg"],
  },
  alternates: {
    canonical: "https://emojikart.com/gifs/categories",
  },
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
};

export default function GifCategoriesPage() {
  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "GIF Categories - Browse GIFs by Category",
          description:
            "Browse GIFs organized by category - reactions, emotions, celebrations, animals, memes, funny, love, success, sports, food, travel, and more. Find the perfect GIF for any situation organized by category.",
          url: "https://emojikart.com/gifs/categories",
          about: {
            "@type": "Thing",
            name: "GIF Categories",
            description: "Organized collection of GIFs by category including reactions, emotions, celebrations, animals, memes, and more",
          },
        }}
      />
      <StructuredData
        type="FAQPage"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What GIF categories are available?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We offer 12+ GIF categories including: Reactions, Emotions, Celebrations, Animals, Memes, Funny, Love, Success, Greetings, Sports, Food, and Travel. Each category contains hundreds of GIFs organized for easy browsing.",
              },
            },
            {
              "@type": "Question",
              name: "How do I browse GIFs by category?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Simply click on any category card to view all GIFs in that category. You can then search within the category or browse through the collection. Each category is organized to help you find the perfect GIF quickly.",
              },
            },
            {
              "@type": "Question",
              name: "Can I search for GIFs within a category?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! After selecting a category, you can use the search function to find specific GIFs within that category. This makes it easy to find exactly what you're looking for.",
              },
            },
          ],
        }}
      />
    </>
  );
}

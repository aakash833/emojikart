import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";
import { getRecentPosts } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Emoji Blog - Tips, Guides & Trends | Emoji keyboard online 😊 - Click to copy 🔥 emoji",
  description:
    "Read the latest emoji blog posts covering emoji meanings, trends, marketing strategies, professional communication, and more. Expert guides and tips for using emojis effectively.",
  keywords: [
    "emoji blog",
    "emoji articles",
    "emoji guides",
    "emoji tips",
    "emoji trends",
    "emoji marketing",
    "emoji communication",
    "emoji keyboard",
    "emoji keyboard online",
  ],
  openGraph: {
    title: "Emoji Blog - Tips, Guides & Trends | Emoji keyboard online 😊",
    description:
      "Read the latest emoji blog posts covering emoji meanings, trends, marketing strategies, and professional communication tips.",
    type: "website",
    url: "https://emojikart.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Blog - Tips, Guides & Trends",
    description:
      "Expert guides and tips for using emojis effectively in your digital communications.",
  },
  alternates: {
    canonical: "https://emojikart.com/blog",
  },
};

export default function BlogPage() {
  const recentPosts = getRecentPosts(8);

  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Emoji Blog - Tips, Guides & Trends",
          description:
            "Expert guides, tips, and insights about emojis and digital communication",
          url: "https://emojikart.com/blog",
          blogPost: recentPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedDate,
            author: {
              "@type": "Person",
              name: post.author,
            },
            url: `https://emojikart.com/blog/${post.slug}`,
          })),
        }}
      />
    </>
  );
}

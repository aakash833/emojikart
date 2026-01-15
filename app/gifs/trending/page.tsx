import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "Trending GIFs 2025 - Most Popular & Viral GIFs | Hot GIFs Right Now",
  description:
    "Discover the most trending and popular GIFs of 2025. Find viral GIFs, hot GIFs, reaction GIFs, and the hottest GIFs everyone is using right now. Updated daily with the latest trending GIFs. Copy trending GIF URLs instantly.",
  keywords: [
    "trending gifs",
    "trending gifs 2025",
    "popular gifs",
    "viral gifs",
    "hot gifs",
    "gif trends",
    "gif trends 2025",
    "most popular gifs",
    "most trending gifs",
    "top gifs",
    "top trending gifs",
    "best gifs",
    "hottest gifs",
    "gif of the day",
    "gif trending now",
    "gif viral",
    "viral gif",
    "trending gif finder",
    "trending gif search",
    "popular gif finder",
    "viral gif finder",
    "hot gif finder",
    "trending gifs today",
    "trending gifs this week",
    "trending gifs this month",
    "latest trending gifs",
    "new trending gifs",
    "current trending gifs",
    "gif trends today",
    "gif trends 2025",
    "gif trends now",
    "what gifs are trending",
    "trending reaction gifs",
    "trending funny gifs",
    "trending meme gifs",
    "trending gif collection",
    "trending gif library",
    "trending gif database",
    "gif finder trending",
    "gif search trending",
    "gif browser trending",
    "gif keyboard",
    "gif online",
    "free trending gifs",
    "emoji keyboard",
    "emoji keyboard online",
  ],
  openGraph: {
    title: "Trending GIFs 2025 - Most Popular & Viral GIFs | Hot GIFs Right Now",
    description:
      "Discover the most trending and popular GIFs of 2025. Find viral GIFs, hot GIFs, reaction GIFs, and the hottest GIFs everyone is using right now. Updated daily.",
    type: "website",
    url: "https://emojikart.com/gifs/trending",
    images: [
      {
        url: "https://emojikart.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Trending GIFs 2025 - Most Popular & Viral GIFs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trending GIFs 2025 - Most Popular & Viral GIFs | Hot GIFs Right Now",
    description:
      "Discover the most trending and popular GIFs of 2025. Find viral GIFs, hot GIFs, reaction GIFs, and the hottest GIFs everyone is using right now.",
    images: ["https://emojikart.com/og-image.svg"],
  },
  alternates: {
    canonical: "https://emojikart.com/gifs/trending",
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

export default function TrendingGifsPage() {
  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Trending GIFs 2025 - Most Popular & Viral GIFs",
          description:
            "Discover the most trending and popular GIFs of 2025. Find viral GIFs, hot GIFs, reaction GIFs, and the hottest GIFs everyone is using right now. Updated daily with the latest trending GIFs.",
          url: "https://emojikart.com/gifs/trending",
          about: {
            "@type": "Thing",
            name: "Trending GIFs",
            description: "Most popular and viral GIFs trending in 2025",
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
              name: "What are trending GIFs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Trending GIFs are the most popular and viral GIFs that are currently being used and shared the most across social media and messaging platforms. These GIFs are updated daily to reflect what's hot and popular right now.",
              },
            },
            {
              "@type": "Question",
              name: "How often are trending GIFs updated?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our trending GIFs are updated daily to ensure you always have access to the latest and most popular GIFs that everyone is using. The trending list reflects current viral content and popular reactions.",
              },
            },
            {
              "@type": "Question",
              name: "Can I copy trending GIF URLs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! You can instantly copy any trending GIF URL with one click. Simply click the copy button on any GIF and paste the URL wherever you want to use it - social media, messaging apps, emails, or websites.",
              },
            },
          ],
        }}
      />
    </>
  );
}

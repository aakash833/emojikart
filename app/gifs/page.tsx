import type { Metadata } from "next";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export const metadata: Metadata = {
  title: "GIF Finder - Search, Download & Find GIFs Online Free | GIF Search Engine 2025",
  description:
    "GIF finder and search engine - Find millions of free GIFs online. Search GIFs by keyword, browse by category, discover trending GIFs. Download GIFs in high quality or copy GIF URLs instantly. Best GIF finder tool with download feature for reactions, memes, funny GIFs, and more. No registration required.",
  keywords: [
    "gif finder",
    "gif search",
    "find gifs",
    "gif search engine",
    "gif browser",
    "gif library",
    "gif collection",
    "gif database",
    "gif directory",
    "gif lookup",
    "gif discover",
    "gif explorer",
    "gif searcher",
    "gif tool",
    "gif website",
    "gif platform",
    "gif site",
    "gif search tool",
    "gif finder online",
    "gif search online",
    "free gif finder",
    "free gif search",
    "gif finder free",
    "gif search free",
    "online gif finder",
    "online gif search",
    "gif finder tool",
    "gif search tool",
    "gif finder website",
    "gif search website",
    "gif finder app",
    "gif search app",
    "gif finder 2025",
    "gif search 2025",
    "best gif finder",
    "best gif search",
    "gif finder engine",
    "gif search engine",
    "gif finder site",
    "gif search site",
    "reaction gifs",
    "funny gifs",
    "meme gifs",
    "gif keyboard",
    "gif online",
    "free gifs",
    "gif categories",
    "trending gifs",
    "popular gifs",
    "viral gifs",
    "gif reactions",
    "gif emotions",
    "gif celebrations",
    "gif memes",
    "gif animations",
    "animated gifs",
    "gif images",
    "gif pictures",
    "gif clips",
    "gif videos",
    "copy gif",
    "gif url",
    "gif link",
    "share gif",
    "download gif",
    "download gifs",
    "gif download",
    "gif downloads",
    "download gif free",
    "free gif download",
    "gif downloader",
    "gif download tool",
    "download gifs online",
    "online gif download",
    "gif download site",
    "gif download website",
    "download gif high quality",
    "high quality gif download",
    "gif download hd",
    "hd gif download",
    "download gif original",
    "original gif download",
    "download gif full quality",
    "full quality gif download",
    "save gif",
    "save gifs",
    "gif saver",
    "download animated gif",
    "animated gif download",
    "download gif file",
    "gif file download",
    "download gif images",
    "gif images download",
    "gif for social media",
    "gif for twitter",
    "gif for facebook",
    "gif for instagram",
    "gif for whatsapp",
    "gif for discord",
    "gif for slack",
    "gif for email",
    "emoji keyboard",
    "emoji keyboard online",
  ],
  openGraph: {
    title: "GIF Finder - Search, Download & Find GIFs Online Free | GIF Search Engine 2025",
    description:
      "GIF finder and search engine - Find millions of free GIFs online. Search GIFs by keyword, browse by category, discover trending GIFs. Download GIFs in high quality or copy GIF URLs instantly. Best GIF finder tool with download feature.",
    type: "website",
    url: "https://emojikart.com/gifs",
    images: [
      {
        url: "https://emojikart.com/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GIF Finder - Search & Find GIFs Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GIF Finder - Search, Download & Find GIFs Online Free | GIF Search Engine 2025",
    description:
      "GIF finder and search engine - Find millions of free GIFs online. Search GIFs by keyword, browse by category, discover trending GIFs. Download GIFs in high quality or copy GIF URLs instantly.",
    images: ["https://emojikart.com/gifs/opengraph-image"],
  },
  alternates: {
    canonical: "https://emojikart.com/gifs",
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

export default function GifsPage() {
  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "GIF Finder - Search, Download & Find GIFs Online Free",
          description:
            "Free online GIF finder and search engine. Find millions of GIFs by keyword, category, or trending. Download GIFs in high quality or copy GIF URLs instantly. Best GIF finder tool with download feature for reactions, memes, funny GIFs, and social media.",
          url: "https://emojikart.com/gifs",
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
          featureList: [
            "GIF search by keyword",
            "Browse GIFs by category",
            "Trending GIFs discovery",
            "Download GIFs in high quality",
            "Copy GIF URLs instantly",
            "Free GIF finder tool",
            "No registration required",
            "Reaction GIFs",
            "Funny GIFs",
            "Meme GIFs",
            "Original quality downloads",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            ratingCount: "1250",
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
              name: "What is a GIF finder?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A GIF finder is an online tool that helps you search and discover GIFs (Graphics Interchange Format images) from a large database. Our GIF finder allows you to search by keyword, browse by category, or discover trending GIFs. You can copy GIF URLs instantly and use them on social media, messaging apps, or websites.",
              },
            },
            {
              "@type": "Question",
              name: "How do I use the GIF finder?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Using our GIF finder is simple: 1) Enter a keyword in the search bar to find specific GIFs, 2) Browse by category (reactions, emotions, celebrations, etc.), 3) Click on any GIF to copy its URL, 4) Paste the GIF URL wherever you need it. No registration or download required.",
              },
            },
            {
              "@type": "Question",
              name: "Is the GIF finder free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, our GIF finder is completely free to use. You can search, browse, and copy GIF URLs without any cost, registration, or subscription. All features are available at no charge.",
              },
            },
            {
              "@type": "Question",
              name: "Can I download GIFs?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! You can download any GIF in high quality with one click. Simply hover over a GIF and click the 'Download' button to save it to your device. Downloads are in original quality for the best results. You can also copy GIF URLs to share them online.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use GIFs found here on social media?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes! You can use the GIFs you find on any platform that supports GIFs, including Twitter, Facebook, Instagram, WhatsApp, Discord, Slack, email, and more. You can download GIFs to use offline or copy the GIF URL to share online.",
              },
            },
            {
              "@type": "Question",
              name: "What types of GIFs can I find?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Our GIF finder includes millions of GIFs across various categories: reaction GIFs, funny GIFs, meme GIFs, celebration GIFs, emotion GIFs, animal GIFs, sports GIFs, food GIFs, travel GIFs, and more. You can also discover trending and popular GIFs.",
              },
            },
          ],
        }}
      />
    </>
  );
}

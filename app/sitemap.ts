import { MetadataRoute } from "next";
import { emojiData } from "@/lib/emoji-data";
import { getAllEmojis } from "@/lib/get-all-emojis";

const categorySlugs: Record<string, string> = {
  "smileys-emotion": "Smileys & Emotion",
  "people-body": "People & Body",
  "animals-nature": "Animals & Nature",
  "food-drink": "Food & Drink",
  activities: "Activities",
  "travel-places": "Travel & Places",
  objects: "Objects",
  symbols: "Symbols",
  flags: "Flags",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://emojikart.com"; // Replace with your actual domain

  // Category pages
  const categoryPages = Object.keys(categorySlugs).map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Individual emoji pages
  const allEmojis = getAllEmojis();
  const emojiPages = allEmojis.map((emoji) => ({
    url: `${baseUrl}/emoji/${emoji.name.toLowerCase().replace(/_/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Required pages
  const requiredPages = [
    { url: `${baseUrl}/privacy-policy`, priority: 0.5 },
    { url: `${baseUrl}/terms-and-conditions`, priority: 0.5 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
    { url: `${baseUrl}/about`, priority: 0.6 },
  ].map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page.priority as 0.5 | 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryPages,
    ...requiredPages,
    ...emojiPages.slice(0, 1000), // Limit to first 1000 for performance, Google will crawl more
  ];
}

import { MetadataRoute } from "next";
import { emojiData } from "@/lib/emoji-data";
import { getAllEmojis } from "@/lib/get-all-emojis";
import { getTrendingGiphyGIFs } from "@/lib/giphy-api";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  // Feature pages (high priority for SEO)
  const featurePages = [
    { url: `${baseUrl}/emoji-generator`, priority: 0.9 },
    { url: `${baseUrl}/emoji-meanings`, priority: 0.9 },
    { url: `${baseUrl}/emoji-trends`, priority: 0.9 },
    { url: `${baseUrl}/gifs`, priority: 0.9 },
    { url: `${baseUrl}/gifs/trending`, priority: 0.85 },
    { url: `${baseUrl}/gifs/categories`, priority: 0.85 },
    { url: `${baseUrl}/blog`, priority: 0.85 },
  ].map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: page.priority as 0.9 | 0.85,
  }));

  // Blog posts (high priority for SEO and content)
  const blogPosts = [
    { url: `${baseUrl}/blog/complete-guide-to-emoji-meanings-2025`, priority: 0.9 },
    { url: `${baseUrl}/blog/best-emoji-combinations-for-social-media`, priority: 0.9 },
    { url: `${baseUrl}/blog/emoji-trends-2025-whats-hot`, priority: 0.9 },
    { url: `${baseUrl}/blog/how-to-use-emojis-in-professional-communication`, priority: 0.85 },
    { url: `${baseUrl}/blog/emoji-psychology-why-we-love-emojis`, priority: 0.85 },
    { url: `${baseUrl}/blog/emoji-etiquette-dos-and-donts`, priority: 0.85 },
    { url: `${baseUrl}/blog/emoji-history-evolution-of-digital-expression`, priority: 0.85 },
    { url: `${baseUrl}/blog/emoji-marketing-how-brands-use-emojis`, priority: 0.85 },
    { url: `${baseUrl}/blog/emoji-accessibility-making-digital-communication-inclusive`, priority: 0.85 },
  ].map((post) => ({
    url: post.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: post.priority as 0.9 | 0.85,
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

  // Individual GIF pages - Fetch trending GIFs to include in sitemap
  let gifPages: MetadataRoute.Sitemap = [];
  try {
    // Fetch top 100 trending GIFs for sitemap
    const trendingResult = await getTrendingGiphyGIFs(100, 0);
    gifPages = trendingResult.gifs.map((gif) => ({
      url: `${baseUrl}/gif/${gif.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8, // High priority for individual GIF pages
    }));
  } catch (error) {
    console.error("Error fetching GIFs for sitemap:", error);
    // Continue without GIF pages if API fails
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...featurePages,
    ...blogPosts,
    ...categoryPages,
    ...requiredPages,
    ...gifPages, // Individual GIF pages
    ...emojiPages.slice(0, 1000), // Limit to first 1000 for performance, Google will crawl more
  ];
}

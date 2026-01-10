import Fuse from "fuse.js";
import { emojiData } from "./emoji-data";

export type EmojiWithCategory = {
  emoji: string;
  name: string;
  category: string;
  keywords?: string[];
  description?: string;
};

// Flatten all emojis with their categories for search
const allEmojis: EmojiWithCategory[] = Object.entries(emojiData).flatMap(
  ([category, emojis]) =>
    emojis.map((emoji) => ({ ...emoji, category }))
);

// Configure Fuse.js for fuzzy search with keywords and descriptions
const fuse = new Fuse(allEmojis, {
  keys: [
    { name: "name", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "keywords", weight: 0.3 },
    { name: "category", weight: 0.1 },
  ],
  threshold: 0.4, // Slightly higher for more flexible matching
  includeScore: true,
  minMatchCharLength: 1,
  ignoreLocation: true,
  findAllMatches: true,
});

export function searchEmojis(query: string): EmojiWithCategory[] {
  if (!query.trim()) {
    return [];
  }

  const queryLower = query.toLowerCase().trim();
  const queryWords = queryLower.split(/\s+/);

  // First try exact matches in name
  const exactNameMatches = allEmojis.filter((emoji) =>
    emoji.name.toLowerCase().includes(queryLower)
  );

  // Try matches in description
  const descriptionMatches = allEmojis.filter((emoji) =>
    emoji.description?.toLowerCase().includes(queryLower)
  );

  // Try matches in keywords (check if any keyword contains query or vice versa)
  const keywordMatches = allEmojis.filter((emoji) => {
    if (!emoji.keywords || emoji.keywords.length === 0) return false;
    const keywordString = emoji.keywords.join(' ').toLowerCase();
    return queryWords.some(word => keywordString.includes(word)) ||
           emoji.keywords.some(keyword => 
             keyword.toLowerCase().includes(queryLower) ||
             queryWords.some(word => keyword.toLowerCase().includes(word))
           );
  });

  // Then fuzzy search
  const fuzzyResults = fuse.search(query);

  // Combine results, prioritizing exact matches
  const resultMap = new Map<string, { emoji: EmojiWithCategory; priority: number }>();

  // Add exact name matches first (highest priority)
  exactNameMatches.forEach((emoji) => {
    const key = `${emoji.emoji}-${emoji.name}`;
    if (!resultMap.has(key) || resultMap.get(key)!.priority > 1) {
      resultMap.set(key, { emoji, priority: 1 });
    }
  });

  // Add description matches (high priority)
  descriptionMatches.forEach((emoji) => {
    const key = `${emoji.emoji}-${emoji.name}`;
    if (!resultMap.has(key) || resultMap.get(key)!.priority > 2) {
      resultMap.set(key, { emoji, priority: 2 });
    }
  });

  // Add keyword matches (medium priority)
  keywordMatches.forEach((emoji) => {
    const key = `${emoji.emoji}-${emoji.name}`;
    if (!resultMap.has(key) || resultMap.get(key)!.priority > 3) {
      resultMap.set(key, { emoji, priority: 3 });
    }
  });

  // Add fuzzy matches (lower priority, sorted by relevance score)
  fuzzyResults.forEach((result) => {
    const key = `${result.item.emoji}-${result.item.name}`;
    if (!resultMap.has(key)) {
      resultMap.set(key, { emoji: result.item, priority: 4 });
    }
  });

  // Convert map to array, sort by priority, then by score, and limit to top 100 results
  return Array.from(resultMap.values())
    .sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return 0;
    })
    .map(item => item.emoji)
    .slice(0, 100);
}


import { emojiData } from "./emoji-data";

export type EmojiInfo = {
  emoji: string;
  name: string;
  category: string;
  keywords?: string[];
  description?: string;
};

/**
 * Get all emojis flattened with their category information
 */
export function getAllEmojis(): EmojiInfo[] {
  return Object.entries(emojiData).flatMap(([category, emojis]) =>
    emojis.map((emoji) => ({
      ...emoji,
      category,
    }))
  );
}

/**
 * Get emoji by name/slug
 */
export function getEmojiByName(name: string): EmojiInfo | undefined {
  const allEmojis = getAllEmojis();
  return allEmojis.find(
    (e) => e.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get emoji slug from name (for URL)
 */
export function getEmojiSlug(name: string): string {
  return name.toLowerCase().replace(/_/g, "-");
}

/**
 * Get emoji name from slug (reverse of getEmojiSlug)
 */
export function getEmojiNameFromSlug(slug: string): string {
  return slug.replace(/-/g, "_");
}


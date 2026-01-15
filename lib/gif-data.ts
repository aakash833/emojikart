export interface GIF {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  category: string;
  tags: string[];
  trending: boolean;
  popular: boolean;
}

export const gifCategories = [
  "Reactions",
  "Emotions",
  "Celebrations",
  "Animals",
  "Memes",
  "Funny",
  "Love",
  "Success",
  "Greetings",
  "Sports",
  "Food",
  "Travel",
] as const;

export type GIFCategory = typeof gifCategories[number];

// Popular GIFs data (using placeholder URLs - in production, these would be from Giphy API or similar)
export const popularGIFs: GIF[] = [
  {
    id: "gif-1",
    title: "Happy Dance",
    url: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/200w.gif",
    category: "Celebrations",
    tags: ["happy", "dance", "celebration", "excited"],
    trending: true,
    popular: true,
  },
  {
    id: "gif-2",
    title: "Thumbs Up",
    url: "https://media.giphy.com/media/3o7aD2saQhv5U2i7Go/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7aD2saQhv5U2i7Go/200w.gif",
    category: "Reactions",
    tags: ["approval", "good", "yes", "ok"],
    trending: true,
    popular: true,
  },
  {
    id: "gif-3",
    title: "Laughing Hard",
    url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/200w.gif",
    category: "Emotions",
    tags: ["laugh", "funny", "hilarious", "comedy"],
    trending: true,
    popular: true,
  },
  {
    id: "gif-4",
    title: "Heart Eyes",
    url: "https://media.giphy.com/media/3o7aD2saQhv5U2i7Go/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7aD2saQhv5U2i7Go/200w.gif",
    category: "Love",
    tags: ["love", "heart", "romance", "affection"],
    trending: false,
    popular: true,
  },
  {
    id: "gif-5",
    title: "Fire Celebration",
    url: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/200w.gif",
    category: "Celebrations",
    tags: ["fire", "amazing", "hot", "trending"],
    trending: true,
    popular: false,
  },
  {
    id: "gif-6",
    title: "Success Dance",
    url: "https://media.giphy.com/media/3o7aD2saQhv5U2i7Go/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7aD2saQhv5U2i7Go/200w.gif",
    category: "Success",
    tags: ["success", "win", "victory", "achievement"],
    trending: false,
    popular: true,
  },
  {
    id: "gif-7",
    title: "Wave Hello",
    url: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7abKhOpu0NwenH3O/200w.gif",
    category: "Greetings",
    tags: ["hello", "hi", "greeting", "welcome"],
    trending: false,
    popular: true,
  },
  {
    id: "gif-8",
    title: "Cute Cat",
    url: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/giphy.gif",
    previewUrl: "https://media.giphy.com/media/3o7aCTPPm4OHfRLSH6/200w.gif",
    category: "Animals",
    tags: ["cat", "cute", "pet", "adorable"],
    trending: true,
    popular: true,
  },
];

export const trendingGIFs: GIF[] = popularGIFs.filter((gif) => gif.trending);

export function getGIFsByCategory(category: GIFCategory): GIF[] {
  return popularGIFs.filter((gif) => gif.category === category);
}

export function searchGIFs(query: string): GIF[] {
  const lowerQuery = query.toLowerCase();
  return popularGIFs.filter(
    (gif) =>
      gif.title.toLowerCase().includes(lowerQuery) ||
      gif.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      gif.category.toLowerCase().includes(lowerQuery)
  );
}

export function getPopularGIFs(limit: number = 10): GIF[] {
  return popularGIFs.filter((gif) => gif.popular).slice(0, limit);
}

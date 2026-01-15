// Giphy API integration
// Get a free API key from https://developers.giphy.com/
// Add NEXT_PUBLIC_GIPHY_API_KEY to your .env.local file
// Example: NEXT_PUBLIC_GIPHY_API_KEY=your_api_key_here

// Using public beta key as fallback (rate limited)
// Replace with your own key for production use
const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY || "GlVGYHkr3WSBnllca54iNt0yFbjz7L65";
const GIPHY_BASE_URL = "https://api.giphy.com/v1/gifs";

export interface GiphyGIF {
  id: string;
  title: string;
  url: string;
  images: {
    original: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    downsized_large?: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_width: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
    fixed_width_small: {
      url: string;
      width: string;
      height: string;
      size: string;
    };
  };
  trending_datetime?: string;
}

export interface GiphyResponse {
  data: GiphyGIF[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

// Search GIFs
export async function searchGiphyGIFs(
  query: string,
  limit: number = 25
): Promise<GiphyGIF[]> {
  try {
    // Request higher quality images by not limiting size
    const url = `${GIPHY_BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
      query
    )}&limit=${limit}&rating=g&lang=en`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch GIFs");
    }
    
    const data: GiphyResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
}

// Get trending GIFs
export async function getTrendingGiphyGIFs(
  limit: number = 25
): Promise<GiphyGIF[]> {
  try {
    const url = `${GIPHY_BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&rating=g`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch trending GIFs");
    }
    
    const data: GiphyResponse = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching trending GIFs:", error);
    return [];
  }
}

// Get GIFs by category
export async function getGiphyGIFsByCategory(
  category: string,
  limit: number = 25
): Promise<GiphyGIF[]> {
  try {
    // Map our categories to Giphy search terms
    const categoryMap: Record<string, string> = {
      Reactions: "reaction",
      Emotions: "emotion",
      Celebrations: "celebration",
      Animals: "cute animals",
      Memes: "meme",
      Funny: "funny",
      Love: "love",
      Success: "success",
      Greetings: "hello",
      Sports: "sports",
      Food: "food",
      Travel: "travel",
    };

    const searchTerm = categoryMap[category] || category.toLowerCase();
    return await searchGiphyGIFs(searchTerm, limit);
  } catch (error) {
    console.error("Error fetching category GIFs:", error);
    return [];
  }
}

// Convert Giphy GIF to our format
export function convertGiphyToGIF(giphy: GiphyGIF): {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  downloadUrl: string;
  category: string;
  tags: string[];
  trending: boolean;
  popular: boolean;
} {
  // Use higher quality preview - prefer fixed_width over fixed_width_small for better quality
  // Use downsized_large if available for even better preview quality, otherwise use fixed_width
  const previewUrl = giphy.images.downsized_large?.url || 
                     giphy.images.fixed_width.url || 
                     giphy.images.fixed_width_small.url;
  
  // Use original URL for downloads (highest quality)
  const downloadUrl = giphy.images.original.url;
  
  return {
    id: giphy.id,
    title: giphy.title || "GIF",
    url: giphy.images.original.url, // Original URL for sharing
    previewUrl: previewUrl, // Higher quality preview
    downloadUrl: downloadUrl, // Original quality for download
    category: "Reactions", // Default category
    tags: [],
    trending: !!giphy.trending_datetime,
    popular: false,
  };
}

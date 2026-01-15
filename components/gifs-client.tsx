"use client";

import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Copy, Download, TrendingUp, Filter, Loader2 } from "lucide-react";
import { gifCategories, type GIFCategory } from "@/lib/gif-data";
import { hapticCopy } from "@/lib/haptics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchGiphyGIFs, getGiphyGIFsByCategory, getTrendingGiphyGIFs, convertGiphyToGIF, type GiphyGIF } from "@/lib/giphy-api";

interface GIF {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  category: string;
  tags: string[];
  trending: boolean;
  popular: boolean;
}

export function GifsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GIFCategory | "All">("All");
  const [copiedGifId, setCopiedGifId] = useState<string | null>(null);
  const [gifs, setGifs] = useState<GIF[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Load GIFs based on search or category
  useEffect(() => {
    const loadGIFs = async () => {
      setLoading(true);
      try {
        let giphyGIFs: GiphyGIF[] = [];

        if (searchQuery.trim()) {
          // Search GIFs
          giphyGIFs = await searchGiphyGIFs(searchQuery, 25);
        } else if (selectedCategory !== "All") {
          // Get by category
          giphyGIFs = await getGiphyGIFsByCategory(selectedCategory, 25);
        } else {
          // Default: show trending
          const trending = await getTrendingGiphyGIFs(25);
          giphyGIFs = trending;
        }

        const convertedGIFs = giphyGIFs.map(convertGiphyToGIF);
        setGifs(convertedGIFs);
      } catch (error) {
        console.error("Error loading GIFs:", error);
        setGifs([]);
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(() => {
      loadGIFs();
    }, searchQuery.trim() ? 500 : 0);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleCopyGif = async (gif: GIF) => {
    try {
      await navigator.clipboard.writeText(gif.url);
      hapticCopy();
      setCopiedGifId(gif.id);
      setTimeout(() => {
        setCopiedGifId(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy GIF:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* SEO Content Section */}
        <div className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-8 h-8 text-indigo-500" />
            GIF Finder - Search & Find GIFs Online Free
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Use our powerful <strong>GIF finder</strong> and <strong>GIF search engine</strong> to discover millions of free GIFs online. 
            Search GIFs by keyword, browse by category, or discover trending GIFs. Our <strong>GIF finder tool</strong> helps you find 
            the perfect GIF for any occasion - reactions, emotions, celebrations, memes, funny GIFs, and more. 
            Copy GIF URLs instantly and use them on social media, messaging apps, or websites. 
            <strong> No registration required</strong> - start finding GIFs now!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔍 Search by Keyword</h3>
              <p className="text-muted-foreground">Enter any keyword to find relevant GIFs instantly. Our GIF finder searches millions of GIFs to find exactly what you need.</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-2">📁 Browse by Category</h3>
              <p className="text-muted-foreground">Explore GIFs organized by category - reactions, emotions, celebrations, animals, memes, and more. Perfect for discovering new GIFs.</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔥 Trending GIFs</h3>
              <p className="text-muted-foreground">Discover the most popular and viral GIFs trending right now. Updated daily with the hottest GIFs everyone is using.</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search GIFs by keyword, tag, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg py-6"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
              className="cursor-pointer"
            >
              All
            </Button>
            {gifCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="cursor-pointer"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {!initialLoad && (
          <div className="mb-4 text-sm text-muted-foreground">
            Found {gifs.length} GIF{gifs.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
          </div>
        )}

        {/* GIF Grid */}
        {!loading && gifs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gifs.map((gif) => (
              <Card
                key={gif.id}
                className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    {/* GIF Preview */}
                    <img
                      src={gif.previewUrl}
                      alt={gif.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleCopyGif(gif)}
                      className={cn(
                        "cursor-pointer",
                        copiedGifId === gif.id && "bg-green-600 hover:bg-green-700"
                      )}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {copiedGifId === gif.id ? "Copied!" : "Copy URL"}
                    </Button>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      {gif.trending && (
                        <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                      {gif.popular && (
                        <span className="px-2 py-1 bg-indigo-500 text-white text-xs font-medium rounded">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{gif.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {gif.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No GIFs found. Try a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}

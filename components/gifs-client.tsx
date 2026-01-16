"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Copy, Download, TrendingUp, Filter, Loader2 } from "lucide-react";
import { gifCategories, type GIFCategory } from "@/lib/gif-data";
import { hapticCopy } from "@/lib/haptics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { searchGiphyGIFs, getGiphyGIFsByCategory, getTrendingGiphyGIFs, convertGiphyToGIF, type GiphyGIF } from "@/lib/giphy-api";
import Link from "next/link";

interface GIF {
  id: string;
  title: string;
  url: string;
  previewUrl: string;
  downloadUrl: string;
  category: string;
  tags: string[];
  trending: boolean;
  popular: boolean;
}

export function GifsClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<GIFCategory | "All">("All");
  const [copiedGifId, setCopiedGifId] = useState<string | null>(null);
  const [downloadingGifId, setDownloadingGifId] = useState<string | null>(null);
  const [gifs, setGifs] = useState<GIF[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const observerTarget = useRef<HTMLDivElement>(null);
  const LIMIT = 25;

  // Load GIFs based on search or category (initial load)
  useEffect(() => {
    const loadGIFs = async () => {
      setLoading(true);
      setOffset(0);
      setGifs([]);
      setHasMore(true);

      try {
        let result: { gifs: GiphyGIF[]; hasMore: boolean; totalCount: number };

        if (searchQuery.trim()) {
          // Search GIFs
          result = await searchGiphyGIFs(searchQuery, LIMIT, 0);
        } else if (selectedCategory !== "All") {
          // Get by category
          result = await getGiphyGIFsByCategory(selectedCategory, LIMIT, 0);
        } else {
          // Default: show trending
          result = await getTrendingGiphyGIFs(LIMIT, 0);
        }

        const convertedGIFs = result.gifs.map(convertGiphyToGIF);
        setGifs(convertedGIFs);
        setHasMore(result.hasMore);
        setTotalCount(result.totalCount);
        setOffset(LIMIT);
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

  // Load more GIFs when scrolling
  const loadMoreGIFs = useCallback(async () => {
    if (loadingMore || !hasMore || loading) return;

    setLoadingMore(true);
    try {
      let result: { gifs: GiphyGIF[]; hasMore: boolean; totalCount: number };

      if (searchQuery.trim()) {
        result = await searchGiphyGIFs(searchQuery, LIMIT, offset);
      } else if (selectedCategory !== "All") {
        result = await getGiphyGIFsByCategory(selectedCategory, LIMIT, offset);
      } else {
        result = await getTrendingGiphyGIFs(LIMIT, offset);
      }

      const convertedGIFs = result.gifs.map(convertGiphyToGIF);
      setGifs((prev) => [...prev, ...convertedGIFs]);
      setHasMore(result.hasMore);
      setTotalCount(result.totalCount);
      setOffset((prevOffset) => prevOffset + LIMIT);
    } catch (error) {
      console.error("Error loading more GIFs:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [searchQuery, selectedCategory, offset, hasMore, loadingMore, loading]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          loadMoreGIFs();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loading, loadMoreGIFs]);

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

  const handleDownloadGif = async (gif: GIF) => {
    try {
      setDownloadingGifId(gif.id);
      hapticCopy();
      
      // Fetch the GIF as a blob
      const response = await fetch(gif.downloadUrl);
      if (!response.ok) throw new Error("Failed to download GIF");
      
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      
      // Create a safe filename from the GIF title
      const safeTitle = gif.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()
        .substring(0, 50);
      link.download = `${safeTitle || "gif"}_${gif.id}.gif`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setTimeout(() => {
        setDownloadingGifId(null);
      }, 1000);
    } catch (error) {
      console.error("Failed to download GIF:", error);
      setDownloadingGifId(null);
      alert("Failed to download GIF. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* SEO Content Section */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Search className="w-8 h-8 text-indigo-500" />
            GIF Finder - Search & Find GIFs Online | Download GIFs Online Free
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Use our powerful <strong>GIF finder</strong> and <strong>GIF search engine</strong> to discover millions of free GIFs online. 
            Search GIFs by keyword, browse by category, or discover trending GIFs. Our <strong>GIF finder tool</strong> helps you find 
            the perfect GIF for any occasion - reactions, emotions, celebrations, memes, funny GIFs, and more. 
            <strong> Download GIFs in high quality</strong> or copy GIF URLs instantly and use them on social media, messaging apps, or websites. 
            <strong> No registration required</strong> - start finding and downloading GIFs now!
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔍 Search by Keyword</h3>
              <p className="text-muted-foreground">Enter any keyword to find relevant GIFs instantly. Our GIF finder searches millions of GIFs to find exactly what you need. Download or copy GIF URLs with one click.</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-2">📁 Browse by Category</h3>
              <p className="text-muted-foreground">Explore GIFs organized by category - reactions, emotions, celebrations, animals, memes, and more. Perfect for discovering new GIFs. Download GIFs in high quality.</p>
            </div>
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔥 Trending GIFs</h3>
              <p className="text-muted-foreground">Discover the most popular and viral GIFs trending right now. Updated daily with the hottest GIFs everyone is using. Download trending GIFs in original quality.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters - Sticky (outside container for proper positioning) */}
      <div className="w-full bg-background/95 border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="space-y-4">
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
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {/* Results Count */}
        {!initialLoad && (
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {gifs.length} of {totalCount > 0 ? totalCount : "many"} GIF{totalCount !== 1 ? "s" : ""}
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
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gifs.map((gif) => (
                <Card
                  key={gif.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <Link href={`/gif/${gif.id}`} className="block">
                      <div className="relative aspect-square bg-muted overflow-hidden">
                        {/* GIF Preview - Using higher quality preview */}
                        <img
                          src={gif.previewUrl}
                          alt={gif.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          title={gif.title}
                        />
                        {/* Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCopyGif(gif);
                            }}
                            className={cn(
                              "cursor-pointer",
                              copiedGifId === gif.id && "bg-green-600 hover:bg-green-700"
                            )}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            {copiedGifId === gif.id ? "Copied!" : "Copy URL"}
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDownloadGif(gif);
                            }}
                            disabled={downloadingGifId === gif.id}
                            className={cn(
                              "cursor-pointer",
                              downloadingGifId === gif.id && "opacity-50"
                            )}
                          >
                            {downloadingGifId === gif.id ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </>
                            )}
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
                    </Link>
                    <div className="p-3">
                      <Link href={`/gif/${gif.id}`}>
                        <h3 className="font-semibold text-sm mb-1 line-clamp-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{gif.title}</h3>
                      </Link>
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
            
            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} className="h-20 flex items-center justify-center">
              {loadingMore && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
                  <span>Loading more GIFs...</span>
                </div>
              )}
              {!hasMore && gifs.length > 0 && (
                <p className="text-sm text-muted-foreground">No more GIFs to load</p>
              )}
            </div>
          </>
        ) : !loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No GIFs found. Try a different search term.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

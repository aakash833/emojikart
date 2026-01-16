"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, TrendingUp, Flame, Loader2 } from "lucide-react";
import { hapticCopy } from "@/lib/haptics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getTrendingGiphyGIFs, convertGiphyToGIF, type GiphyGIF } from "@/lib/giphy-api";
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

export function TrendingGifsClient() {
  const [copiedGifId, setCopiedGifId] = useState<string | null>(null);
  const [downloadingGifId, setDownloadingGifId] = useState<string | null>(null);
  const [gifs, setGifs] = useState<GIF[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingGIFs = async () => {
      try {
        const giphyGIFs = await getTrendingGiphyGIFs(25);
        const convertedGIFs = giphyGIFs.map(convertGiphyToGIF);
        setGifs(convertedGIFs);
      } catch (error) {
        console.error("Error loading trending GIFs:", error);
        setGifs([]);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingGIFs();
  }, []);

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
        <div className="mb-8 prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            Trending GIFs 2025 - Most Popular & Viral GIFs
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Discover the <strong>most trending GIFs</strong> and <strong>popular GIFs</strong> of 2025. 
            Find <strong>viral GIFs</strong>, <strong>hot GIFs</strong>, <strong>reaction GIFs</strong>, and the 
            <strong> hottest GIFs</strong> everyone is using right now. Our trending GIF collection is updated daily 
            with the latest <strong>trending GIFs</strong> and <strong>viral GIFs</strong> from across the internet. 
            <strong> Download trending GIFs in high quality</strong> or copy trending GIF URLs instantly and stay ahead 
            of the curve with the most popular GIFs of 2025.
          </p>
          <div className="bg-card border rounded-lg p-6 mt-6">
            <h2 className="text-2xl font-semibold mb-3">What Makes a GIF Trending?</h2>
            <p className="text-muted-foreground mb-4">
              Trending GIFs are the most popular and viral GIFs that are currently being shared and used the most 
              across social media platforms, messaging apps, and websites. These GIFs reflect current events, 
              popular culture, memes, and viral moments that everyone is talking about.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Updated Daily:</strong> Our trending GIF list is refreshed daily to show the latest viral content</li>
              <li><strong>Popular Reactions:</strong> Find the most used reaction GIFs that everyone is sharing</li>
              <li><strong>Viral Memes:</strong> Discover trending meme GIFs that are going viral right now</li>
              <li><strong>Current Events:</strong> GIFs related to trending topics and current events</li>
              <li><strong>Social Media Favorites:</strong> The GIFs that are most popular on Twitter, Facebook, Instagram, and more</li>
            </ul>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        )}

        {/* Trending GIFs Grid */}
        {!loading && gifs.length > 0 && (
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
                    {/* Trending Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Trending
                      </span>
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
        )}

        {!loading && gifs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No trending GIFs found.</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 p-6 bg-muted/50 rounded-xl border border-border">
          <h2 className="text-2xl font-bold mb-4">About Trending GIFs</h2>
          <p className="text-muted-foreground mb-4">
            Trending GIFs are the most popular and viral GIFs being used right now. These GIFs are updated regularly
            based on current usage, social media trends, and popular culture. Use these trending GIFs to stay current
            and express yourself with the latest reactions.
          </p>
          <p className="text-muted-foreground">
            Click on any GIF to copy its URL and use it in your messages, social media posts, or anywhere else you need
            a perfect reaction GIF.
          </p>
        </div>
      </div>
    </div>
  );
}

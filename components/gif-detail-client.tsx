"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Download, Loader2, Share2, ExternalLink } from "lucide-react";
import { hapticCopy } from "@/lib/haptics";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getGiphyGIFById, convertGiphyToGIF } from "@/lib/giphy-api";

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

export function GifDetailClient() {
  const pathname = usePathname();
  const [gif, setGif] = useState<GIF | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Extract GIF ID from pathname
  useEffect(() => {
    const loadGIF = async () => {
      if (!pathname?.startsWith("/gif/")) return;
      
      const gifId = pathname.replace("/gif/", "");
      if (!gifId) return;

      try {
        setLoading(true);
        const giphyGIF = await getGiphyGIFById(gifId);
        if (giphyGIF) {
          const convertedGIF = convertGiphyToGIF(giphyGIF);
          setGif(convertedGIF);
        }
      } catch (error) {
        console.error("Error loading GIF:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGIF();
  }, [pathname]);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (!gif) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-muted-foreground text-lg">GIF not found.</p>
        <Link href="/gifs" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 mt-4 inline-block">
          ← Back to GIF Search
        </Link>
      </div>
    );
  }

  const cleanTitle = (gif.title || "GIF").replace(/GIF|gif/g, "").trim() || "GIF";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(gif.url);
      hapticCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleDownload = async () => {
    try {
      setDownloading(true);
      hapticCopy();

      const response = await fetch(gif.downloadUrl);
      if (!response.ok) throw new Error("Failed to download GIF");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      const safeTitle = cleanTitle
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()
        .substring(0, 50);
      link.download = `${safeTitle || "gif"}_${gif.id}.gif`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setTimeout(() => setDownloading(false), 1000);
    } catch (error) {
      console.error("Failed to download:", error);
      setDownloading(false);
      alert("Failed to download GIF. Please try again.");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cleanTitle} GIF`,
          text: `Check out this ${cleanTitle} GIF!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/gifs" className="hover:text-foreground">
            GIF Search
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{cleanTitle}</span>
        </nav>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main GIF Display */}
          <div className="md:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative bg-muted aspect-square md:aspect-video">
                  <img
                    src={gif.previewUrl}
                    alt={cleanTitle}
                    className="w-full h-full object-contain"
                  />
                  {(gif.trending || gif.popular) && (
                    <div className="absolute top-4 left-4 flex gap-2">
                      {gif.trending && (
                        <Badge className="bg-orange-500">Trending</Badge>
                      )}
                      {gif.popular && (
                        <Badge className="bg-indigo-500">Popular</Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleCopy}
                className={cn(
                  "cursor-pointer flex-1 md:flex-initial",
                  copied && "bg-green-600 hover:bg-green-700"
                )}
              >
                <Copy className="w-4 h-4 mr-2" />
                {copied ? "Copied!" : "Copy URL"}
              </Button>
              <Button
                onClick={handleDownload}
                disabled={downloading}
                className="cursor-pointer flex-1 md:flex-initial"
              >
                {downloading ? (
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
              <Button
                onClick={handleShare}
                variant="outline"
                className="cursor-pointer flex-1 md:flex-initial"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer flex-1 md:flex-initial"
              >
                <a
                  href={gif.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Original
                </a>
              </Button>
            </div>

            {/* SEO Content */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {cleanTitle} GIF</h2>
                <p className="text-muted-foreground mb-4">
                  Download and use this <strong>{cleanTitle} GIF</strong> for free. This high-quality animated GIF 
                  is perfect for social media posts, messaging apps, websites, presentations, and more. 
                  The <strong>{cleanTitle} GIF</strong> is available in original quality for download.
                </p>
                <div className="space-y-2">
                  <h3 className="font-semibold">How to use this GIF:</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Click the <strong>Download</strong> button to save the GIF to your device</li>
                    <li>Click <strong>Copy URL</strong> to get the GIF link for sharing</li>
                    <li>Use the <strong>Share</strong> button to share directly on social media</li>
                    <li>The GIF works on Twitter, Facebook, Instagram, WhatsApp, Discord, and more</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">GIF Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-muted-foreground">Title:</span>
                    <p className="font-medium">{cleanTitle}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ID:</span>
                    <p className="font-mono text-xs">{gif.id}</p>
                  </div>
                  {gif.category && (
                    <div>
                      <span className="text-muted-foreground">Category:</span>
                      <p className="font-medium">{gif.category}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/gifs"
                    className="block text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    ← Search More GIFs
                  </Link>
                  <Link
                    href="/gifs/trending"
                    className="block text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    ← Trending GIFs
                  </Link>
                  <Link
                    href="/gifs/categories"
                    className="block text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    ← Browse Categories
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

// This is the client component for the emoji keyboard
// The server component wrapper is in app/page.tsx
import React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { emojiData } from "@/lib/emoji-data";
import { searchEmojis, type EmojiWithCategory } from "@/lib/search-utils";
import { hapticClick, hapticCopy, hapticCategoryChange } from "@/lib/haptics";
import { EmojiCopyPopup } from "@/components/emoji-copy-popup";
import {
  Search,
  Smile,
  Users,
  Leaf,
  Utensils,
  Dumbbell,
  Plane,
  Lightbulb,
  Hash,
  Flag,
  Sun,
  Moon,
  Sparkles,
  Menu,
  X,
  Wand2,
  BookOpen,
  TrendingUp,
  Image,
} from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { StructuredData } from "@/components/structured-data";
import { HomePage } from "@/components/home-page";
import { EmojiTooltip } from "@/components/emoji-tooltip";
import { AdBanner } from "@/components/ad-banner";
import dynamic from "next/dynamic";
const AdUnit = dynamic(() => import("../components/ad-unit"), {
  ssr: false,
});
// Import feature components for consistent layout
const GifsClient = dynamic(() => import("../components/gifs-client").then(m => ({ default: m.GifsClient })), { ssr: false });
const TrendingGifsClient = dynamic(() => import("../components/trending-gifs-client").then(m => ({ default: m.TrendingGifsClient })), { ssr: false });
const GifCategoriesClient = dynamic(() => import("../components/gif-categories-client").then(m => ({ default: m.GifCategoriesClient })), { ssr: false });
const GifDetailClient = dynamic(() => import("../components/gif-detail-client").then(m => ({ default: m.GifDetailClient })), { ssr: false });
const EmojiGeneratorClient = dynamic(() => import("../components/emoji-generator-client").then(m => ({ default: m.EmojiGeneratorClient })), { ssr: false });
const EmojiMeaningsClient = dynamic(() => import("../components/emoji-meanings-client").then(m => ({ default: m.EmojiMeaningsClient })), { ssr: false });
const EmojiTrendsClient = dynamic(() => import("../components/emoji-trends-client").then(m => ({ default: m.EmojiTrendsClient })), { ssr: false });
const BlogPageClient = dynamic(() => import("../components/blog-page-client").then(m => ({ default: m.BlogPageClient })), { ssr: false });
const BlogPostClient = dynamic(() => import("../components/blog-post-client").then(m => ({ default: m.BlogPostClient })), { ssr: false });
const AboutPageClient = dynamic(() => import("../components/about-page-client").then(m => ({ default: m.AboutPageClient })), { ssr: false });
const ContactPageClient = dynamic(() => import("../components/contact-page-client").then(m => ({ default: m.ContactPageClient })), { ssr: false });
const PrivacyPolicyClient = dynamic(() => import("../components/privacy-policy-client").then(m => ({ default: m.PrivacyPolicyClient })), { ssr: false });
const TermsAndConditionsClient = dynamic(() => import("../components/terms-and-conditions-client").then(m => ({ default: m.TermsAndConditionsClient })), { ssr: false });

type EmojiSize = "S" | "M" | "L" | "XL" | "XXL";

const categoryIcons = {
  "Smileys & Emotion": Smile,
  "People & Body": Users,
  "Animals & Nature": Leaf,
  "Food & Drink": Utensils,
  Activities: Dumbbell,
  "Travel & Places": Plane,
  Objects: Lightbulb,
  Symbols: Hash,
  Flags: Flag,
};

const sizeMap: Record<EmojiSize, string> = {
  S: "text-xl",
  M: "text-2xl",
  L: "text-3xl",
  XL: "text-5xl",
  XXL: "text-8xl",
};

// Category to route slug mapping
const categoryToSlug: Record<string, string> = {
  "Smileys & Emotion": "smileys-emotion",
  "People & Body": "people-body",
  "Animals & Nature": "animals-nature",
  "Food & Drink": "food-drink",
  Activities: "activities",
  "Travel & Places": "travel-places",
  Objects: "objects",
  Symbols: "symbols",
  Flags: "flags",
};

// Route slug to category mapping
const slugToCategory: Record<string, string> = {
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

export function EmojiKeyboardClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Extract blog slug from pathname if it's a blog post
  const blogSlug = pathname?.startsWith("/blog/") && pathname !== "/blog" 
    ? pathname.replace("/blog/", "") 
    : null;

  // Initialize category from URL if present
  const getInitialCategory = () => {
    if (pathname && pathname !== "/") {
      const slug = pathname.replace("/", "");
      return slugToCategory[slug] || null;
    }
    return null; // No category on home page
  };

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    getInitialCategory()
  );
  // Initialize with default values to prevent hydration mismatch
  // Will be updated from localStorage after hydration
  const [emojiSize, setEmojiSize] = useState<EmojiSize>("M");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  
  // Load from localStorage after hydration (client-side only)
  useEffect(() => {
    // Check if localStorage is available (may not be in AdSense preview or restricted environments)
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }

    try {
      const savedSize = localStorage.getItem("emojiSize");
      if (savedSize && ["S", "M", "L", "XL", "XXL"].includes(savedSize)) {
        setEmojiSize(savedSize as EmojiSize);
      }
    } catch (e) {
      // Silently fail if localStorage is not available
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to load emojiSize from localStorage:", e);
      }
    }
    
    try {
      const savedTheme = localStorage.getItem("theme");
      setIsDarkMode(savedTheme === "dark");
    } catch (e) {
      // Silently fail if localStorage is not available
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to load theme from localStorage:", e);
      }
    }
  }, []);
  const [copiedEmoji, setCopiedEmoji] = useState<{
    emoji: string;
    name: string;
    position: { x: number; y: number };
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const emojiGridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Sync category with URL changes
  useEffect(() => {
    if (pathname) {
      const slug = pathname.replace("/", "").trim();
      if (slug && slugToCategory[slug]) {
        const category = slugToCategory[slug];
        setSelectedCategory(category);
      } else if (!slug) {
        // If on home page, don't set a category (home page will show)
        // Category will be set when user clicks a category
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Sync emojiSize and theme across tabs/windows
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === "emojiSize" && e.newValue) {
        const v = e.newValue;
        if (["S", "M", "L", "XL", "XXL"].includes(v))
          setEmojiSize(v as EmojiSize);
      }
      if (e.key === "theme") {
        setIsDarkMode(e.newValue === "dark");
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Persist theme to localStorage whenever it changes and apply class
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    try {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", "dark");
        }
      } else {
        document.documentElement.classList.remove("dark");
        if (typeof localStorage !== "undefined") {
          localStorage.setItem("theme", "light");
        }
      }
    } catch (err) {
      // ignore write errors - may fail in restricted environments
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to persist theme:", err);
      }
    }
  }, [isDarkMode]);

  // Persist emoji size when changed
  useEffect(() => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }

    try {
      localStorage.setItem("emojiSize", emojiSize);
    } catch (err) {
      // ignore - may fail in restricted environments
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to persist emojiSize:", err);
      }
    }
  }, [emojiSize]);

  const categories = Object.keys(emojiData);

  // Use fuzzy search when there's a query, otherwise show category emojis
  const filteredEmojis = useMemo(() => {
    if (searchQuery.trim()) {
      return searchEmojis(searchQuery);
    }
    if (selectedCategory) {
      return (emojiData[selectedCategory] || []).map((emoji) => ({
        ...emoji,
        category: selectedCategory,
      }));
    }
    return []; // Empty on home page (home page component will show content)
  }, [searchQuery, selectedCategory]);

  const handleEmojiClick = async (
    emoji: string,
    name: string,
    event: React.MouseEvent
  ) => {
    try {
      // Check if clipboard API is available
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emoji);
      } else {
        // Fallback for environments without clipboard API
        console.warn("Clipboard API not available");
        return;
      }
      hapticCopy();

      // Save to recent emojis in localStorage
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
          const stored = localStorage.getItem("recentEmojis");
          const recent: EmojiWithCategory[] = stored ? JSON.parse(stored) : [];
          const newEmoji: EmojiWithCategory = {
            emoji,
            name,
            category: selectedCategory || "Unknown",
          };

          // Remove if already exists and add to front
          const filtered = recent.filter(
            (e) => e.emoji !== emoji || e.name !== name
          );
          const updated = [newEmoji, ...filtered].slice(0, 20); // Keep last 20
          localStorage.setItem("recentEmojis", JSON.stringify(updated));
        } catch (err) {
          // Silently fail if localStorage is not available
          if (process.env.NODE_ENV === "development") {
            console.warn("Failed to save recent emojis:", err);
          }
        }
      }

      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setCopiedEmoji({
        emoji,
        name,
        position: {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      });

      setTimeout(() => {
        setCopiedEmoji(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy emoji:", error);
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery("");
    hapticCategoryChange();

    // Update route for SEO using startTransition for smooth navigation
    // Use replace instead of push to avoid adding to history stack
    const slug = categoryToSlug[category];
    if (slug) {
      startTransition(() => {
        // Use router.replace to prevent full page reload
        router.replace(`/${slug}`, { scroll: false });
      });
    }

    // Scroll to top when changing category
    if (emojiGridRef.current) {
      emojiGridRef.current.scrollTop = 0;
    }
  };

  const handleSizeChange = (size: EmojiSize) => {
    setEmojiSize(size);
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      try {
        localStorage.setItem("emojiSize", size);
      } catch (err) {
        // Silently fail if localStorage is not available
        if (process.env.NODE_ENV === "development") {
          console.warn("Failed to save emojiSize:", err);
        }
      }
    }
    hapticClick();
  };

  // Lock body scroll on mobile when sidebar (drawer) is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Only lock scroll on mobile devices
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    if (sidebarOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      body.style.position = "fixed";
      body.style.top = `-${scrollY}px`;
      body.style.width = "100%";
      body.style.overflow = "hidden";
      root.style.overflow = "hidden";
      
      // Store scroll position for restoration
      (body as any).__scrollPosition = scrollY;
    } else {
      // Restore scroll position
      const scrollY = (body as any).__scrollPosition || 0;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      root.style.overflow = "";
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    }
    
    return () => {
      // Cleanup: always restore scroll on unmount
      const scrollY = (body as any).__scrollPosition || 0;
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      root.style.overflow = "";
      if (scrollY) {
        window.scrollTo(0, scrollY);
      }
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData type="Website" />

      {/* Google AdSense is disabled while we don't serve ads. */}

      <div className="flex min-h-screen bg-background">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar / Mobile Drawer */}
        <aside
          className={cn(
            "fixed left-0 top-0 h-screen border-r border-border bg-gradient-to-b from-card to-card/95 flex flex-col shadow-lg z-40 transition-transform duration-300 ease-in-out overflow-hidden",
            // Desktop: fixed width sidebar; Mobile: full-width drawer
            "w-full md:w-72",
            // When closed on mobile, hide it by translating left
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          {/* Sidebar Header - Fixed */}
          <div className="p-4 border-b border-border bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 flex-shrink-0 flex items-center justify-between">
            <Link href="/" className="w-full flex items-center gap-3">
              <div className="w-full text-2xl font-bold text-foreground flex items-center justify-between">
                <div> emojiKart</div>
                <div className="text-3xl">🔥</div>
              </div>
            </Link>
            {/* Mobile-only close button inside the drawer */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Sidebar Ad (Desktop Only) - Temporarily Removed */}
          {/* <div className="hidden md:block px-4 pt-4 flex-shrink-0">
            <AdBanner position="sidebar" />
          </div> */}

          {/* Categories Section - Scrollable */}
          <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain pb-2">
            <div className="p-5 pb-4 space-y-6">
              {/* Tools & Features Section */}
              <div>
                <h2 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                  Tools & Features
                </h2>
                <nav className="space-y-2">
                  {/* <Link
                    href="/emoji-generator"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startTransition(() => {
                        router.replace("/emoji-generator", { scroll: false });
                      });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent",
                      pathname === "/emoji-generator" && "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Emoji Generator</span>
                  </Link> */}
                  {/* <Link
                    href="/emoji-meanings"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startTransition(() => {
                        router.replace("/emoji-meanings", { scroll: false });
                      });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent",
                      pathname === "/emoji-meanings" && "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Emoji Meanings</span>
                  </Link> */}
                  {/* <Link
                    href="/emoji-trends"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startTransition(() => {
                        router.replace("/emoji-trends", { scroll: false });
                      });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent",
                      pathname === "/emoji-trends" && "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Emoji Trends</span>
                  </Link> */}
                  <Link
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startTransition(() => {
                        router.replace("/blog", { scroll: false });
                      });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent",
                      pathname === "/blog" && "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Blog</span>
                  </Link>
                  <Link
                    href="/gifs"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startTransition(() => {
                        router.replace("/gifs", { scroll: false });
                      });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent",
                      pathname === "/gifs" && "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                  >
                    <Image className="w-4 h-4" />
                    <span>GIF Search</span>
                  </Link>
                  <Link
                    href="/gifs/trending"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      startTransition(() => {
                        router.replace("/gifs/trending", { scroll: false });
                      });
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent",
                      pathname === "/gifs/trending" && "bg-indigo-100 dark:bg-indigo-900/30"
                    )}
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending GIFs</span>
                  </Link>
                </nav>
              </div>

              {/* Categories Section */}
              <div>
                <h2 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                  Categories
                </h2>
                <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon =
                    categoryIcons[category as keyof typeof categoryIcons];
                  // Map category names to slugs
                  const categorySlugMap: Record<string, string> = {
                    "Smileys & Emotion": "smileys-emotion",
                    "People & Body": "people-body",
                    "Animals & Nature": "animals-nature",
                    "Food & Drink": "food-drink",
                    Activities: "activities",
                    "Travel & Places": "travel-places",
                    Objects: "objects",
                    Symbols: "symbols",
                    Flags: "flags",
                  };
                  const categorySlug =
                    categorySlugMap[category] ||
                    category.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <button
                      key={category}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCategoryClick(category);
                        setSidebarOpen(false); // Close sidebar on mobile after selection
                      }}
                      className={cn(
                        "cursor-pointer w-full flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all duration-300 relative group",
                        "hover:shadow-lg hover:scale-[1.02] hover:translate-x-1",
                        "active:scale-[0.98]",
                        selectedCategory === category &&
                          !searchQuery &&
                          pathname !== "/"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/50 scale-[1.02] translate-x-1"
                          : "text-foreground bg-muted/50 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 hover:border-indigo-200 dark:hover:border-indigo-800 border border-transparent"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 shrink-0 transition-transform duration-300",
                          selectedCategory === category &&
                            !searchQuery &&
                            pathname !== "/"
                            ? "scale-110"
                            : "group-hover:scale-110 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                        )}
                      />
                      <span className="text-left flex-1">{category}</span>
                      <Link
                        href={`/${categorySlug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCategoryClick(category);
                        }}
                        className={cn(
                          "text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 px-2 py-1 rounded-md",
                          "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
                          selectedCategory === category &&
                            !searchQuery &&
                            pathname !== "/" &&
                            "opacity-100"
                        )}
                        title={`View ${category} page for better SEO`}
                        aria-label={`Open ${category} page`}
                      >
                        ↗
                      </Link>
                    </button>
                  );
                })}
              </nav>
              </div>
            </div>
          </div>

          {/* Emoji Size Section - Fixed at Bottom */}
          <div className="p-5 border-t border-border bg-gradient-to-t from-muted/30 to-transparent flex-shrink-0 sticky bottom-0 z-10">
            <h2 className="text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Emoji Size
            </h2>
            <div className="flex gap-2">
              {(["S", "M", "L", "XL", "XXL"] as EmojiSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer",
                    "hover:scale-105 hover:shadow-md active:scale-95",
                    emojiSize === size
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105"
                      : "bg-muted text-muted-foreground hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content - With Left Margin for Fixed Sidebar */}
        <main className="flex-1 flex flex-col md:ml-72 w-full h-screen md:h-auto md:min-h-screen overflow-hidden md:overflow-visible">
          {/* Header - Fixed */}
          <header
            ref={headerRef}
            className="border-b-2 border-yellow-200 dark:border-yellow-800 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 fixed top-0 right-0 left-0 md:left-72 z-20 px-3 md:px-8 py-3 md:py-6 flex items-center justify-between shadow-md h-[64px] md:h-[88px]"
          >
            <div className="flex items-center gap-3 w-full">
              {/* Mobile toggle placed inside header so it aligns with search on small screens */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden bg-card border-2 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 shadow-sm"
                onClick={() => {
                  setSidebarOpen(!sidebarOpen);
                  hapticClick();
                }}
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
              <div className="flex-1 w-full">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-yellow-500 transition-colors z-10" />
                  <Input
                    type="text"
                    placeholder="Search emojis by name (e.g., happy, love, food)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 py-3 md:py-6 text-sm md:text-base bg-background border-2 border-yellow-200 dark:border-yellow-800 rounded-xl focus:border-yellow-400 dark:focus:border-yellow-600 focus:ring-2 focus:ring-yellow-400/30 dark:focus:ring-yellow-600/30 transition-all duration-200 shadow-sm hover:shadow-md w-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        hapticClick();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-full transition-all duration-200 hover:scale-110"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                  {searchQuery && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Sparkles className="w-5 h-5 text-yellow-500" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                hapticClick();
              }}
              className="cursor-pointer ml-6 w-12 h-12 rounded-xl hover:bg-yellow-100 dark:hover:bg-yellow-900/30 active:scale-95 transition-all duration-200 border-2 border-yellow-200 dark:border-yellow-800 hover:border-yellow-400 dark:hover:border-yellow-600"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-yellow-500" />
              )}
            </Button>
          </header>

          {/* Emoji Grid - Scrollable Content Only */}
          <div
            ref={emojiGridRef}
            className="flex-1 overflow-y-auto overflow-x-hidden mt-[64px] md:mt-[88px] mb-4 md:mb-0 relative overscroll-contain w-full"
            style={{ 
              WebkitOverflowScrolling: 'touch',
              minHeight: 0
            }}
          >
            {/* Loading overlay for smooth transitions */}
            {isPending && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin border-primary" />
                  <span className="text-xs text-muted-foreground">Loading...</span>
                </div>
              </div>
            )}
            <div className="p-6">
              {/* Route-based content rendering */}
              {pathname === "/" && !searchQuery ? (
                <HomePage
                  onEmojiClick={handleEmojiClick}
                  copiedEmoji={copiedEmoji}
                />
              ) : pathname === "/blog" ? (
                <BlogPageClient />
              ) : blogSlug ? (
                <BlogPostClient slug={blogSlug} />
              ) : pathname?.startsWith("/gif/") ? (
                <GifDetailClient />
              ) : pathname === "/gifs" ? (
                <GifsClient />
              ) : pathname === "/gifs/trending" ? (
                <TrendingGifsClient />
              ) : pathname === "/gifs/categories" ? (
                <GifCategoriesClient />
              ) : pathname === "/emoji-generator" ? (
                <EmojiGeneratorClient />
              ) : pathname === "/emoji-meanings" ? (
                <EmojiMeaningsClient />
              ) : pathname === "/emoji-trends" ? (
                <EmojiTrendsClient />
              ) : pathname === "/about" ? (
                <AboutPageClient />
              ) : pathname === "/contact" ? (
                <ContactPageClient />
              ) : pathname === "/privacy-policy" ? (
                <PrivacyPolicyClient />
              ) : pathname === "/terms-and-conditions" ? (
                <TermsAndConditionsClient />
              ) : (
                <>
                  {/* Sticky Category Header */}
                  {!searchQuery && (
                    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 -mt-6 pt-6 pb-4 mb-4 border-b border-border">
                      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <span>{selectedCategory || "Home"}</span>
                        {selectedCategory && (
                          <span className="text-sm font-normal text-muted-foreground">
                            ({emojiData[selectedCategory]?.length || 0} emojis)
                          </span>
                        )}
                      </h2>
                    </div>
                  )}

                  {searchQuery && (
                    <div className="mb-4 pb-4 border-b border-border">
                      <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <span>Search Results</span>
                        <span className="text-sm font-normal text-muted-foreground">
                          ({filteredEmojis.length} found)
                        </span>
                      </h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Showing closest matches for &ldquo;{searchQuery}&rdquo;
                      </p>
                    </div>
                  )}

                  <div
                    className={cn(
                      "grid gap-1.5",
                      emojiSize === "S" &&
                        "grid-cols-12 sm:grid-cols-14 md:grid-cols-16",
                      emojiSize === "M" &&
                        "grid-cols-10 sm:grid-cols-12 md:grid-cols-14",
                      emojiSize === "L" &&
                        "grid-cols-8 sm:grid-cols-10 md:grid-cols-12",
                      emojiSize === "XL" &&
                        "grid-cols-6 sm:grid-cols-8 md:grid-cols-10",
                      emojiSize === "XXL" &&
                        "grid-cols-4 sm:grid-cols-6 md:grid-cols-8"
                    )}
                  >
                    {filteredEmojis.map((emoji, index) => (
                      <EmojiTooltip
                        key={`${emoji.emoji}-${emoji.name}-${index}`}
                        emoji={emoji.emoji}
                        name={emoji.name}
                        category={emoji.category}
                      >
                        <button
                          onClick={(e) =>
                            handleEmojiClick(emoji.emoji, emoji.name, e)
                          }
                          className={cn(
                            "aspect-square flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer p-1",
                            "hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30",
                            "hover:scale-105 hover:shadow-md active:scale-95",
                            "border border-transparent hover:border-indigo-300 dark:hover:border-indigo-700",
                            sizeMap[emojiSize]
                          )}
                          aria-label={`${emoji.name} emoji from ${emoji.category}`}
                        >
                          {emoji.emoji}
                        </button>
                      </EmojiTooltip>
                    ))}
                  </div>

                  {filteredEmojis.length === 0 && searchQuery && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg mb-2">
                        No emojis found for &ldquo;{searchQuery}&rdquo;
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Try searching with different keywords or browse
                        categories
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>

        {/* Copy Popup */}
        {copiedEmoji && (
          <EmojiCopyPopup
            emoji={copiedEmoji.emoji}
            name={copiedEmoji.name}
            position={copiedEmoji.position}
          />
        )}

        {/* Ads disabled - intentionally not rendering bottom sticky ad */}
        {/* <AdUnit /> */}
      </div>
    </>
  );
}

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
  Zap,
} from "lucide-react";
import Script from "next/script";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { StructuredData } from "@/components/structured-data";
import { HomePage } from "@/components/home-page";
import { EmojiTooltip } from "@/components/emoji-tooltip";
import { AdBanner } from "@/components/ad-banner";
import Footer from "@/components/footer";
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
// SSR enabled so crawlers (including AdSense / Google) receive full HTML for trust & editorial pages.
const BlogPageClient = dynamic(() =>
  import("../components/blog-page-client").then((m) => ({ default: m.BlogPageClient })),
);
const BlogPostClient = dynamic(() =>
  import("../components/blog-post-client").then((m) => ({ default: m.BlogPostClient })),
);
const AboutPageClient = dynamic(() =>
  import("../components/about-page-client").then((m) => ({ default: m.AboutPageClient })),
);
const ContactPageClient = dynamic(() =>
  import("../components/contact-page-client").then((m) => ({ default: m.ContactPageClient })),
);
const PrivacyPolicyClient = dynamic(() =>
  import("../components/privacy-policy-client").then((m) => ({ default: m.PrivacyPolicyClient })),
);
const TermsAndConditionsClient = dynamic(() =>
  import("../components/terms-and-conditions-client").then((m) => ({
    default: m.TermsAndConditionsClient,
  })),
);
const RefundPolicyClient = dynamic(() =>
  import("../components/refund-policy-client").then((m) => ({ default: m.RefundPolicyClient })),
);

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
  
  // Initialize emojiSize from localStorage immediately to prevent reset on navigation
  const getInitialEmojiSize = (): EmojiSize => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return "M";
    }
    try {
      const savedSize = localStorage.getItem("emojiSize");
      if (savedSize && ["S", "M", "L", "XL", "XXL"].includes(savedSize)) {
        return savedSize as EmojiSize;
      }
    } catch (e) {
      // Silently fail if localStorage is not available
    }
    return "M";
  };
  
  // Initialize theme from localStorage immediately
  const getInitialTheme = (): boolean => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return false;
    }
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark";
    } catch (e) {
      // Silently fail if localStorage is not available
    }
    return false;
  };
  
  const [emojiSize, setEmojiSize] = useState<EmojiSize>(getInitialEmojiSize);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);
  
  // Sync with localStorage changes from other tabs/windows
  useEffect(() => {
    // Check if localStorage is available (may not be in AdSense preview or restricted environments)
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }

    // Double-check on mount to ensure we have the latest value
    try {
      const savedSize = localStorage.getItem("emojiSize");
      if (savedSize && ["S", "M", "L", "XL", "XXL"].includes(savedSize)) {
        setEmojiSize(savedSize as EmojiSize);
      }
    } catch (e) {
      // Silently fail if localStorage is not available
    }
    
    try {
      const savedTheme = localStorage.getItem("theme");
      setIsDarkMode(savedTheme === "dark");
    } catch (e) {
      // Silently fail if localStorage is not available
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
    if (typeof window === "undefined") return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q?.trim()) {
      setSearchQuery(q.trim());
    }
  }, []);

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

      <div className="flex min-h-screen bg-background h-screen md:h-auto overflow-hidden">
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar / Mobile Drawer - Modern Design */}
        <aside
          className={cn(
            "fixed left-0 top-0 h-screen border-r border-border/50 bg-card/95 backdrop-blur-xl flex flex-col shadow-soft-lg z-40 transition-all duration-300 ease-in-out overflow-hidden",
            // Desktop: fixed width sidebar; Mobile: full-width drawer
            "w-full md:w-80",
            // When closed on mobile, hide it by translating left
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          {/* Sidebar Header - Modern Design */}
          <div className="p-6 border-b border-border/50 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 flex-shrink-0 flex items-center justify-between backdrop-blur-sm">
            <Link href="/" className="w-full flex items-center gap-3 group">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">😊</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground tracking-tight">emojiKart</div>
                    <div className="text-xs text-muted-foreground">Free Emoji Keyboard</div>
                  </div>
                </div>
                <div className="text-3xl animate-pulse">🔥</div>
              </div>
            </Link>
            {/* Mobile-only close button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-lg hover:bg-accent/50"
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

          {/* Categories Section - Scrollable with Modern Design */}
          <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain pb-2">
            <div className="p-6 pb-4 space-y-8">
              {/* Tools & Features Section */}
              <div>
                <h2 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
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
                      "cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                      "hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30",
                      "hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-md hover:scale-[1.02]",
                      "border border-transparent active:scale-[0.98]",
                      pathname === "/blog" && "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 shadow-md border-indigo-200 dark:border-indigo-800"
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

              {/* Categories Section - Modern Design */}
              <div>
                <h2 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Hash className="w-3.5 h-3.5" />
                  Categories
                </h2>
                <nav className="space-y-2.5">
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
                  const isActive = selectedCategory === category && !searchQuery && pathname !== "/";
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
                        isActive
                          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl shadow-indigo-500/40 scale-[1.02] translate-x-1 border-0"
                          : "text-foreground bg-muted/30 hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-purple-50/80 dark:hover:from-indigo-950/40 dark:hover:to-purple-950/40 hover:border-indigo-200/50 dark:hover:border-indigo-800/50 border border-border/50 backdrop-blur-sm"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                        isActive 
                          ? "bg-white/20 shadow-lg" 
                          : "bg-muted/50 group-hover:bg-indigo-100/50 dark:group-hover:bg-indigo-900/30"
                      )}>
                        <Icon
                          className={cn(
                            "w-5 h-5 shrink-0 transition-transform duration-300",
                            isActive
                              ? "scale-110 text-white"
                              : "group-hover:scale-110 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 text-muted-foreground"
                          )}
                        />
                      </div>
                      <span className="text-left flex-1 font-semibold">{category}</span>
                      <Link
                        href={`/${categorySlug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCategoryClick(category);
                        }}
                        className={cn(
                          "text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 px-2.5 py-1.5 rounded-lg",
                          "hover:bg-white/20 dark:hover:bg-white/10",
                          isActive && "opacity-100"
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

          {/* Emoji Size Section - Modern Fixed Bottom */}
          <div className="p-6 border-t border-border/50 bg-gradient-to-t from-card/95 via-card/80 to-transparent backdrop-blur-sm flex-shrink-0 sticky bottom-0 z-10">
            <h2 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Emoji Size
            </h2>
            <div className="flex gap-2.5">
              {(["S", "M", "L", "XL", "XXL"] as EmojiSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={cn(
                    "flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer",
                    "hover:scale-105 hover:shadow-md active:scale-95",
                    emojiSize === size
                      ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/40 scale-105 border-0"
                      : "bg-muted/50 text-muted-foreground hover:bg-gradient-to-r hover:from-indigo-50/80 hover:to-purple-50/80 dark:hover:from-indigo-950/40 dark:hover:to-purple-950/40 border border-border/50 hover:border-indigo-200/50 dark:hover:border-indigo-800/50 backdrop-blur-sm"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content - With Left Margin for Fixed Sidebar */}
        <main className="flex-1 flex flex-col md:ml-80 w-full h-screen md:h-auto md:min-h-screen overflow-hidden">
          {/* Header - Modern Fixed Design */}
          <header
            ref={headerRef}
            className="border-b border-border/50 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 fixed top-0 right-0 left-0 md:left-80 z-20 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between shadow-soft h-[70px] md:h-[80px]"
          >
            <div className="flex items-center gap-4 w-full">
              {/* Mobile toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl hover:bg-accent/50 active:scale-95 transition-all"
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
              <div className="flex-1 w-full max-w-2xl">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                  <Input
                    type="text"
                    placeholder="Search emojis by name (e.g., happy, love, food)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-12 py-3 md:py-4 text-sm md:text-base bg-background/50 backdrop-blur-sm border-2 border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-soft hover:shadow-md w-full"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        hapticClick();
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 hover:scale-110"
                      aria-label="Clear search"
                    >
                      ×
                    </button>
                  )}
                  {searchQuery && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
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
              className="cursor-pointer ml-4 w-11 h-11 rounded-xl hover:bg-accent/50 active:scale-95 transition-all duration-200 border border-border hover:border-primary/50"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
            </Button>
          </header>

          {/* Emoji Grid - Scrollable Content Only */}
          <div
            ref={emojiGridRef}
            className="flex-1 overflow-y-auto overflow-x-hidden mt-[70px] md:mt-[80px] relative overscroll-contain w-full"
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
              ) : pathname === "/refund-policy" ? (
                <RefundPolicyClient />
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
            
            {/* Footer inside scrollable area */}
            <Footer />
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

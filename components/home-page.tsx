"use client"

import { useState, useEffect, useMemo } from "react"
import { emojiData } from "@/lib/emoji-data"
import { hapticCopy } from "@/lib/haptics"
import { EmojiCopyPopup } from "@/components/emoji-copy-popup"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import {
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  Heart,
  Star,
  ArrowRight,
  RefreshCw,
  Wand2,
  BookOpen,
  FileText,
  Image,
} from "lucide-react"
import Link from "next/link"
import { getFeaturedPosts } from "@/lib/blog-data"
import type { EmojiWithCategory } from "@/lib/search-utils"
import { EmojiTooltip } from "@/components/emoji-tooltip"

interface HomePageProps {
  onEmojiClick: (emoji: string, name: string, event: React.MouseEvent) => void
  copiedEmoji: {
    emoji: string
    name: string
    position: { x: number; y: number }
  } | null
}

// Popular emojis (most commonly used)
const popularEmojis = [
  { emoji: "😂", name: "laughing", category: "Smileys & Emotion" },
  { emoji: "❤️", name: "red_heart", category: "Symbols" },
  { emoji: "😍", name: "heart_eyes", category: "Smileys & Emotion" },
  { emoji: "🔥", name: "fire", category: "Symbols" },
  { emoji: "👍", name: "thumbs_up", category: "People & Body" },
  { emoji: "😊", name: "smile", category: "Smileys & Emotion" },
  { emoji: "🎉", name: "party", category: "Activities" },
  { emoji: "💯", name: "100", category: "Symbols" },
  { emoji: "✨", name: "sparkles", category: "Symbols" },
  { emoji: "😎", name: "sunglasses", category: "Smileys & Emotion" },
  { emoji: "🙏", name: "pray", category: "People & Body" },
  { emoji: "🥰", name: "smiling_face_with_hearts", category: "Smileys & Emotion" },
]

export function HomePage({ onEmojiClick, copiedEmoji }: HomePageProps) {
  const [recentEmojis, setRecentEmojis] = useState<EmojiWithCategory[]>([])
  const [emojiOfTheDay, setEmojiOfTheDay] = useState<EmojiWithCategory | null>(null)
  const [randomEmojis, setRandomEmojis] = useState<EmojiWithCategory[]>([])
  const featuredBlogs = getFeaturedPosts().slice(0, 3)

  // Load recent emojis from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentEmojis")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setRecentEmojis(parsed.slice(0, 12)) // Show last 12
      } catch (error) {
        console.error("Failed to parse recent emojis:", error)
      }
    }
  }, [copiedEmoji]) // Reload when emoji is copied

  // Set emoji of the day (changes daily)
  useEffect(() => {
    const today = new Date().toDateString()
    const stored = localStorage.getItem("emojiOfTheDay")
    const storedDate = stored ? JSON.parse(stored).date : null

    if (storedDate !== today) {
      // Get random emoji from all categories
      const allEmojis = Object.entries(emojiData).flatMap(([category, emojis]) =>
        emojis.map((e) => ({ ...e, category }))
      )
      const random = allEmojis[Math.floor(Math.random() * allEmojis.length)]
      setEmojiOfTheDay(random)
      localStorage.setItem("emojiOfTheDay", JSON.stringify({ emoji: random, date: today }))
    } else if (stored) {
      const storedEmoji = JSON.parse(stored).emoji
      setEmojiOfTheDay(storedEmoji)
    }
  }, [])

  // Generate random emojis
  const generateRandomEmojis = () => {
    const allEmojis = Object.entries(emojiData).flatMap(([category, emojis]) =>
      emojis.map((e) => ({ ...e, category }))
    )
    const random = []
    const used = new Set()
    while (random.length < 8 && random.length < allEmojis.length) {
      const index = Math.floor(Math.random() * allEmojis.length)
      if (!used.has(index)) {
        used.add(index)
        random.push(allEmojis[index])
      }
    }
    setRandomEmojis(random)
  }

  useEffect(() => {
    generateRandomEmojis()
  }, [])

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
  }

  const totalEmojis = useMemo(() => {
    return Object.values(emojiData).reduce((sum, emojis) => sum + emojis.length, 0)
  }, [])

  return (
    <div className="space-y-8 pb-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-lg">
        <div className="text-7xl mb-6 animate-bounce">😎</div>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
          Free Online Emoji Keyboard
        </h1>
        <p className="text-xl md:text-2xl text-foreground mb-2 max-w-4xl mx-auto font-medium">
          Express Yourself with {totalEmojis.toLocaleString()}+ Emojis
        </p>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
          The most comprehensive free online emoji keyboard with thousands of emojis to copy and paste instantly. 
          Browse smileys, animals, flags, and the latest Unicode emojis. Perfect for Twitter, Facebook, Slack, 
          Instagram, Snapchat, GitHub, WhatsApp, and more.
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg px-6 py-3 inline-block mb-6 border border-indigo-200 dark:border-indigo-800">
          <p className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="text-2xl">✂️</span>
            <span>Copy and</span>
            <span className="text-2xl">📋</span>
            <span>Paste Emoji</span>
            <span className="text-2xl">👍</span>
            <span className="text-indigo-600 dark:text-indigo-400">No apps required</span>
          </p>
        </div>
        <p className="text-base text-muted-foreground mb-6 max-w-2xl mx-auto">
          Whether you&apos;re composing tweets, sending messages, writing emails, or creating social media posts, 
          use this Emoji Keyboard to add personality and emotion to your communications. Works on all devices—desktop, 
          tablet, and mobile—with no downloads or installations needed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground bg-card/50 rounded-lg px-6 py-4 border border-border max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Instant Copy</div>
              <div className="text-xs text-muted-foreground">One-click copy</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Smart Search</div>
              <div className="text-xs text-muted-foreground">Find emojis fast</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <Heart className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="text-left">
              <div className="font-semibold">Free Forever</div>
              <div className="text-xs text-muted-foreground">No hidden costs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Emoji of the Day */}
      {emojiOfTheDay && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Emoji of the Day</h2>
                <p className="text-sm text-muted-foreground">Special emoji selected just for you!</p>
              </div>
            </div>
            <EmojiTooltip
              emoji={emojiOfTheDay.emoji}
              name={emojiOfTheDay.name}
              category={emojiOfTheDay.category}
            >
              <button
                onClick={(e) => onEmojiClick(emojiOfTheDay.emoji, emojiOfTheDay.name, e)}
                className="text-6xl hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                {emojiOfTheDay.emoji}
              </button>
            </EmojiTooltip>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <div className="text-2xl font-bold text-foreground">{totalEmojis.toLocaleString()}+</div>
          <div className="text-sm text-muted-foreground">Total Emojis</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <div className="text-2xl font-bold text-foreground">{Object.keys(emojiData).length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <div className="text-2xl font-bold text-foreground">{recentEmojis.length}</div>
          <div className="text-sm text-muted-foreground">Recent Copies</div>
        </div>
      </div>

      {/* Recent Copied Emojis */}
      {recentEmojis.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              <h2 className="text-2xl font-bold text-foreground">Recently Copied</h2>
            </div>
          </div>
        <div className="grid grid-cols-8 gap-3">
          {recentEmojis.map((emoji, index) => (
            <EmojiTooltip
              key={`${emoji.emoji}-${index}`}
              emoji={emoji.emoji}
              name={emoji.name}
              category={emoji.category}
            >
              <button
                onClick={(e) => onEmojiClick(emoji.emoji, emoji.name, e)}
                className="aspect-square flex items-center justify-center rounded-xl text-3xl bg-muted hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                {emoji.emoji}
              </button>
            </EmojiTooltip>
          ))}
        </div>
        </section>
      )}

      {/* Popular Emojis */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-yellow-500" />
            <h2 className="text-2xl font-bold text-foreground">Popular Emojis</h2>
          </div>
        </div>
        <div className="grid grid-cols-8 gap-3">
          {popularEmojis.map((emoji, index) => (
            <EmojiTooltip
              key={`${emoji.emoji}-${index}`}
              emoji={emoji.emoji}
              name={emoji.name}
              category={emoji.category}
            >
              <button
                onClick={(e) => onEmojiClick(emoji.emoji, emoji.name, e)}
                className="aspect-square flex items-center justify-center rounded-xl text-3xl bg-muted hover:bg-gradient-to-br hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-yellow-300 dark:hover:border-yellow-700"
              >
                {emoji.emoji}
              </button>
            </EmojiTooltip>
          ))}
        </div>
      </section>

      {/* Random Emojis */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-2xl font-bold text-foreground">Discover Random Emojis</h2>
          </div>
          <button
            onClick={generateRandomEmojis}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm font-medium cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Shuffle</span>
          </button>
        </div>
        <div className="grid grid-cols-8 gap-3">
          {randomEmojis.map((emoji, index) => (
            <EmojiTooltip
              key={`${emoji.emoji}-${index}`}
              emoji={emoji.emoji}
              name={emoji.name}
              category={emoji.category}
            >
              <button
                onClick={(e) => onEmojiClick(emoji.emoji, emoji.name, e)}
                className="aspect-square flex items-center justify-center rounded-xl text-3xl bg-muted hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 hover:scale-110 hover:shadow-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-purple-300 dark:hover:border-purple-700"
              >
                {emoji.emoji}
              </button>
            </EmojiTooltip>
          ))}
        </div>
      </section>

      {/* Featured Blog Posts */}
      {featuredBlogs.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-500" />
              Latest Blog Posts
            </h2>
            <Link
              href="/blog"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {featuredBlogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-xs font-medium">
                        {blog.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {blog.readTime} min read
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {blog.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium group-hover:gap-3 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Tools & Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/emoji-generator"
            className="group p-6 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
          >
            <Wand2 className="w-8 h-8 text-indigo-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Emoji Generator
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Create custom emoji combinations and generate unique emoji art
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Try it now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/emoji-meanings"
            className="group p-6 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
          >
            <BookOpen className="w-8 h-8 text-purple-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Emoji Meanings
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Learn what emojis mean and how to use them correctly
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Explore meanings <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/emoji-trends"
            className="group p-6 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
          >
            <TrendingUp className="w-8 h-8 text-yellow-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Emoji Trends
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Discover the most popular emojis and trending combinations
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              View trends <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/gifs"
            className="group p-6 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
          >
            <Image className="w-8 h-8 text-pink-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              GIF Search
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Search and browse thousands of GIFs for any occasion
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Browse GIFs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/gifs/trending"
            className="group p-6 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
          >
            <TrendingUp className="w-8 h-8 text-orange-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Trending GIFs
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Discover the hottest and most viral GIFs trending right now
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              View trending <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/gifs/categories"
            className="group p-6 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
          >
            <Image className="w-8 h-8 text-teal-500 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              GIF Categories
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Browse GIFs organized by category - reactions, emotions, and more
            </p>
            <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
              Browse categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Comprehensive Guide Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
        <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Complete Guide to Using Our Free Online Emoji Keyboard</h2>
        
        <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">What is an Online Emoji Keyboard?</h3>
            <p className="text-foreground mb-4">
              An <strong>online emoji keyboard</strong> is a web-based tool that provides instant access to thousands of emojis 
              without requiring any software installation or app downloads. Unlike traditional emoji keyboards built into 
              operating systems, our free online emoji keyboard works seamlessly across all devices and platforms—whether 
              you're using Windows, macOS, Linux, iOS, or Android. Simply visit our website, browse through our extensive 
              emoji collection, and copy any emoji with a single click.
            </p>
            <p className="text-foreground mb-4">
              Our emoji keyboard is designed to be the most comprehensive and user-friendly emoji tool available on the web. 
              With over <strong>{totalEmojis.toLocaleString()}+ emojis</strong> organized into <strong>{Object.keys(emojiData).length} categories</strong>, 
              you'll find the perfect emoji for any situation, emotion, or message you want to convey.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">How to Use Our Emoji Keyboard</h3>
            <p className="text-foreground mb-4">
              Using our free online emoji keyboard is incredibly simple and intuitive. Here's a step-by-step guide to help 
              you get started:
            </p>
            <ol className="list-decimal list-inside space-y-3 text-foreground mb-4">
              <li>
                <strong>Browse Categories:</strong> Use the sidebar navigation to explore our {Object.keys(emojiData).length} main emoji categories. 
                Each category contains hundreds of related emojis, making it easy to find what you're looking for. Categories 
                include Smileys & Emotion, People & Body, Animals & Nature, Food & Drink, Activities, Travel & Places, Objects, 
                Symbols, and Flags.
              </li>
              <li>
                <strong>Search for Specific Emojis:</strong> Use the search bar at the top of the page to find emojis by name, 
                emotion, or keyword. Our intelligent search feature understands natural language queries, so you can search for 
                terms like "happy", "celebration", "love", or "food" and instantly see relevant emojis.
              </li>
              <li>
                <strong>Click to Copy:</strong> Once you find the emoji you want, simply click on it. The emoji will be 
                automatically copied to your clipboard, and you'll see a confirmation popup. No need to right-click or use 
                keyboard shortcuts—just one click and you're done.
              </li>
              <li>
                <strong>Paste Anywhere:</strong> After copying, paste the emoji wherever you need it using Ctrl+V (Windows/Linux) 
                or Cmd+V (Mac). Our emoji keyboard works with all major platforms including Twitter, Facebook, Instagram, WhatsApp, 
                Slack, Snapchat, GitHub, email clients, messaging apps, and more.
              </li>
              <li>
                <strong>Customize Your Experience:</strong> Adjust emoji sizes using the size selector (S, M, L, XL, XXL) in 
                the sidebar. Toggle between light and dark modes for comfortable viewing. All your preferences are saved 
                automatically in your browser.
              </li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Why Choose Our Emoji Keyboard?</h3>
            <p className="text-foreground mb-4">
              Our free online emoji keyboard stands out from other emoji tools for several key reasons:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
              <li>
                <strong>Comprehensive Collection:</strong> With over {totalEmojis.toLocaleString()}+ emojis, we offer one of the 
                largest emoji libraries available online, including the latest Unicode emojis released in 2025.
              </li>
              <li>
                <strong>No Registration Required:</strong> Start using our emoji keyboard immediately without creating an account 
                or providing any personal information. Complete privacy and instant access.
              </li>
              <li>
                <strong>Universal Compatibility:</strong> Works on all devices (desktop, tablet, mobile) and all major browsers 
                (Chrome, Firefox, Safari, Edge). No platform-specific limitations.
              </li>
              <li>
                <strong>Fast and Responsive:</strong> Our emoji keyboard loads instantly and responds quickly to your interactions. 
                No lag, no delays—just smooth, fast emoji browsing.
              </li>
              <li>
                <strong>Smart Search:</strong> Our intelligent search algorithm helps you find emojis quickly, even if you don't 
                know the exact name. Search by emotion, concept, or keyword.
              </li>
              <li>
                <strong>Regular Updates:</strong> We continuously update our emoji library with new emojis as they're released by 
                the Unicode Consortium, ensuring you always have access to the latest emojis.
              </li>
              <li>
                <strong>Educational Content:</strong> Beyond just providing emojis, we offer comprehensive guides, blog posts, and 
                educational content about emoji meanings, trends, and best practices.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Using Emojis on Different Platforms</h3>
            <p className="text-foreground mb-4">
              Our emoji keyboard works seamlessly with all major social media platforms and communication apps. Here's how to use 
              emojis on popular platforms:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">Twitter / X</h4>
                <p className="text-sm text-muted-foreground">
                  Copy emojis from our keyboard and paste them directly into tweets, replies, and direct messages. Emojis work 
                  perfectly in Twitter's character limit, allowing you to express more with fewer characters.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">Facebook</h4>
                <p className="text-sm text-muted-foreground">
                  Use emojis in Facebook posts, comments, messages, and group chats. Our emoji keyboard ensures all emojis display 
                  correctly across different devices and browsers.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">Instagram</h4>
                <p className="text-sm text-muted-foreground">
                  Add emojis to Instagram captions, stories, comments, and direct messages. Emojis help make your Instagram content 
                  more engaging and expressive.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">WhatsApp</h4>
                <p className="text-sm text-muted-foreground">
                  Copy emojis and paste them into WhatsApp messages, group chats, and status updates. All emojis are compatible 
                  with WhatsApp's emoji system.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">Slack</h4>
                <p className="text-sm text-muted-foreground">
                  Use emojis in Slack workspace conversations, channels, and direct messages. Emojis help add personality and 
                  context to workplace communications.
                </p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <h4 className="font-semibold mb-2 text-foreground">Email & Documents</h4>
                <p className="text-sm text-muted-foreground">
                  Add emojis to emails, Google Docs, Microsoft Word, and other documents. Emojis can make professional 
                  communications more friendly and approachable when used appropriately.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Emoji Categories Explained</h3>
            <p className="text-foreground mb-4">
              Our emoji keyboard organizes emojis into {Object.keys(emojiData).length} main categories, each serving a specific purpose:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
              <li>
                <strong>Smileys & Emotion:</strong> Express feelings and emotions with smiley faces, expressions, and emotional 
                reactions. Perfect for conveying happiness, sadness, excitement, or any emotion.
              </li>
              <li>
                <strong>People & Body:</strong> Represent people, gestures, body parts, and human activities. Great for describing 
                actions, people, or physical characteristics.
              </li>
              <li>
                <strong>Animals & Nature:</strong> Include animals, plants, weather, and natural elements in your messages. 
                Perfect for nature lovers and pet owners.
              </li>
              <li>
                <strong>Food & Drink:</strong> Share your favorite foods, drinks, and culinary experiences. Ideal for food-related 
                conversations and restaurant reviews.
              </li>
              <li>
                <strong>Activities:</strong> Represent sports, hobbies, games, and recreational activities. Great for sharing 
                interests and activities.
              </li>
              <li>
                <strong>Travel & Places:</strong> Describe locations, landmarks, transportation, and travel experiences. Perfect 
                for travel stories and location sharing.
              </li>
              <li>
                <strong>Objects:</strong> Include everyday objects, technology, and items in your messages. Useful for describing 
                things and objects.
              </li>
              <li>
                <strong>Symbols:</strong> Use symbols, signs, and special characters for emphasis, decoration, or meaning. 
                Includes hearts, stars, arrows, and more.
              </li>
              <li>
                <strong>Flags:</strong> Represent countries, regions, and territories with flag emojis. Great for expressing 
                nationality or location.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-semibold text-foreground mb-3">Best Practices for Using Emojis</h3>
            <p className="text-foreground mb-4">
              While emojis can enhance your digital communications, it's important to use them appropriately:
            </p>
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>Use emojis to add emotion and context to text-based messages</li>
              <li>Don't overuse emojis—moderation is key to effective communication</li>
              <li>Consider your audience—professional contexts may require fewer emojis</li>
              <li>Use emojis that match the tone and content of your message</li>
              <li>Be aware that emoji meanings can vary across cultures and contexts</li>
              <li>Test emojis on different platforms to ensure they display correctly</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Category Links - Enhanced for SEO */}
      <section>
        <h2 className="text-3xl font-bold text-foreground mb-2">Browse All Emoji Categories</h2>
        <p className="text-muted-foreground mb-6">
          Explore our complete collection of emoji categories. Each category contains hundreds of emojis ready to copy and paste. 
          Click on any category to view all emojis in that group.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(emojiData).map(([category, emojis]) => {
            const slug = categorySlugMap[category]
            const categoryDescriptions: Record<string, string> = {
              "Smileys & Emotion": "Express emotions with smiley faces, expressions, and reactions",
              "People & Body": "Represent people, gestures, body parts, and human activities",
              "Animals & Nature": "Bring nature into your messages with animals, plants, and weather",
              "Food & Drink": "Share your favorite foods, drinks, and culinary experiences",
              Activities: "Represent sports, hobbies, games, and recreational activities",
              "Travel & Places": "Describe locations, landmarks, transportation, and travel experiences",
              Objects: "Include everyday items, technology, and objects in your messages",
              Symbols: "Use symbols, signs, and special characters for emphasis and decoration",
              Flags: "Represent countries, regions, and territories with flag emojis",
            };
            return (
              <Link
                key={category}
                href={`/${slug}`}
                className="group p-5 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2">
                      {category} Emojis
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {categoryDescriptions[category] || `Browse ${emojis.length} ${category.toLowerCase()} emojis`}
                    </p>
                    <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {emojis.length}+ emojis available
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-1 transition-all mt-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* SEO Content - Internal Linking Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-xl p-8 border border-purple-200 dark:border-purple-800">
        <h2 className="text-2xl font-bold text-foreground mb-4">Popular Emoji Categories & Tools</h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-foreground mb-4">
            Our <strong>free online emoji keyboard</strong> offers the most comprehensive collection of emojis available. 
            Whether you're looking for <Link href="/smileys-emotion" className="text-primary hover:underline font-semibold">smiley emojis</Link>, 
            <Link href="/animals-nature" className="text-primary hover:underline font-semibold"> animal emojis</Link>, 
            <Link href="/food-drink" className="text-primary hover:underline font-semibold"> food emojis</Link>, or 
            <Link href="/symbols" className="text-primary hover:underline font-semibold"> symbol emojis</Link>, 
            we have everything you need. Explore our <Link href="/emoji-meanings" className="text-primary hover:underline font-semibold">emoji meanings guide</Link> to 
            learn what each emoji represents, check out <Link href="/emoji-trends" className="text-primary hover:underline font-semibold">emoji trends</Link> to see what's popular, 
            or use our <Link href="/emoji-generator" className="text-primary hover:underline font-semibold">emoji generator</Link> to create custom combinations.
          </p>
          <p className="text-foreground mb-4">
            In addition to emojis, we also offer a comprehensive <Link href="/gifs" className="text-primary hover:underline font-semibold">GIF search</Link> feature 
            where you can find and download trending GIFs. Browse <Link href="/gifs/trending" className="text-primary hover:underline font-semibold">trending GIFs</Link> or 
            explore <Link href="/gifs/categories" className="text-primary hover:underline font-semibold">GIF categories</Link> to find the perfect animated image for any occasion.
          </p>
          <p className="text-foreground">
            All our tools are completely free, require no registration, and work on all devices. Start using our 
            <strong> emoji keyboard online</strong> today and enhance your digital communications with thousands of emojis at your fingertips.
          </p>
        </div>
      </section>
    </div>
  )
}


"use client"

import { useState, useEffect, useMemo } from "react"
import { emojiData } from "@/lib/emoji-data"
import { hapticCopy } from "@/lib/haptics"
import { EmojiCopyPopup } from "@/components/emoji-copy-popup"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
  Clock,
  Sparkles,
  Zap,
  Heart,
  Star,
  ArrowRight,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
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
      <div className="text-center py-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-800">
        <div className="text-6xl mb-4">😎</div>
        <h1 className="text-4xl font-bold text-foreground mb-2">A Free Online Emoji Keyboard for All Your Communications</h1>
        <p className="text-lg text-muted-foreground mb-4 max-w-3xl mx-auto">
          Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. 
          Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. 
          <span className="block mt-2 text-base font-semibold">✂️ Copy and 📋 Paste Emoji 👍 No apps required</span>
        </p>
        <p className="text-base text-muted-foreground mb-4 max-w-2xl mx-auto">
          Be it tweets, messaging, email, or instant messaging, use this Emoji Keyboard to add more swag to your communications.
        </p>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Instant Copy</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Smart Search</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            <span>Free Forever</span>
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
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm font-medium"
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

      {/* SEO Content Section */}
      <section className="bg-muted/50 rounded-xl p-6 border border-border">
        <h2 className="text-2xl font-bold text-foreground mb-4">Free Online Emoji Keyboard - Copy and Paste Emojis Instantly</h2>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground mb-3">
            A <strong>Free Online Emoji Keyboard</strong> for all your communications. Be it tweets, messaging, email, or instant messaging, 
            use this <strong>Emoji Keyboard</strong> to add more swag to your messages.
          </p>
          <p className="text-muted-foreground mb-3">
            Our <strong>free online emoji keyboard</strong> features <strong>thousand emojis</strong> to copy and paste instantly. 
            Browse through smileys, animals, flags, and the latest Unicode emojis. Whether you need emojis for 
            <strong> Twitter</strong>, <strong>Facebook</strong>, <strong>Slack</strong>, <strong>Instagram</strong>, 
            <strong> Snapchat</strong>, <strong>GitHub</strong>, <strong>WhatsApp</strong> or any other platform, 
            we've got you covered.
          </p>
          <p className="text-muted-foreground mb-3">
            <strong>✂️ Copy and 📋 Paste Emoji 👍 No apps required</strong> - Simply click any emoji to copy it to your clipboard 
            and paste it wherever you need. Our emoji picker is completely free, works on all devices, and requires no downloads or installations.
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Copy emojis for <strong>Twitter</strong> posts and replies</li>
            <li>Paste emojis in <strong>Facebook</strong> comments and messages</li>
            <li>Use emojis in <strong>Slack</strong> workspace conversations</li>
            <li>Add emojis to <strong>Instagram</strong> captions and stories</li>
            <li>Send emojis via <strong>WhatsApp</strong> messages</li>
            <li>Include emojis in <strong>Snapchat</strong> snaps</li>
            <li>Use emojis in <strong>GitHub</strong> issues and pull requests</li>
            <li>Add emojis to emails and instant messaging apps</li>
          </ul>
        </div>
      </section>

      {/* Quick Category Links */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-4">Browse Categories</h2>
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(emojiData).slice(0, 6).map(([category, emojis]) => {
            const slug = categorySlugMap[category]
            return (
              <Link
                key={category}
                href={`/${slug}`}
                className="group p-4 rounded-xl bg-card border border-border hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/30 dark:hover:to-purple-950/30 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {category}
                    </h3>
                    <p className="text-sm text-muted-foreground">{emojis.length} emojis</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}


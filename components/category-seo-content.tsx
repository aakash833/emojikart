import Link from "next/link"
import { emojiData } from "@/lib/emoji-data"

interface CategorySEOContentProps {
  category: string
  slug: string
}

const categoryKeywords: Record<string, string[]> = {
  "Smileys & Emotion": [
    "smiley emojis",
    "emotion emojis",
    "facial expression emojis",
    "happy emojis",
    "sad emojis",
    "love emojis",
    "funny emojis",
    "cute emojis",
    "face emojis",
  ],
  "People & Body": [
    "people emojis",
    "body emojis",
    "gesture emojis",
    "hand emojis",
    "person emojis",
    "human emojis",
    "activity emojis",
    "profession emojis",
  ],
  "Animals & Nature": [
    "animal emojis",
    "nature emojis",
    "pet emojis",
    "wildlife emojis",
    "plant emojis",
    "flower emojis",
    "tree emojis",
    "bird emojis",
    "cat emojis",
    "dog emojis",
  ],
  "Food & Drink": [
    "food emojis",
    "drink emojis",
    "meal emojis",
    "fruit emojis",
    "vegetable emojis",
    "pizza emojis",
    "coffee emojis",
    "dessert emojis",
    "beverage emojis",
  ],
  Activities: [
    "sports emojis",
    "activity emojis",
    "fitness emojis",
    "game emojis",
    "hobby emojis",
    "exercise emojis",
    "outdoor emojis",
    "recreation emojis",
  ],
  "Travel & Places": [
    "travel emojis",
    "place emojis",
    "location emojis",
    "landmark emojis",
    "vehicle emojis",
    "transport emojis",
    "vacation emojis",
    "destination emojis",
  ],
  Objects: [
    "object emojis",
    "item emojis",
    "tool emojis",
    "technology emojis",
    "device emojis",
    "household emojis",
    "office emojis",
    "gadget emojis",
  ],
  Symbols: [
    "symbol emojis",
    "sign emojis",
    "character emojis",
    "icon emojis",
    "mark emojis",
    "special emojis",
    "punctuation emojis",
  ],
  Flags: [
    "flag emojis",
    "country emojis",
    "nation emojis",
    "national emojis",
    "world emojis",
    "country flags",
  ],
}

const relatedCategories: Record<string, string[]> = {
  "Smileys & Emotion": ["People & Body", "Symbols"],
  "People & Body": ["Smileys & Emotion", "Activities"],
  "Animals & Nature": ["Food & Drink", "Travel & Places"],
  "Food & Drink": ["Animals & Nature", "Objects"],
  Activities: ["People & Body", "Travel & Places"],
  "Travel & Places": ["Activities", "Objects"],
  Objects: ["Symbols", "Food & Drink"],
  Symbols: ["Objects", "Smileys & Emotion"],
  Flags: ["Travel & Places", "Symbols"],
}

export function CategorySEOContent({ category, slug }: CategorySEOContentProps) {
  const emojiCount = emojiData[category]?.length || 0
  const keywords = categoryKeywords[category] || []
  const related = relatedCategories[category] || []

  return (
    <div className="space-y-6 mb-8">
      {/* SEO Content Section */}
      <section className="prose prose-sm dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {category} Emojis - Complete Collection
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Browse our complete collection of <strong>{emojiCount}+ {category.toLowerCase()} emojis</strong>.
          All emojis are free to use and can be copied to your clipboard with a single click. Whether
          you&apos;re looking for {keywords.slice(0, 3).join(", ")}, or any other {category.toLowerCase()} emoji,
          you&apos;ll find it here.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our emoji keyboard makes it easy to find and copy the perfect emoji for any situation. Simply
          click on any emoji to copy it to your clipboard, then paste it wherever you need it - in messages,
          social media posts, documents, or anywhere else you want to express yourself with emojis.
        </p>
      </section>

      {/* Popular Keywords */}
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-3">Popular {category} Emoji Searches</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>
      </section>

      {/* Related Categories */}
      {related.length > 0 && (
        <section>
          <h3 className="text-xl font-semibold text-foreground mb-3">Related Emoji Categories</h3>
          <div className="flex flex-wrap gap-2">
            {related.map((relatedCategory) => {
              const relatedSlug = relatedCategory.toLowerCase().replace(/\s+/g, "-")
              return (
                <Link
                  key={relatedCategory}
                  href={`/category/${relatedSlug}`}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg text-sm font-medium text-foreground hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 transition-all duration-200"
                >
                  {relatedCategory}
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}


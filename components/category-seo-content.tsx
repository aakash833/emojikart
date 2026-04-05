import Link from "next/link"
import { emojiData } from "@/lib/emoji-data"
import { categoryDeepParagraphs, categoryFaqs } from "@/lib/category-deep-content"

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
  const deepParagraphs = categoryDeepParagraphs[category] || []
  const faqs = categoryFaqs[category] || []

  const categoryDescriptions: Record<string, string> = {
    "Smileys & Emotion": "Smileys and emotion emojis are the most popular category, allowing you to express a wide range of feelings and emotions. From happy faces 😊 to sad expressions 😢, from love hearts ❤️ to celebration emojis 🎉, these emojis help convey emotions that words alone cannot express. Perfect for social media posts, messages, and any communication where you want to add emotional context.",
    "People & Body": "People and body emojis represent human figures, gestures, body parts, and various human activities. These emojis are perfect for describing people, actions, professions, and physical characteristics. Use them to represent yourself, others, or to describe activities and gestures in your messages.",
    "Animals & Nature": "Animals and nature emojis bring the natural world into your digital communications. From pets like cats 🐱 and dogs 🐶 to wild animals, from beautiful flowers 🌸 to majestic trees 🌳, these emojis help you express your love for nature, describe pets, or add natural elements to your messages.",
    "Food & Drink": "Food and drink emojis are perfect for food-related conversations, restaurant reviews, meal planning, or expressing cravings. From pizza 🍕 to coffee ☕, from fruits 🍎 to desserts 🍰, these emojis make food conversations more engaging and visual.",
    Activities: "Activity emojis represent sports, hobbies, games, and recreational activities. Whether you're talking about soccer ⚽, video games 🎮, music 🎵, or any other activity, these emojis help you share your interests and hobbies with others.",
    "Travel & Places": "Travel and places emojis help you share travel experiences, describe locations, or express wanderlust. From airplanes ✈️ to beaches 🏖️, from landmarks 🗼 to vehicles 🚗, these emojis make travel stories more vivid and engaging.",
    Objects: "Object emojis represent everyday items, technology, tools, and various objects. From phones 📱 to computers 💻, from household items 🏠 to office supplies 📎, these emojis help you describe objects and items in your messages.",
    Symbols: "Symbol emojis include hearts ❤️, stars ⭐, arrows ➡️, and various special characters. These emojis are perfect for adding emphasis, decoration, or special meaning to your messages. They're among the most versatile and commonly used emojis.",
    Flags: "Flag emojis represent countries, regions, and territories around the world. Use them to express nationality, show support for countries, or indicate locations. Perfect for international communications, sports events, or cultural celebrations.",
  };

  return (
    <div className="space-y-8 mb-8">
      {/* SEO Content Section */}
      <section className="prose prose-lg dark:prose-invert max-w-none bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {category} Emojis - Complete Collection of {emojiCount}+ Emojis
        </h2>
        <p className="text-foreground leading-relaxed mb-4 text-lg">
          Browse our comprehensive collection of <strong>{emojiCount}+ {category.toLowerCase()} emojis</strong>, 
          all available for free use. Whether you&apos;re looking for {keywords.slice(0, 3).join(", ")}, or any other 
          {category.toLowerCase()} emoji, you&apos;ll find it in our extensive library. All emojis can be copied to your 
          clipboard with a single click—no registration or downloads required.
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          {categoryDescriptions[category] || `Our ${category.toLowerCase()} emoji collection features a wide variety of emojis perfect for expressing yourself in digital communications.`}
        </p>
        <p className="text-foreground leading-relaxed mb-4">
          Our emoji keyboard makes it incredibly easy to find and copy the perfect emoji for any situation. Simply 
          click on any emoji to instantly copy it to your clipboard, then paste it wherever you need it—in messages, 
          social media posts, documents, emails, or anywhere else you want to express yourself with emojis. All emojis 
          are compatible with major platforms including Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, 
          and more.
        </p>
        <div className="bg-card rounded-lg p-4 border border-border mt-4">
          <h3 className="font-semibold text-foreground mb-2">Quick Tips for Using {category} Emojis:</h3>
          <ul className="list-disc list-inside space-y-1 text-foreground text-sm">
            <li>Click any emoji to copy it instantly to your clipboard</li>
            <li>Use the search bar to find specific emojis quickly</li>
            <li>Adjust emoji size using the size selector for better visibility</li>
            <li>All emojis work across all major platforms and devices</li>
            <li>No account or registration required—completely free to use</li>
          </ul>
        </div>

        {deepParagraphs.length > 0 && (
          <div className="mt-6 space-y-4 border-t border-indigo-200/60 dark:border-indigo-800/60 pt-6">
            <h3 className="text-xl font-semibold text-foreground">
              How people use {category.toLowerCase()} emojis in 2026
            </h3>
            {deepParagraphs.map((para, i) => (
              <p key={i} className="text-foreground leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        )}
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

      {faqs.length > 0 && (
        <section className="rounded-xl border border-border bg-card/80 p-6">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Frequently asked questions — {category}
          </h3>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group rounded-lg border border-border/80 bg-background/60 px-4 py-3 open:bg-muted/30"
              >
                <summary className="cursor-pointer list-none font-medium text-foreground [&::-webkit-details-marker]:hidden flex items-center justify-between gap-2">
                  <span>{item.q}</span>
                  <span className="text-muted-foreground text-sm shrink-0 group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed pl-0 border-t border-border/60 pt-3">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            For individual characters, open any emoji to read meaning notes, copy shortcuts, and related picks in the same family.
          </p>
        </section>
      )}
    </div>
  )
}


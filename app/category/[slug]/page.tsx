import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { emojiData } from "@/lib/emoji-data";
import { EmojiCategoryPage } from "@/components/emoji-category-page";
import { StructuredData } from "@/components/structured-data";
import Script from "next/script";

const categorySlugs: Record<string, string> = {
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

const categoryDescriptions: Record<string, string> = {
  "smileys-emotion":
    "Browse hundreds of smiley faces, emotions, and facial expressions. Find the perfect emoji to express your feelings! Copy smiley emojis, emotion emojis, and facial expression emojis instantly.",
  "people-body":
    "Discover people, body parts, and gesture emojis. Perfect for representing individuals, actions, and human expressions. Copy people emojis, body emojis, and gesture emojis with one click.",
  "animals-nature":
    "Explore animals, plants, and nature emojis. From pets to wildlife, flowers to landscapes - find your favorite nature emoji! Copy animal emojis, nature emojis, and plant emojis instantly.",
  "food-drink":
    "Find delicious food and drink emojis. From pizza to coffee, fruits to desserts - satisfy your emoji cravings! Copy food emojis, drink emojis, and meal emojis with one click.",
  activities:
    "Get active with sports and activity emojis. Perfect for fitness, hobbies, and all your favorite pastimes! Copy sports emojis, activity emojis, and fitness emojis instantly.",
  "travel-places":
    "Travel the world with location and place emojis. From landmarks to vehicles, explore the globe in emoji form! Copy travel emojis, place emojis, and location emojis with one click.",
  objects:
    "Browse everyday objects and items. From technology to household items, find the perfect object emoji! Copy object emojis, item emojis, and tool emojis instantly.",
  symbols:
    "Discover symbols, signs, and special characters. Perfect for communication, math, and special meanings! Copy symbol emojis, sign emojis, and character emojis with one click.",
  flags:
    "Show your country pride with flag emojis. Find flags from around the world and represent your nation! Copy flag emojis, country emojis, and national emojis instantly.",
};

const categoryLongDescriptions: Record<string, string> = {
  "smileys-emotion":
    "Our comprehensive collection of smiley and emotion emojis includes everything from happy faces to sad expressions, love hearts to funny reactions. Whether you need a simple smile 😊, a laughing face 😂, or a heart eyes emoji 😍, you'll find it here. All emojis are Unicode-compliant and work across all platforms including iOS, Android, Windows, and Mac. Simply click any emoji to copy it to your clipboard instantly.",
  "people-body":
    "Browse our extensive library of people and body emojis featuring individuals, body parts, gestures, and professions. From waving hands 👋 to thumbs up 👍, from families 👨‍👩‍👧‍👦 to professionals 👨‍💼, find the perfect emoji to represent any person or action. All emojis are fully Unicode-compliant and compatible with all devices and platforms.",
  "animals-nature":
    "Explore our vast collection of animal and nature emojis including pets, wildlife, plants, flowers, and natural landscapes. From cute cats 🐱 to majestic lions 🦁, from blooming flowers 🌸 to towering trees 🌳, find the perfect nature emoji for any occasion. All emojis are Unicode-standard and work seamlessly across all platforms.",
  "food-drink":
    "Satisfy your emoji cravings with our delicious collection of food and drink emojis. From pizza 🍕 to sushi 🍣, from coffee ☕ to wine 🍷, from fruits 🍎 to desserts 🍰, we have all the food emojis you need. All emojis are Unicode-compliant and work on all devices and platforms.",
  activities:
    "Get active with our comprehensive sports and activity emoji collection. From football ⚽ to basketball 🏀, from running 🏃 to swimming 🏊, from gaming 🎮 to reading 📚, find the perfect activity emoji. All emojis are Unicode-standard and compatible with all platforms.",
  "travel-places":
    "Travel the world with our extensive collection of travel and place emojis. From airplanes ✈️ to cars 🚗, from landmarks 🗽 to beaches 🏖️, from hotels 🏨 to campsites ⛺, find the perfect travel emoji. All emojis are Unicode-compliant and work across all devices.",
  objects:
    "Browse our complete collection of object emojis including technology, household items, office supplies, and everyday objects. From phones 📱 to computers 💻, from books 📚 to clocks 🕐, find the perfect object emoji. All emojis are Unicode-standard and compatible with all platforms.",
  symbols:
    "Discover our comprehensive symbol emoji collection including signs, characters, icons, and special marks. From hearts ❤️ to stars ⭐, from arrows ➡️ to checkmarks ✅, find the perfect symbol emoji. All emojis are Unicode-compliant and work on all devices.",
  flags:
    "Show your national pride with our complete flag emoji collection featuring flags from countries around the world. From USA 🇺🇸 to UK 🇬🇧, from Japan 🇯🇵 to Brazil 🇧🇷, find your country's flag emoji. All emojis are Unicode-standard and work across all platforms.",
};

export async function generateStaticParams() {
  return Object.keys(categorySlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categorySlugs[params.slug];
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const emojiCount = emojiData[category]?.length || 0;
  const description =
    categoryDescriptions[params.slug] ||
    `Browse ${emojiCount} emojis in the ${category} category.`;
  const longDescription = categoryLongDescriptions[params.slug] || description;

  // Enhanced keywords for better SEO
  const baseKeywords = [
    category.toLowerCase(),
    `${category.toLowerCase()} emojis`,
    "emojis",
    "emoji keyboard",
    "copy emoji",
    "emoji picker",
    "free emojis",
    "emoji copy",
    "unicode emojis",
    category,
    ...category.split(" "),
    `${category} emoji list`,
    `best ${category.toLowerCase()} emojis`,
    `${category.toLowerCase()} emoji collection`,
  ];

  const categorySpecificKeywords: Record<string, string[]> = {
    "smileys-emotion": [
      "smiley emojis",
      "emotion emojis",
      "facial expression emojis",
      "happy emojis",
      "love emojis",
    ],
    "people-body": [
      "people emojis",
      "body emojis",
      "gesture emojis",
      "hand emojis",
      "person emojis",
    ],
    "animals-nature": [
      "animal emojis",
      "nature emojis",
      "pet emojis",
      "wildlife emojis",
      "plant emojis",
    ],
    "food-drink": [
      "food emojis",
      "drink emojis",
      "meal emojis",
      "fruit emojis",
      "pizza emojis",
    ],
    activities: [
      "sports emojis",
      "activity emojis",
      "fitness emojis",
      "game emojis",
      "hobby emojis",
    ],
    "travel-places": [
      "travel emojis",
      "place emojis",
      "location emojis",
      "landmark emojis",
      "vehicle emojis",
    ],
    objects: [
      "object emojis",
      "item emojis",
      "tool emojis",
      "technology emojis",
      "device emojis",
    ],
    symbols: [
      "symbol emojis",
      "sign emojis",
      "character emojis",
      "icon emojis",
      "mark emojis",
    ],
    flags: [
      "flag emojis",
      "country emojis",
      "nation emojis",
      "national emojis",
      "country flags",
    ],
  };

  const allKeywords = [
    ...baseKeywords,
    ...(categorySpecificKeywords[category] || []),
  ].join(", ");

  return {
    title: `${category} Emojis - Copy ${emojiCount}+ ${category} Emojis Instantly | Free Emoji Keyboard`,
    description: longDescription,
    keywords: allKeywords,
    authors: [{ name: "Emoji Keyboard" }],
    creator: "Emoji Keyboard",
    publisher: "Emoji Keyboard",
    openGraph: {
      title: `${category} Emojis - ${emojiCount}+ Free Emojis to Copy | Emoji Keyboard`,
      description: longDescription,
      type: "website",
      url: `https://emojikart.com/category/${params.slug}`,
      siteName: "Emoji Keyboard",
      locale: "en_US",
      images: [
        {
          url: `https://emojikart.com/category/${params.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${category} Emojis - ${emojiCount}+ Emojis Available`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${category} Emojis - ${emojiCount}+ Free Emojis`,
      description: description,
      images: [`https://emojikart.com/category/${params.slug}/opengraph-image`],
    },
    alternates: {
      canonical: `https://emojikart.com/category/${params.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
      "apple-mobile-web-app-title": `${category} Emojis`,
    },
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categorySlugs[params.slug];
  if (!category || !emojiData[category]) {
    notFound();
  }

  const emojiCount = emojiData[category]?.length || 0;
  const description =
    categoryDescriptions[params.slug] ||
    `Browse ${emojiCount} emojis in the ${category} category.`;

  // Enhanced structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category} Emojis`,
    description: description,
    url: `https://emojikart.com/category/${params.slug}`,
    numberOfItems: emojiCount,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: emojiCount,
      itemListElement: emojiData[category]
        ?.slice(0, 10)
        .map((emoji, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Thing",
            name: emoji.name,
            description: `${emoji.name} emoji from ${category} category`,
          },
        })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://emojikart.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: category,
          item: `https://emojikart.com/category/${params.slug}`,
        },
      ],
    },
    faq: {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How many ${category.toLowerCase()} emojis are available?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `We have ${emojiCount}+ ${category.toLowerCase()} emojis available for you to copy and use.`,
          },
        },
        {
          "@type": "Question",
          name: `How do I copy ${category.toLowerCase()} emojis?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply click on any emoji to copy it to your clipboard. The emoji will be copied instantly and you can paste it anywhere you want.",
          },
        },
        {
          "@type": "Question",
          name: `Are ${category.toLowerCase()} emojis free to use?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all emojis are completely free to use. You can copy and use them in messages, social media, documents, or anywhere else.",
          },
        },
        {
          "@type": "Question",
          name: `Do ${category.toLowerCase()} emojis work on all platforms?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all emojis are Unicode-compliant and work across all platforms including iOS, Android, Windows, Mac, and web browsers.",
          },
        },
      ],
    },
  };

  return (
    <>
      <StructuredData type="CollectionPage" data={structuredData} />
      <Script
        id="category-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <EmojiCategoryPage category={category} slug={params.slug} />
    </>
  );
}

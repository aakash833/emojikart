import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllEmojis,
  getEmojiByName,
  getEmojiNameFromSlug,
} from "@/lib/get-all-emojis";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Download } from "lucide-react";
import { EmojiCopyButton } from "@/components/emoji-copy-button";
import { PlatformEmojiCard } from "@/components/platform-emoji-card";
import { getUnicodeCode, getPlatformVariations } from "@/lib/emoji-utils";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allEmojis = getAllEmojis();
  return allEmojis.map((emoji) => ({
    slug: emoji.name.toLowerCase().replace(/_/g, "-"),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const emojiName = getEmojiNameFromSlug(slug);
  const emoji = getEmojiByName(emojiName);

  if (!emoji) {
    return {
      title: "Emoji Not Found | Emoji Keyboard",
    };
  }

  const displayName = emoji.description || emoji.name.replace(/_/g, " ");
  const title = `${emoji.emoji} ${displayName} Emoji - Copy & Paste | Emoji Keyboard`;
  const description = `Copy and paste ${displayName} emoji ${emoji.emoji}. Find ${displayName} emoji meaning, Unicode info, and usage examples. Free emoji keyboard for ${displayName} emoji.`;

  return {
    title,
    description,
    keywords: [
      `${displayName} emoji`,
      `${emoji.name} emoji`,
      `copy ${displayName} emoji`,
      `${displayName} emoji meaning`,
      `${displayName} emoji copy paste`,
      `${displayName} emoji text`,
      `${displayName} emoji unicode`,
      ...(emoji.keywords || []).map((k) => `${k} emoji`),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: `https://emojikart.com/emoji/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${displayName} emoji`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://emojikart.com/emoji/${slug}/opengraph-image`],
    },
    alternates: {
      canonical: `/emoji/${slug}`,
    },
  };
}

export default async function EmojiPage({ params }: Props) {
  const { slug } = await params;
  const emojiName = getEmojiNameFromSlug(slug);
  const emoji = getEmojiByName(emojiName);

  if (!emoji) {
    notFound();
  }

  const displayName = emoji.description || emoji.name.replace(/_/g, " ");
  const categorySlug = emoji.category
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and");
  const unicodeCode = getUnicodeCode(emoji.emoji);
  const platforms = getPlatformVariations();

  // Get related emojis from same category
  const allEmojis = getAllEmojis();
  const relatedEmojis = allEmojis
    .filter((e) => e.category === emoji.category && e.name !== emoji.name)
    .slice(0, 12);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${categorySlug}`} className="hover:text-foreground">
            {emoji.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{displayName}</span>
        </nav>

        {/* Header with Title and Copy Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji.emoji}</span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {displayName} Emoji
            </h1>
          </div>
          <EmojiCopyButton emoji={emoji.emoji} size="lg" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Large Emoji Display */}
            <Card className="overflow-hidden">
              <CardContent className="p-12 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
                <div className="flex items-center justify-center">
                  <div className="text-[200px] md:text-[300px] leading-none filter drop-shadow-2xl">
                    {emoji.emoji}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emoji Details */}
            <Card>
              <CardHeader>
                <CardTitle>Emoji Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                    Category
                  </h3>
                  <Link href={`/${categorySlug}`}>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-accent text-base px-3 py-1"
                    >
                      {emoji.category}
                    </Badge>
                  </Link>
                </div>

                {unicodeCode && (
                  <div>
                    <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                      Code
                    </h3>
                    <p className="text-foreground font-mono text-lg">
                      {unicodeCode}
                    </p>
                  </div>
                )}

                {emoji.keywords && emoji.keywords.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2 text-sm uppercase tracking-wide text-muted-foreground">
                      Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {emoji.keywords.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant="secondary"
                          className="text-sm px-2 py-1"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Platform Variations */}
            {/* <Card>
              <CardHeader>
                <CardTitle>{displayName} on Different Platforms</CardTitle>
                <CardDescription>
                  See how this emoji appears across various platforms and operating systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {platforms.map((platform) => (
                    <PlatformEmojiCard
                      key={platform.name}
                      emoji={emoji.emoji}
                      platformName={platform.name}
                      platformDisplayName={platform.displayName}
                    />
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* Meaning & Usage */}
            <Card>
              <CardHeader>
                <CardTitle>About {displayName} Emoji</CardTitle>
                <CardDescription>
                  Learn everything about the {displayName} emoji {emoji.emoji} - its meaning, usage, and how to use it effectively
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">
                    What does {displayName} emoji mean?
                  </h3>
                  <p className="text-foreground leading-relaxed mb-3">
                    The {displayName} emoji {emoji.emoji} is commonly used to express {emoji.keywords?.slice(0, 3).join(", ") || "emotions and feelings"}. 
                    It&apos;s part of the <strong>{emoji.category}</strong> category and represents one of the most versatile emojis 
                    in digital communication. This emoji can convey various meanings depending on the context in which it&apos;s used.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Emojis like {displayName} have become an essential part of modern digital communication, allowing people to express 
                    emotions, ideas, and concepts that might be difficult to convey with words alone. The {displayName} emoji is 
                    particularly useful in social media posts, text messages, emails, and any form of digital communication where 
                    you want to add emotional context or visual interest.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold mb-3 text-lg">Common Uses of {displayName} Emoji</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Expressing {emoji.keywords?.[0] || "emotions"} in social media posts</li>
                    <li>Adding visual interest to text messages and emails</li>
                    <li>Enhancing social media captions and stories</li>
                    <li>Creating engaging content for blogs and websites</li>
                    <li>Making professional communications more friendly and approachable</li>
                    <li>Conveying tone and emotion in digital conversations</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">How to Use {displayName} Emoji</h3>
                  <p className="text-foreground mb-3">
                    Using the {displayName} emoji is simple and straightforward. Follow these steps to copy and use it in your communications:
                  </p>
                  <ol className="list-decimal pl-6 space-y-3 text-foreground">
                    <li>
                      <strong>Copy the Emoji:</strong> Click the &quot;Copy Emoji&quot; button at the top of this page to instantly 
                      copy the {displayName} emoji {emoji.emoji} to your clipboard. You can also click directly on the large emoji 
                      display above.
                    </li>
                    <li>
                      <strong>Paste Anywhere:</strong> Once copied, paste the emoji in any app or platform that supports emojis. 
                      This includes Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, email clients, messaging apps, 
                      and more. Simply use Ctrl+V (Windows/Linux) or Cmd+V (Mac) to paste.
                    </li>
                    <li>
                      <strong>Use Appropriately:</strong> Use the {displayName} emoji to express {emoji.keywords?.[0] || "your feelings"} 
                      in your messages. Consider the context and your audience when using emojis, especially in professional settings.
                    </li>
                    <li>
                      <strong>Combine with Text:</strong> Emojis work best when combined with text to add emotional context. 
                      Use the {displayName} emoji to enhance your message, not replace it entirely.
                    </li>
                  </ol>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold mb-3 text-lg">Best Practices</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>Use emojis to add emotion and context to your messages</li>
                    <li>Don&apos;t overuse emojis—moderation is key to effective communication</li>
                    <li>Consider your audience—professional contexts may require fewer emojis</li>
                    <li>Test emojis on different platforms to ensure they display correctly</li>
                    <li>Be aware that emoji meanings can vary across cultures and contexts</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Platform Compatibility</h3>
                  <p className="text-foreground mb-3">
                    The {displayName} emoji {emoji.emoji} is compatible with all major platforms and operating systems, including:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Twitter", "Facebook", "Instagram", "WhatsApp", "Slack", "Snapchat", "GitHub", "Email", "SMS"].map((platform) => (
                      <div key={platform} className="bg-card border rounded-lg p-2 text-center text-sm">
                        <span className="text-foreground">{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ad Space */}
            <Card className="bg-muted/50">
              <CardContent className="p-6 min-h-[250px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">Advertisement</p>
                  <p className="text-xs mt-2">AdSense Ad Unit</p>
                </div>
              </CardContent>
            </Card>

            {/* Related Emojis */}
            {relatedEmojis.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Emojis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-2">
                    {relatedEmojis.map((related) => {
                      const relatedSlug = related.name
                        .toLowerCase()
                        .replace(/_/g, "-");
                      return (
                        <Link
                          key={related.name}
                          href={`/emoji/${relatedSlug}`}
                          className="text-2xl hover:scale-125 transition-transform p-2 rounded hover:bg-accent flex items-center justify-center"
                          title={related.description || related.name}
                        >
                          {related.emoji}
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link
                  href="/"
                  className="block text-sm text-primary hover:underline"
                >
                  ← Back to Home
                </Link>
                <Link
                  href={`/${categorySlug}`}
                  className="block text-sm text-primary hover:underline"
                >
                  Browse {emoji.category}
                </Link>
                <Link
                  href="/about"
                  className="block text-sm text-primary hover:underline"
                >
                  About Us
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

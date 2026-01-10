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
          url: `/og-emoji.png?emoji=${encodeURIComponent(emoji.emoji)}`,
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
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    What does {displayName} emoji mean?
                  </h3>
                  <p className="text-muted-foreground">
                    The {displayName} emoji {emoji.emoji} is commonly used to
                    express {emoji.keywords?.join(", ") || "emotions"}. It's
                    part of the {emoji.category} category and can be used in
                    various contexts including social media, messaging, and
                    digital communication.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">How to Use</h3>
                  <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                    <li>
                      Click the "Copy Emoji" button above to copy the emoji to
                      your clipboard
                    </li>
                    <li>
                      Paste it in any app or platform (Twitter, Facebook,
                      Instagram, WhatsApp, etc.)
                    </li>
                    <li>
                      Use it to express {emoji.keywords?.[0] || "your feelings"}{" "}
                      in your messages
                    </li>
                  </ol>
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

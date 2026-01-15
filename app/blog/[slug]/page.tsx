import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost, blogPosts } from "@/lib/blog-data";
import { StructuredData } from "@/components/structured-data";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Emoji keyboard online 😊 - Click to copy 🔥 emoji`,
    description: post.description,
    keywords: [
      ...post.tags,
      "emoji blog",
      "emoji articles",
      "emoji guides",
      "emoji keyboard",
      "emoji keyboard online",
    ],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author],
      tags: post.tags,
      url: `https://emojikart.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `https://emojikart.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: post.image || "https://emojikart.com/og-image.svg",
          datePublished: post.publishedDate,
          dateModified: post.publishedDate,
          author: {
            "@type": "Person",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Emoji keyboard online 😊",
            logo: {
              "@type": "ImageObject",
              url: "https://emojikart.com/logo.svg",
            },
          },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://emojikart.com/blog/${post.slug}`,
          },
          keywords: post.tags.join(", "),
        }}
      />
    </>
  );
}

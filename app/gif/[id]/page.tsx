import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGiphyGIFById, convertGiphyToGIF } from "@/lib/giphy-api";
import { StructuredData } from "@/components/structured-data";
import { GifDetailClient } from "@/components/gif-detail-client";
import { EmojiKeyboardClient } from "@/components/emoji-keyboard-client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const giphyGIF = await getGiphyGIFById(id);

  if (!giphyGIF) {
    return {
      title: "GIF Not Found | EmojiKart",
    };
  }

  const gif = convertGiphyToGIF(giphyGIF);
  const title = gif.title || "GIF";
  const cleanTitle = title.replace(/GIF|gif/g, "").trim() || "GIF";
  const pageTitle = `${cleanTitle} GIF - Download & Copy | Free GIF Online`;
  const description = `Download and copy ${cleanTitle} GIF for free. High quality ${cleanTitle} GIF available for download. Use ${cleanTitle} GIF on social media, messaging apps, or websites.`;

  // Generate keywords from title
  const titleWords = cleanTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const keywords = [
    `${cleanTitle} gif`,
    `${cleanTitle.toLowerCase()} gif`,
    `download ${cleanTitle.toLowerCase()} gif`,
    `${cleanTitle.toLowerCase()} gif download`,
    `free ${cleanTitle.toLowerCase()} gif`,
    `${cleanTitle.toLowerCase()} gif free`,
    `copy ${cleanTitle.toLowerCase()} gif`,
    `${cleanTitle.toLowerCase()} gif copy`,
    ...titleWords.map((word) => `${word} gif`),
    ...titleWords.map((word) => `gif ${word}`),
    "gif download",
    "free gif",
    "gif online",
    "download gif",
  ];

  return {
    title: pageTitle,
    description,
    keywords,
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
      url: `https://emojikart.com/gif/${id}`,
      images: [
        {
          url: gif.previewUrl,
          width: 1200,
          height: 1200,
          alt: cleanTitle,
        },
        {
          url: `https://emojikart.com/gif/${id}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${cleanTitle} GIF`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [gif.previewUrl, `https://emojikart.com/gif/${id}/opengraph-image`],
    },
    alternates: {
      canonical: `https://emojikart.com/gif/${id}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function GifPage({ params }: Props) {
  const { id } = await params;
  const giphyGIF = await getGiphyGIFById(id);

  if (!giphyGIF) {
    notFound();
  }

  const gif = convertGiphyToGIF(giphyGIF);
  const cleanTitle = (gif.title || "GIF").replace(/GIF|gif/g, "").trim() || "GIF";

  return (
    <>
      <EmojiKeyboardClient />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          name: cleanTitle,
          description: `Free ${cleanTitle} GIF available for download`,
          image: gif.previewUrl,
          contentUrl: gif.downloadUrl,
          encodingFormat: "image/gif",
          url: `https://emojikart.com/gif/${id}`,
          license: "https://creativecommons.org/licenses/by/4.0/",
          creator: {
            "@type": "Organization",
            name: "Giphy",
          },
        }}
      />
      <StructuredData
        type="WebPage"
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: `${cleanTitle} GIF - Download & Copy`,
          description: `Download and copy ${cleanTitle} GIF for free. High quality GIF available.`,
          url: `https://emojikart.com/gif/${id}`,
          mainEntity: {
            "@type": "ImageObject",
            name: cleanTitle,
            image: gif.previewUrl,
            contentUrl: gif.downloadUrl,
          },
        }}
      />
    </>
  );
}

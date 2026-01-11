import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationLoader from "@/components/navigation-loader";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://emojikart.com"), // Replace with your actual domain
  title: {
    default:
      "Emoji Keyboard Online 😊 - Copy Emojis Instantly | Free Emoji Picker",
    template: "%s | Emoji Keyboard Online 😊",
  },
  description:
    "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. ✂️ Copy and 📋 Paste Emoji 👍 No apps required",
  keywords: [
    "emoji keyboard",
    "emoji picker",
    "copy emoji",
    "emoji copy",
    "free emojis",
    "emoji search",
    "emoji categories",
    "unicode emojis",
    "emoji list",
    "smiley emojis",
    "emoji tool",
    "online emoji keyboard",
    "paste emoji",
    "copy paste emoji",
    "emoji for twitter",
    "emoji for facebook",
    "emoji for instagram",
    "emoji for whatsapp",
    "emoji for slack",
    "emoji for snapchat",
    "emoji for github",
    "free emoji keyboard",
    "emoji keyboard online",
    "emoji copy paste",
    "unicode emoji keyboard",
    "emoji picker online",
  ],
  authors: [{ name: "Emoji Keyboard" }],
  creator: "Emoji Keyboard",
  publisher: "Emoji Keyboard",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emojikart.com", // Replace with your actual domain
    siteName: "Emoji Keyboard Online 😊",
    title: "Emoji Keyboard Online 😊 - Copy Emojis Instantly | Free Emoji Picker",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. ✂️ Copy and 📋 Paste Emoji 👍 No apps required",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Emoji Keyboard Online 😊",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Keyboard Online 😊 - Copy Emojis Instantly | Free Emoji Picker",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more.",
    images: ["/android-chrome-512x512.png"],
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
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  alternates: {
    canonical: "https://emojikart.com", // Replace with your actual domain
  },
  generator: "Next.js",
  applicationName: "Emoji Keyboard Online 😊",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#6366f1",
      },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://emojikart.com" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://emojikart.com" />
        <link rel="preload" href="/og-image.svg" as="image" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Emoji Keyboard Online 😊" />
        <meta property="og:site_name" content="Emoji Keyboard Online 😊" />
        {/* Open Graph / Twitter card image */}
        <meta
          property="og:image"
          content="https://emojikart.com/android-chrome-512x512.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:type" content="image/png" />
        <meta
          name="twitter:image"
          content="https://emojikart.com/android-chrome-512x512.png"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4360932072488893"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class">
          {/* Organization + WebSite JSON-LD so search engines can pick up site name and logo */}
          <StructuredData
            type="Website"
            data={{
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Emoji Keyboard Online 😊",
                  url: "https://emojikart.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://emojikart.com/android-chrome-512x512.png",
                    width: 512,
                    height: 512,
                  },
                  sameAs: [
                    "https://emojikart.com"
                  ],
                },
                {
                  "@type": "WebSite",
                  name: "Emoji Keyboard Online 😊",
                  alternateName: "EmojiKart",
                  url: "https://emojikart.com",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate: "https://emojikart.com/?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }}
          />
          <NavigationLoader />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

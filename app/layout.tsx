import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationLoader from "@/components/navigation-loader";
import { StructuredData } from "@/components/structured-data";
import { ErrorBoundary } from "@/components/error-boundary";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://emojikart.com"),
  title: {
    default: "Free Online Emoji Keyboard 😊 - Copy & Paste 3000+ Emojis Instantly | EmojiKart",
    template: "%s | EmojiKart - Free Online Emoji Keyboard",
  },
  description:
    "Free online emoji keyboard with 3000+ emojis to copy and paste instantly. No download required. Works on all devices. Copy emojis for Twitter, Facebook, Instagram, WhatsApp, Slack, Snapchat, GitHub, email, and more. ✂️ Copy and 📋 Paste Emoji 👍 100% Free Forever",
  keywords: [
    "emoji keyboard",
    "emoji keyboard online",
    "online emoji keyboard",
    "free emoji keyboard",
    "emoji picker",
    "emoji picker online",
    "copy emoji",
    "emoji copy",
    "paste emoji",
    "copy paste emoji",
    "emoji copy paste",
    "free emojis",
    "emoji search",
    "emoji categories",
    "unicode emojis",
    "unicode emoji keyboard",
    "emoji list",
    "smiley emojis",
    "emoji tool",
    "emoji for twitter",
    "emoji for facebook",
    "emoji for instagram",
    "emoji for whatsapp",
    "emoji for slack",
    "emoji for snapchat",
    "emoji for github",
  ],
  authors: [{ name: "EmojiKart", url: "https://emojikart.com" }],
  creator: "EmojiKart",
  publisher: "EmojiKart",
  applicationName: "EmojiKart",
  category: "Tools",
  classification: "Utility",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://emojikart.com", // Replace with your actual domain
    siteName: "Emoji keyboard online 😊 - Click to copy 🔥 emoji",
    title: "Emoji keyboard online 😊 - Click to copy 🔥 emoji",
    description:
      "Emoji keyboard online 😊 - Click to copy 🔥 emoji - Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. ✂️ Copy and 📋 Paste Emoji 👍 No apps required",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Emoji Keyboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji keyboard online 😊 - Click to copy 🔥 emoji",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more.",
    images: ["/og-image.svg"],
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
  applicationName: "Emoji Keyboard",
  referrer: "origin-when-cross-origin",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
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
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/favicon.ico",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://emojikart.com" />
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href="https://emojikart.com" />
        <link rel="preload" href="/og-image.svg" as="image" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* Google Search Console Site Verification - Add your verification code */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        {/* Additional favicon formats for better browser support */}
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/android-chrome-512x512.png" sizes="512x512" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Emoji Keyboard" />
        <meta property="og:site_name" content="Emoji keyboard online 😊 - Click to copy 🔥 emoji" />
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="Emoji keyboard online 😊 - Click to copy 🔥 emoji" />
        <meta name="apple-mobile-web-app-title" content="Emoji keyboard online 😊 - Click to copy 🔥 emoji" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Enhanced Open Graph for better social sharing */}
        <meta property="og:image:alt" content="Emoji keyboard online 😊 - Free online emoji picker" />
        <meta property="og:locale:alternate" content="en_US" />
        {/* Twitter Card enhancements */}
        <meta name="twitter:site" content="@emojikart" />
        <meta name="twitter:creator" content="@emojikart" />
        {/* Additional favicon and logo references for Google */}
        <link rel="image_src" href="https://emojikart.com/logo.svg" />
        <meta itemProp="image" content="https://emojikart.com/logo.svg" />
        {/* Open Graph / Twitter card image */}
        <meta
          property="og:image"
          content="https://emojikart.com/og-image.svg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:image"
          content="https://emojikart.com/og-image.svg"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4360932072488893"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider attribute="class">
            {/* Organization + WebSite JSON-LD so search engines can pick up site name and logo */}
            <StructuredData
              type="Website"
              data={{
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": "https://emojikart.com/#organization",
                    name: "Emoji keyboard online 😊",
                    url: "https://emojikart.com",
                    logo: {
                      "@type": "ImageObject",
                      "@id": "https://emojikart.com/#logo",
                      url: "https://emojikart.com/logo.svg",
                      contentUrl: "https://emojikart.com/logo.svg",
                      caption: "Emoji keyboard online 😊",
                      width: 512,
                      height: 512,
                    },
                    sameAs: [
                      "https://emojikart.com",
                    ],
                  },
                  {
                    "@type": "WebSite",
                    "@id": "https://emojikart.com/#website",
                    url: "https://emojikart.com",
                    name: "Emoji keyboard online 😊",
                    description: "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis.",
                    publisher: {
                      "@id": "https://emojikart.com/#organization",
                    },
                    inLanguage: "en-US",
                    potentialAction: {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://emojikart.com/?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  },
                ],
              }}
            />
            <NavigationLoader />
            <div className="flex flex-col h-screen overflow-hidden">
              {children}
            </div>
            <Analytics />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

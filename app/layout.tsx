import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://emojikart.com"), // Replace with your actual domain
  title: {
    default:
      "Emoji Keyboard - Copy Emojis Instantly | Free Online Emoji Picker",
    template: "%s | Emoji Keyboard",
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
    siteName: "Emoji Keyboard",
    title: "Emoji Keyboard - Copy Emojis Instantly | Free Online Emoji Picker",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. ✂️ Copy and 📋 Paste Emoji 👍 No apps required",
    images: [
      {
        url: "/og-image.png", // You should create this image
        width: 1200,
        height: 630,
        alt: "Emoji Keyboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emoji Keyboard - Copy Emojis Instantly | Free Online Emoji Picker",
    description:
      "Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more.",
    images: ["/og-image.png"],
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
        <meta name="apple-mobile-web-app-title" content="Emoji Keyboard" />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class">
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

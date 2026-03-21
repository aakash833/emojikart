import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationLoader from "@/components/navigation-loader";
import { StructuredData } from "@/components/structured-data";
import { ErrorBoundary } from "@/components/error-boundary";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Free Online Emoji Keyboard — Copy & Paste 3,000+ Emojis | EmojiKart",
    template: "%s | EmojiKart",
  },
  description: SITE_DESCRIPTION,
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
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
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
    url: SITE_URL,
    siteName: `${SITE_NAME} — Free online emoji keyboard`,
    title: `${SITE_NAME} — Free online emoji keyboard`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — free online emoji keyboard and copy-paste picker`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free online emoji keyboard`,
    description: SITE_DESCRIPTION,
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
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  generator: "Next.js",
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
        <meta name="robots" content="index, follow" />
        <link rel="preconnect" href={SITE_URL} />
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
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta property="og:site_name" content={`${SITE_NAME} — Free online emoji keyboard`} />
        <meta name="application-name" content={SITE_NAME} />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        {/* Enhanced Open Graph for better social sharing */}
        <meta property="og:image:alt" content={`${SITE_NAME} — free online emoji keyboard`} />
        <meta property="og:locale:alternate" content="en_US" />
        {/* Twitter Card enhancements */}
        <meta name="twitter:site" content="@emojikart" />
        <meta name="twitter:creator" content="@emojikart" />
        {/* Additional favicon and logo references for Google */}
        <link rel="image_src" href={`${SITE_URL}/logo.svg`} />
        <meta itemProp="image" content={`${SITE_URL}/logo.svg`} />
        {/* Open Graph / Twitter card image */}
        <meta
          property="og:image"
          content={`${SITE_URL}/og-image.svg`}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/og-image.svg`}
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
                    "@id": `${SITE_URL}/#organization`,
                    name: SITE_NAME,
                    url: SITE_URL,
                    logo: {
                      "@type": "ImageObject",
                      "@id": `${SITE_URL}/#logo`,
                      url: `${SITE_URL}/logo.svg`,
                      contentUrl: `${SITE_URL}/logo.svg`,
                      caption: SITE_NAME,
                      width: 512,
                      height: 512,
                    },
                    sameAs: [SITE_URL],
                  },
                  {
                    "@type": "WebSite",
                    "@id": `${SITE_URL}/#website`,
                    url: SITE_URL,
                    name: SITE_NAME,
                    description: SITE_DESCRIPTION,
                    publisher: {
                      "@id": `${SITE_URL}/#organization`,
                    },
                    inLanguage: "en-US",
                    potentialAction: {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
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

import Script from "next/script";

interface StructuredDataProps {
  type: "Website" | "WebPage" | "CollectionPage";
  data?: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  // If data is provided, use it directly (for category pages with complex structure)
  if (data && data["@context"]) {
    return (
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }

  // Otherwise, build base structure
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
    name: "Emoji keyboard online 😊 - Click to copy 🔥 emoji",
    description:
      "Emoji keyboard online 😊 - Click to copy 🔥 emoji - Free online emoji keyboard with thousand emojis to copy and paste instantly. Browse smileys, animals, flags, and latest Unicode emojis. Copy and paste emojis for Twitter, Facebook, Slack, Instagram, Snapchat, GitHub, WhatsApp and more. No apps required.",
    url: "https://emojikart.com",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "1000",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://emojikart.com?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const structuredData = { ...baseStructuredData, ...data };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

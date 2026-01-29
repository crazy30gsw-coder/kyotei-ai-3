import type { Product } from "@/types/database";

interface StructuredDataProps {
  products: Product[];
  intent: string;
}

// JSON-LD構造化データコンポーネント（SEO用）
export default function StructuredData({ products, intent }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `AI SaaSツール ${intent} ランキング 2026年版`,
    description: `主要AIツールを${intent}で比較したランキングです。`,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: product.name,
        description: product.description,
        url: product.official_url,
        applicationCategory: "AI Tool",
        offers: {
          "@type": "Offer",
          price: product.price_monthly ?? 0,
          priceCurrency: "JPY",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: (product.overall_score / 20).toFixed(1),
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

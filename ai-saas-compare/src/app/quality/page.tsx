import type { Metadata } from "next";
import { getProductsByIntent } from "@/lib/products";
import { intentLabels, intentDescriptions } from "@/data/products";
import RankingPage from "@/components/RankingPage";

export const metadata: Metadata = {
  title: "品質重視AIツールランキング | 2026年最新版",
  description:
    "回答の正確性と品質で比較したAIツールランキング。ChatGPT, Claude, Geminiの回答品質を実際に検証。",
};

export default async function QualityPage() {
  const intent = "quality";
  const products = await getProductsByIntent(intent);

  return (
    <RankingPage
      products={products}
      intent={intent}
      title={intentLabels[intent]}
      description={intentDescriptions[intent]}
    />
  );
}

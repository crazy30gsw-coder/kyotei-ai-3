import type { Metadata } from "next";
import { getProductsByIntent } from "@/lib/products";
import { intentLabels, intentDescriptions } from "@/data/products";
import RankingPage from "@/components/RankingPage";

export const metadata: Metadata = {
  title: "コスパ重視AIツールランキング | 2026年最新版",
  description:
    "コストパフォーマンスで比較したAIツールランキング。月額料金と機能のバランスを重視。無料プランの有無も比較。",
};

export default async function PricePage() {
  const intent = "price";
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

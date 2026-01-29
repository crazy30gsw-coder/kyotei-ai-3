import type { Metadata } from "next";
import { getProductsByIntent } from "@/lib/products";
import { intentLabels, intentDescriptions } from "@/data/products";
import RankingPage from "@/components/RankingPage";

export const metadata: Metadata = {
  title: "速度重視AIツールランキング | 2026年最新版",
  description:
    "レスポンスの速さで比較したAIツールランキング。ChatGPT, Claude, Geminiなど主要サービスの応答速度を実測データで比較。",
};

export default async function SpeedPage() {
  const intent = "speed";
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

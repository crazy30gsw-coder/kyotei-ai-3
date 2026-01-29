import type { Metadata } from "next";
import { getProductsByIntent } from "@/lib/products";
import { intentLabels, intentDescriptions } from "@/data/products";
import RankingPage from "@/components/RankingPage";

export const metadata: Metadata = {
  title: "初心者向けAIツールランキング | 2026年最新版",
  description:
    "初めてAIツールを使う方におすすめのランキング。使いやすさ、サポート体制、日本語対応度を重視して比較。",
};

export default async function BeginnerPage() {
  const intent = "beginner";
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

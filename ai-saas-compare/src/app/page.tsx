import { getProductsByIntent } from "@/lib/products";
import { intentLabels, intentDescriptions } from "@/data/products";
import RankingPage from "@/components/RankingPage";

// トップページ（総合ランキング）
export default async function HomePage() {
  const intent = "overall";
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

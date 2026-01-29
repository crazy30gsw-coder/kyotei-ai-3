import type { Metadata } from "next";
import { getProductsByIds, getProducts } from "@/lib/products";
import ComparisonTable from "@/components/ComparisonTable";

export const metadata: Metadata = {
  title: "AIツール比較表 | 横並びで徹底比較",
  description:
    "ChatGPT, Claude, Geminiなど主要AIツールを横並びで詳細比較。価格、性能、特徴の違いが一目でわかる比較表。",
};

interface PageProps {
  searchParams: { ids?: string };
}

export default async function ComparePage({ searchParams }: PageProps) {
  const idsParam = searchParams.ids;
  let products;

  if (idsParam) {
    const ids = idsParam
      .split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id));
    products = await getProductsByIds(ids);
  } else {
    // デフォルトは上位3商品
    const all = await getProducts();
    products = all.slice(0, 3);
  }

  const allProducts = await getProducts();

  return (
    <>
      {/* パンくずリスト */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-600">
          トップ
        </a>
        <span className="mx-2">/</span>
        <span>比較表</span>
      </nav>

      <h2 className="text-2xl font-bold mb-2">AIツール詳細比較表</h2>
      <p className="text-gray-600 mb-6">
        選択した商品のスペック・価格・特徴を横並びで比較できます
      </p>

      {/* 商品選択 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          比較する商品を選択：
        </h3>
        <div className="flex flex-wrap gap-2">
          {allProducts.map((p) => {
            const isSelected = products.some((sp) => sp.id === p.id);
            const currentIds = products.map((sp) => sp.id);
            let nextIds: number[];

            if (isSelected) {
              // 既に選択中の場合は除外
              nextIds = currentIds.filter((id) => id !== p.id);
            } else {
              // 最大3商品まで（超える場合は最初の商品を除外）
              nextIds =
                currentIds.length >= 3
                  ? [...currentIds.slice(1), p.id]
                  : [...currentIds, p.id];
            }

            return (
              <a
                key={p.id}
                href={`/compare?ids=${nextIds.join(",")}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span>{p.logo_emoji}</span>
                {p.name}
              </a>
            );
          })}
        </div>
      </div>

      {/* 比較テーブル */}
      {products.length > 0 ? (
        <ComparisonTable products={products} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
          比較する商品を選択してください
        </div>
      )}
    </>
  );
}

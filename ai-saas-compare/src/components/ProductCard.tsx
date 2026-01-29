"use client";

import type { Product } from "@/types/database";

interface ProductCardProps {
  product: Product;
  rank: number;
  intent: string;
}

// ランクに応じたバッジの色を返す
function getRankBadgeClass(rank: number): string {
  switch (rank) {
    case 1:
      return "bg-yellow-400 text-yellow-900";
    case 2:
      return "bg-gray-300 text-gray-800";
    case 3:
      return "bg-orange-300 text-orange-900";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

// スコアに応じたバーの色を返す
function getScoreBarColor(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-blue-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
}

// アフィリエイトリンククリック時のトラッキング処理
async function handleAffiliateClick(
  productId: number,
  productSlug: string,
  intent: string,
  affiliateUrl: string
) {
  const trackingId = `${intent}_${productSlug}_${Date.now()}`;

  try {
    const res = await fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: productId,
        tracking_id: trackingId,
        referer: window.location.href,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      // APIがリダイレクト先URLを返す場合はそちらを使用
      window.open(data.redirect_url ?? affiliateUrl, "_blank");
    } else {
      // API失敗時は直接遷移
      window.open(affiliateUrl, "_blank");
    }
  } catch {
    // エラー時も直接遷移
    window.open(affiliateUrl, "_blank");
  }
}

export default function ProductCard({
  product,
  rank,
  intent,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* ヘッダー部分 */}
        <div className="flex items-start gap-4">
          {/* ランクバッジ */}
          <div
            className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankBadgeClass(rank)}`}
          >
            {rank}
          </div>

          {/* 商品情報 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{product.logo_emoji}</span>
              <h3 className="text-lg font-bold truncate">{product.name}</h3>
              {product.free_plan && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  無料プランあり
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* 価格表示 */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {product.price_monthly
                  ? `${product.price_monthly.toLocaleString()}円`
                  : "無料"}
              </span>
              <span className="text-sm text-gray-500">/月</span>
              {product.price_yearly && (
                <span className="text-xs text-gray-400">
                  (年払い: {product.price_yearly.toLocaleString()}円/年)
                </span>
              )}
            </div>

            {/* スコアバー */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: "速度", score: product.speed_score },
                { label: "品質", score: product.quality_score },
                { label: "コスパ", score: product.price_score },
                { label: "初心者", score: product.beginner_score },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium">{item.score}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getScoreBarColor(item.score)}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 特徴タグ */}
            <div className="flex flex-wrap gap-1 mb-4">
              {product.features.slice(0, 4).map((feature) => (
                <span
                  key={feature}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 4 && (
                <span className="text-xs text-gray-400">
                  +{product.features.length - 4}件
                </span>
              )}
            </div>

            {/* メリット・デメリット */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div>
                <h4 className="text-xs font-medium text-green-700 mb-1">
                  メリット
                </h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {product.pros.slice(0, 2).map((pro) => (
                    <li key={pro} className="flex items-start gap-1">
                      <span className="text-green-500 flex-shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-medium text-red-700 mb-1">
                  デメリット
                </h4>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {product.cons.slice(0, 2).map((con) => (
                    <li key={con} className="flex items-start gap-1">
                      <span className="text-red-500 flex-shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  handleAffiliateClick(
                    product.id,
                    product.slug,
                    intent,
                    product.affiliate_url
                  )
                }
                className="flex-1 bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                公式サイトを見る（PR）
              </button>
              <a
                href={`/${product.slug}`}
                className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700"
              >
                詳細を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

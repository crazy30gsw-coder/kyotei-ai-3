"use client";

import type { Product } from "@/types/database";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

// スコアバーの色
function getScoreBarColor(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 80) return "bg-blue-500";
  if (score >= 70) return "bg-yellow-500";
  return "bg-red-500";
}

// アフィリエイトクリックハンドラー
async function handleClick(product: Product) {
  const trackingId = `detail_${product.slug}_${Date.now()}`;
  try {
    const res = await fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_id: product.id,
        tracking_id: trackingId,
        referer: window.location.href,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      window.open(data.redirect_url ?? product.affiliate_url, "_blank");
    } else {
      window.open(product.affiliate_url, "_blank");
    }
  } catch {
    window.open(product.affiliate_url, "_blank");
  }
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: product.name,
            description: product.description,
            url: product.official_url,
            applicationCategory: "AI Tool",
            offers: {
              "@type": "Offer",
              price: product.price_monthly ?? 0,
              priceCurrency: "JPY",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: (product.overall_score / 20).toFixed(1),
              bestRating: "5",
              worstRating: "1",
              ratingCount: 100,
            },
          }),
        }}
      />

      {/* パンくずリスト */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-600">
          トップ
        </a>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      {/* 商品ヘッダー */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-start gap-4">
          <span className="text-5xl">{product.logo_emoji}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              {product.free_plan && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  無料プランあり
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-2">{today} 更新</p>
            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* 料金 */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-blue-600">
                {product.price_monthly
                  ? `${product.price_monthly.toLocaleString()}円`
                  : "無料"}
              </span>
              <span className="text-gray-500">/月</span>
              {product.price_yearly && (
                <span className="text-sm text-gray-400">
                  年払い: {product.price_yearly.toLocaleString()}円/年
                  （月あたり{Math.round(product.price_yearly / 12).toLocaleString()}円）
                </span>
              )}
            </div>

            <button
              onClick={() => handleClick(product)}
              className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              公式サイトで詳細を見る（PR）
            </button>
          </div>
        </div>
      </div>

      {/* スコア詳細 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">評価スコア</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "総合スコア", score: product.overall_score },
            { label: "速度", score: product.speed_score },
            { label: "品質", score: product.quality_score },
            { label: "コスパ", score: product.price_score },
            { label: "初心者向け", score: product.beginner_score },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span className="text-sm font-bold">{item.score}/100</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${getScoreBarColor(item.score)}`}
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 特徴一覧 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">主な特徴</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {product.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-blue-500 flex-shrink-0">*</span>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* メリット・デメリット */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-green-700 mb-4">メリット</h3>
          <ul className="space-y-3">
            {product.pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2">
                <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">
                  +
                </span>
                <span className="text-sm text-gray-700">{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-red-700 mb-4">デメリット</h3>
          <ul className="space-y-3">
            {product.cons.map((con) => (
              <li key={con} className="flex items-start gap-2">
                <span className="text-red-500 font-bold flex-shrink-0 mt-0.5">
                  -
                </span>
                <span className="text-sm text-gray-700">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 料金プラン */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-bold mb-4">料金プラン</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-3 text-left">プラン</th>
                <th className="p-3 text-right">料金</th>
              </tr>
            </thead>
            <tbody>
              {product.free_plan && (
                <tr className="border-t">
                  <td className="p-3">無料プラン</td>
                  <td className="p-3 text-right font-medium">0円</td>
                </tr>
              )}
              {product.price_monthly && (
                <tr className="border-t">
                  <td className="p-3">月額プラン</td>
                  <td className="p-3 text-right font-medium">
                    {product.price_monthly.toLocaleString()}円/月
                  </td>
                </tr>
              )}
              {product.price_yearly && (
                <tr className="border-t">
                  <td className="p-3">年額プラン</td>
                  <td className="p-3 text-right font-medium">
                    {product.price_yearly.toLocaleString()}円/年
                    <span className="text-xs text-gray-500 block">
                      （月あたり{Math.round(product.price_yearly / 12).toLocaleString()}円）
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-50 rounded-xl p-6 mb-6 text-center">
        <h3 className="text-lg font-bold mb-2">
          {product.name}を使ってみる
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {product.free_plan
            ? "まずは無料プランから始められます"
            : "公式サイトで詳細をご確認ください"}
        </p>
        <button
          onClick={() => handleClick(product)}
          className="bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
        >
          公式サイトへ（PR）
        </button>
      </div>

      {/* 他の商品との比較 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4">他のAIツールと比較する</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedProducts.slice(0, 4).map((related) => (
            <a
              key={related.id}
              href={`/compare?ids=${product.id},${related.id}`}
              className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl">{related.logo_emoji}</span>
              <div>
                <p className="font-medium text-sm">
                  {product.name} vs {related.name}
                </p>
                <p className="text-xs text-gray-500">
                  総合: {product.overall_score} vs {related.overall_score}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import type { Product } from "@/types/database";

interface ComparisonTableProps {
  products: Product[];
}

// スコアに応じたセルの色を返す
function getScoreCellClass(score: number, allScores: number[]): string {
  const maxScore = Math.max(...allScores);
  if (score === maxScore) return "bg-green-100 text-green-800 font-bold";
  return "";
}

export default function ComparisonTable({ products }: ComparisonTableProps) {
  if (products.length === 0) return null;

  const scoreCategories = [
    { key: "overall_score" as const, label: "総合スコア" },
    { key: "speed_score" as const, label: "速度" },
    { key: "quality_score" as const, label: "品質" },
    { key: "price_score" as const, label: "コスパ" },
    { key: "beginner_score" as const, label: "初心者向け" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-4 text-sm font-medium text-gray-600 border-b w-32">
              項目
            </th>
            {products.map((p) => (
              <th
                key={p.id}
                className="text-center p-4 text-sm font-bold border-b min-w-[160px]"
              >
                <span className="text-xl block mb-1">{p.logo_emoji}</span>
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 月額料金 */}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600 border-b">
              月額料金
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-center text-sm border-b">
                <span className="font-bold text-blue-600">
                  {p.price_monthly
                    ? `${p.price_monthly.toLocaleString()}円`
                    : "無料"}
                </span>
              </td>
            ))}
          </tr>

          {/* 無料プラン */}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600 border-b">
              無料プラン
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-center text-sm border-b">
                {p.free_plan ? (
                  <span className="text-green-600 font-medium">あり</span>
                ) : (
                  <span className="text-gray-400">なし</span>
                )}
              </td>
            ))}
          </tr>

          {/* 年額料金 */}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600 border-b">
              年額料金
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-center text-sm border-b">
                {p.price_yearly
                  ? `${p.price_yearly.toLocaleString()}円`
                  : "-"}
              </td>
            ))}
          </tr>

          {/* スコア */}
          {scoreCategories.map((cat) => (
            <tr key={cat.key}>
              <td className="p-4 text-sm font-medium text-gray-600 border-b">
                {cat.label}
              </td>
              {products.map((p) => {
                const allScores = products.map((pp) => pp[cat.key]);
                return (
                  <td
                    key={p.id}
                    className={`p-4 text-center text-sm border-b ${getScoreCellClass(p[cat.key], allScores)}`}
                  >
                    {p[cat.key]}/100
                  </td>
                );
              })}
            </tr>
          ))}

          {/* 主な特徴 */}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600 border-b align-top">
              主な特徴
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-sm border-b align-top">
                <ul className="space-y-1">
                  {p.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-1 text-xs">
                      <span className="text-blue-500 flex-shrink-0">*</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* メリット */}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600 border-b align-top">
              メリット
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-sm border-b align-top">
                <ul className="space-y-1">
                  {p.pros.map((pro) => (
                    <li
                      key={pro}
                      className="flex items-start gap-1 text-xs text-green-700"
                    >
                      <span className="flex-shrink-0">+</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>

          {/* デメリット */}
          <tr>
            <td className="p-4 text-sm font-medium text-gray-600 align-top">
              デメリット
            </td>
            {products.map((p) => (
              <td key={p.id} className="p-4 text-sm align-top">
                <ul className="space-y-1">
                  {p.cons.map((con) => (
                    <li
                      key={con}
                      className="flex items-start gap-1 text-xs text-red-700"
                    >
                      <span className="flex-shrink-0">-</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

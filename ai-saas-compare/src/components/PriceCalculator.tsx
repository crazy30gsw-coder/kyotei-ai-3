"use client";

import { useState } from "react";

// 各ツールの料金体系
const pricingPlans = [
  {
    name: "ChatGPT Plus",
    emoji: "🤖",
    free: { limit: "GPT-3.5無制限 / GPT-4o 制限あり", cost: 0 },
    paid: { price: 3000, label: "月額3,000円" },
    apiPerRequest: 0.03, // 1リクエストあたり概算（円）
    color: "bg-green-500",
  },
  {
    name: "Claude Pro",
    emoji: "🧠",
    free: { limit: "Claude 3.5 Sonnet 制限あり", cost: 0 },
    paid: { price: 3000, label: "月額3,000円" },
    apiPerRequest: 0.045,
    color: "bg-purple-500",
  },
  {
    name: "Gemini Advanced",
    emoji: "💎",
    free: { limit: "Gemini 1.5 Flash 制限あり", cost: 0 },
    paid: { price: 2900, label: "月額2,900円" },
    apiPerRequest: 0.02,
    color: "bg-blue-500",
  },
  {
    name: "Perplexity Pro",
    emoji: "🔍",
    free: { limit: "基本検索無制限 / Pro検索 5回/日", cost: 0 },
    paid: { price: 2960, label: "月額2,960円" },
    apiPerRequest: 0.005,
    color: "bg-teal-500",
  },
  {
    name: "Copilot Pro",
    emoji: "✈️",
    free: { limit: "GPT-4 制限あり", cost: 0 },
    paid: { price: 3200, label: "月額3,200円" },
    apiPerRequest: 0.035,
    color: "bg-orange-500",
  },
];

export default function PriceCalculator() {
  const [dailyUsage, setDailyUsage] = useState(10); // 1日のリクエスト数
  const [useCase, setUseCase] = useState<"chat" | "api">("chat");

  const monthlyRequests = dailyUsage * 30;

  return (
    <div className="space-y-6">
      {/* 入力エリア */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold mb-4">利用条件を設定</h3>

        {/* 利用形態 */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            利用形態
          </label>
          <div className="flex gap-3">
            <button
              onClick={() => setUseCase("chat")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                useCase === "chat"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              チャット利用（月額プラン）
            </button>
            <button
              onClick={() => setUseCase("api")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                useCase === "api"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              API利用（従量課金）
            </button>
          </div>
        </div>

        {/* 利用頻度スライダー */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            1日あたりの利用回数: <strong>{dailyUsage}回</strong>
            <span className="text-gray-500 font-normal">
              （月間約{monthlyRequests.toLocaleString()}回）
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={100}
            value={dailyUsage}
            onChange={(e) => setDailyUsage(parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1回/日</span>
            <span>50回/日</span>
            <span>100回/日</span>
          </div>
        </div>
      </div>

      {/* 結果表示 */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-bold mb-4">月額コスト比較</h3>
        <div className="space-y-4">
          {pricingPlans
            .map((plan) => {
              const monthlyCost =
                useCase === "chat"
                  ? plan.paid.price
                  : Math.round(monthlyRequests * plan.apiPerRequest);
              const costPerRequest =
                useCase === "chat"
                  ? monthlyRequests > 0
                    ? Math.round((plan.paid.price / monthlyRequests) * 100) / 100
                    : 0
                  : plan.apiPerRequest;

              return { ...plan, monthlyCost, costPerRequest };
            })
            .sort((a, b) => a.monthlyCost - b.monthlyCost)
            .map((plan, index) => (
              <div key={plan.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                        最安
                      </span>
                    )}
                    <span className="text-lg">{plan.emoji}</span>
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-blue-600">
                      {plan.monthlyCost.toLocaleString()}円
                    </span>
                    <span className="text-sm text-gray-500">/月</span>
                  </div>
                </div>

                {/* コストバー */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${plan.color}`}
                    style={{
                      width: `${Math.min(
                        (plan.monthlyCost / 5000) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    1リクエストあたり: {plan.costPerRequest.toFixed(2)}円
                  </span>
                  <span>
                    {useCase === "chat" ? plan.paid.label : "従量課金"}
                  </span>
                </div>

                {/* 無料プラン情報 */}
                <div className="mt-2 text-xs text-gray-400">
                  無料プラン: {plan.free.limit}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* アドバイス */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold mb-2">あなたへのおすすめ</h3>
        <p className="text-sm text-gray-700">
          {dailyUsage <= 5 && useCase === "chat" && (
            <>
              1日{dailyUsage}回程度の利用なら、まずは各ツールの
              <strong>無料プラン</strong>
              で試してみることをおすすめします。無料プランでも基本的な機能は十分に使えます。
            </>
          )}
          {dailyUsage > 5 && dailyUsage <= 30 && useCase === "chat" && (
            <>
              1日{dailyUsage}回の利用なら、<strong>有料プラン</strong>
              への加入がおすすめです。どのサービスも月額3,000円前後で、1回あたりのコストは
              {Math.round((3000 / monthlyRequests) * 100) / 100}
              円程度と非常にコスパが良いです。
            </>
          )}
          {dailyUsage > 30 && useCase === "chat" && (
            <>
              1日{dailyUsage}回のヘビーユースなら、<strong>有料プラン</strong>
              が必須です。利用回数の上限に注意して、必要に応じて複数ツールを使い分けることも検討してください。
            </>
          )}
          {useCase === "api" && (
            <>
              API利用の場合、月間{monthlyRequests.toLocaleString()}
              リクエストでの概算コストです。実際のコストはトークン数やモデルによって変動します。
              小規模なら従量課金、大規模なら月額プラン+APIの組み合わせが効率的です。
            </>
          )}
        </p>
      </div>
    </div>
  );
}

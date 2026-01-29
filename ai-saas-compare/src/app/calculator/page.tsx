import type { Metadata } from "next";
import PriceCalculator from "@/components/PriceCalculator";

export const metadata: Metadata = {
  title: "AI\u30c4\u30fc\u30eb\u6599\u91d1\u30b7\u30df\u30e5\u30ec\u30fc\u30bf\u30fc | \u6708\u984d\u30b3\u30b9\u30c8\u8a08\u7b97",
  description:
    "\u3042\u306a\u305f\u306e\u5229\u7528\u983b\u5ea6\u306b\u5408\u3063\u305fAI\u30c4\u30fc\u30eb\u306e\u6708\u984d\u30b3\u30b9\u30c8\u3092\u30b7\u30df\u30e5\u30ec\u30fc\u30b7\u30e7\u30f3\u3002\u7121\u6599\u30d7\u30e9\u30f3\u3068\u6709\u6599\u30d7\u30e9\u30f3\u306e\u30b3\u30b9\u30d1\u3092\u6bd4\u8f03\u3002",
};

export default function CalculatorPage() {
  return (
    <>
      {/* パンくずリスト */}
      <nav className="text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-blue-600">
          トップ
        </a>
        <span className="mx-2">/</span>
        <span>料金シミュレーター</span>
      </nav>

      <h2 className="text-2xl font-bold mb-2">
        AIツール料金シミュレーター
      </h2>
      <p className="text-gray-600 mb-6">
        あなたの利用頻度に合わせて、各AIツールの月額コストを比較できます
      </p>

      <PriceCalculator />
    </>
  );
}

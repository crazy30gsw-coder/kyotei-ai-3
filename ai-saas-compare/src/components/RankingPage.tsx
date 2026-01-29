import type { Product } from "@/types/database";
import ProductCard from "@/components/ProductCard";
import StructuredData from "@/components/StructuredData";

interface RankingPageProps {
  products: Product[];
  intent: string;
  title: string;
  description: string;
}

// ランキングページ共通コンポーネント
export default function RankingPage({
  products,
  intent,
  title,
  description,
}: RankingPageProps) {
  const today = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <StructuredData products={products} intent={intent} />

      {/* ページヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <span>{today} 更新</span>
          <span>|</span>
          <span>全{products.length}商品を比較</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* インテント切替リンク */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: "overall", label: "総合", href: "/" },
          { key: "speed", label: "速度重視", href: "/speed" },
          { key: "quality", label: "品質重視", href: "/quality" },
          { key: "price", label: "コスパ重視", href: "/price" },
          { key: "beginner", label: "初心者向け", href: "/beginner" },
        ].map((item) => (
          <a
            key={item.key}
            href={item.href}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              intent === item.key
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* ランキングカード */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            rank={index + 1}
            intent={intent}
          />
        ))}
      </div>

      {/* SEO用のテキストコンテンツ */}
      <section className="mt-12 bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">
          AI SaaSツール比較の選び方ガイド
        </h3>
        <div className="prose prose-sm max-w-none text-gray-700">
          <p>
            2026年現在、AIツールは急速に進化しており、ChatGPT、Claude、Geminiをはじめとする多くのサービスが提供されています。
            当サイトでは、実際に各ツールを使用した上で、客観的なデータに基づいてランキングを作成しています。
          </p>
          <h4 className="font-bold mt-4 mb-2">用途別のおすすめ</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>文章作成・ブログ運営</strong>
              ：長文に強いClaude Proがおすすめ
            </li>
            <li>
              <strong>プログラミング支援</strong>
              ：コード品質が高いChatGPT Plus / Claude Pro
            </li>
            <li>
              <strong>リサーチ・調査</strong>
              ：ソース付き回答のPerplexity Proが最適
            </li>
            <li>
              <strong>ビジネス文書</strong>
              ：Office連携のMicrosoft Copilot Proが便利
            </li>
            <li>
              <strong>Google Workspace利用者</strong>
              ：Gemini Advancedがシームレスに連携
            </li>
          </ul>
          <h4 className="font-bold mt-4 mb-2">比較のポイント</h4>
          <p>
            AIツールを選ぶ際は、①月額料金、②回答の品質、③応答速度、④対応機能の幅広さ、⑤日本語の自然さの5つの観点から比較することをお勧めします。
            また、多くのサービスが無料プランを提供しているため、まずは無料で試してみることも重要です。
          </p>
        </div>
      </section>

      {/* 比較表へのCTA */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
        <h3 className="text-lg font-bold mb-2">もっと詳しく比較したい方へ</h3>
        <p className="text-sm text-gray-600 mb-4">
          最大3商品を横並びで詳細比較できます
        </p>
        <a
          href="/compare?ids=1,2,3"
          className="inline-block bg-blue-600 text-white font-medium py-2.5 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          詳細比較表を見る
        </a>
      </div>
    </>
  );
}

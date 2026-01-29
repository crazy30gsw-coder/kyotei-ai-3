import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI SaaSツール徹底比較 | 2026年最新版",
    template: "%s | AI SaaSツール比較",
  },
  description:
    "ChatGPT, Claude, Gemini, Perplexity, Copilotなど主要AIツールを価格・性能・使いやすさで徹底比較。あなたに最適なAIツールが見つかります。2026年最新の実測データに基づくランキング。",
  keywords: [
    "AI ツール 比較",
    "ChatGPT 比較",
    "Claude 比較",
    "Gemini 比較",
    "AI SaaS",
    "AIツール おすすめ",
    "AI チャット 比較",
  ],
  openGraph: {
    title: "AI SaaSツール徹底比較 | 2026年最新版",
    description:
      "主要AIツールを価格・性能・使いやすさで徹底比較。あなたに最適なAIツールが見つかります。",
    type: "website",
    locale: "ja_JP",
    siteName: "AI SaaS比較ナビ",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI SaaSツール徹底比較 | 2026年最新版",
    description:
      "主要AIツールを価格・性能・使いやすさで徹底比較。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen">
        {/* PR表示（ステマ規制対応） */}
        <div className="bg-yellow-50 border-b border-yellow-200 text-yellow-800 text-xs text-center py-1">
          当サイトはアフィリエイト広告を利用しています（PR）
        </div>

        {/* ヘッダー */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">🔬</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  AI SaaS比較ナビ
                </h1>
                <p className="text-xs text-gray-500">
                  実測データで選ぶAIツール
                </p>
              </div>
            </a>
          </div>
        </header>

        {/* ナビゲーション */}
        <nav className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4">
            <ul className="flex gap-1 overflow-x-auto text-sm py-2">
              <li>
                <a
                  href="/"
                  className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 whitespace-nowrap inline-block"
                >
                  総合ランキング
                </a>
              </li>
              <li>
                <a
                  href="/speed"
                  className="px-3 py-1.5 rounded-full hover:bg-gray-100 whitespace-nowrap inline-block"
                >
                  速度重視
                </a>
              </li>
              <li>
                <a
                  href="/quality"
                  className="px-3 py-1.5 rounded-full hover:bg-gray-100 whitespace-nowrap inline-block"
                >
                  品質重視
                </a>
              </li>
              <li>
                <a
                  href="/price"
                  className="px-3 py-1.5 rounded-full hover:bg-gray-100 whitespace-nowrap inline-block"
                >
                  コスパ重視
                </a>
              </li>
              <li>
                <a
                  href="/beginner"
                  className="px-3 py-1.5 rounded-full hover:bg-gray-100 whitespace-nowrap inline-block"
                >
                  初心者向け
                </a>
              </li>
              <li>
                <a
                  href="/compare?ids=1,2,3"
                  className="px-3 py-1.5 rounded-full hover:bg-gray-100 whitespace-nowrap inline-block"
                >
                  比較表
                </a>
              </li>
              <li>
                <a
                  href="/calculator"
                  className="px-3 py-1.5 rounded-full hover:bg-gray-100 whitespace-nowrap inline-block"
                >
                  料金計算
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* メインコンテンツ */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* フッター */}
        <footer className="bg-gray-800 text-gray-300 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-white mb-3">AI SaaS比較ナビ</h3>
                <p className="text-sm">
                  主要AIツールを実測データに基づいて客観的に比較。
                  あなたに最適なAIツール選びをサポートします。
                </p>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3">ランキング</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="/" className="hover:text-white">
                      総合ランキング
                    </a>
                  </li>
                  <li>
                    <a href="/speed" className="hover:text-white">
                      速度重視ランキング
                    </a>
                  </li>
                  <li>
                    <a href="/quality" className="hover:text-white">
                      品質重視ランキング
                    </a>
                  </li>
                  <li>
                    <a href="/price" className="hover:text-white">
                      コスパ重視ランキング
                    </a>
                  </li>
                  <li>
                    <a href="/beginner" className="hover:text-white">
                      初心者向けランキング
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-3">ツール</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a href="/compare?ids=1,2,3" className="hover:text-white">
                      商品比較表
                    </a>
                  </li>
                  <li>
                    <a href="/calculator" className="hover:text-white">
                      料金シミュレーター
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs">
              <p>
                &copy; 2026 AI SaaS比較ナビ. 当サイトはアフィリエイト広告を利用しています。
              </p>
              <p className="mt-1">
                最終更新日: {new Date().toLocaleDateString("ja-JP")}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

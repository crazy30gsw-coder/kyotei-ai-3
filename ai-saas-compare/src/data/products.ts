import type { Product } from "@/types/database";

// 初期商品データ（Supabaseが未設定の場合のフォールバック）
// 実運用時はSupabaseからデータを取得する
export const initialProducts: Product[] = [
  {
    id: 1,
    name: "ChatGPT Plus",
    slug: "chatgpt",
    category: "AI チャット",
    description:
      "OpenAIが開発した最も有名なAIアシスタント。GPT-4oを搭載し、テキスト生成・コード作成・画像生成まで幅広く対応。プラグインやカスタムGPTsで拡張性も高い。",
    price_monthly: 3000,
    price_yearly: 36000,
    free_plan: true,
    affiliate_url: "#",
    reward_amount: 1500,
    official_url: "https://chat.openai.com",
    image_url: "/images/chatgpt.png",
    logo_emoji: "🤖",
    features: [
      "GPT-4o搭載",
      "画像生成（DALL-E 3）",
      "コード実行（Code Interpreter）",
      "カスタムGPTs作成",
      "ファイルアップロード対応",
      "プラグイン対応",
      "音声会話機能",
    ],
    pros: [
      "最も知名度が高く情報が豊富",
      "プラグインで機能拡張可能",
      "画像生成もワンストップ",
      "カスタムGPTsでワークフロー自動化",
    ],
    cons: [
      "月額3,000円とやや高め",
      "ピーク時にレスポンスが遅い場合あり",
      "無料版は機能制限が多い",
    ],
    speed_score: 80,
    quality_score: 90,
    price_score: 60,
    beginner_score: 95,
    overall_score: 88,
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Claude Pro",
    slug: "claude",
    category: "AI チャット",
    description:
      "Anthropicが開発したAIアシスタント。長文理解に優れ、最大20万トークンのコンテキストウィンドウを持つ。論理的な回答と安全性の高さが特徴。コーディング支援にも強い。",
    price_monthly: 3000,
    price_yearly: 36000,
    free_plan: true,
    affiliate_url: "#",
    reward_amount: 2000,
    official_url: "https://claude.ai",
    image_url: "/images/claude.png",
    logo_emoji: "🧠",
    features: [
      "Claude 3.5 Sonnet / Opus搭載",
      "20万トークンの長文理解",
      "高精度なコーディング支援",
      "ファイル分析対応",
      "Artifacts機能（コード実行）",
      "Projects機能",
      "安全性重視の設計",
    ],
    pros: [
      "長文の理解・要約が業界最強",
      "論理的で正確な回答が得意",
      "コーディング支援の精度が高い",
      "日本語の品質が自然",
    ],
    cons: [
      "画像生成機能がない",
      "プラグイン非対応",
      "利用回数制限がやや厳しい",
    ],
    speed_score: 85,
    quality_score: 95,
    price_score: 60,
    beginner_score: 85,
    overall_score: 90,
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Gemini Advanced",
    slug: "gemini",
    category: "AI チャット",
    description:
      "Google DeepMindが開発したマルチモーダルAI。Google Workspaceとの連携が強み。画像・動画・音声の理解に対応し、Google検索との統合で最新情報にアクセス可能。",
    price_monthly: 2900,
    price_yearly: 34800,
    free_plan: true,
    affiliate_url: "#",
    reward_amount: 1000,
    official_url: "https://gemini.google.com",
    image_url: "/images/gemini.png",
    logo_emoji: "💎",
    features: [
      "Gemini 1.5 Pro搭載",
      "100万トークンの超長文理解",
      "Google Workspace連携",
      "マルチモーダル（画像・動画・音声）",
      "Google検索統合",
      "2TBクラウドストレージ付属",
      "リアルタイム情報アクセス",
    ],
    pros: [
      "Google Workspaceとの連携が便利",
      "最新情報をリアルタイムで取得",
      "マルチモーダル対応が充実",
      "Google One特典付きでコスパ良好",
    ],
    cons: [
      "回答の正確性がやや不安定",
      "日本語の品質がやや劣る場合あり",
      "クリエイティブ系の出力が弱い",
    ],
    speed_score: 90,
    quality_score: 80,
    price_score: 75,
    beginner_score: 90,
    overall_score: 82,
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Perplexity Pro",
    slug: "perplexity",
    category: "AI 検索",
    description:
      "AI搭載の次世代検索エンジン。質問に対してソース付きで回答し、情報の正確性を担保。リサーチ・調査業務に特化しており、最新情報へのアクセスが強み。",
    price_monthly: 2960,
    price_yearly: 29600,
    free_plan: true,
    affiliate_url: "#",
    reward_amount: 1200,
    official_url: "https://www.perplexity.ai",
    image_url: "/images/perplexity.png",
    logo_emoji: "🔍",
    features: [
      "ソース付き回答",
      "リアルタイムWeb検索",
      "複数AIモデル選択可能",
      "ファイルアップロード対応",
      "Copilotモード（対話型リサーチ）",
      "コレクション機能",
      "API利用可能",
    ],
    pros: [
      "回答にソースが明示される信頼性",
      "リサーチ・調査に最適",
      "無料版でも十分使える",
      "最新情報のアクセスが速い",
    ],
    cons: [
      "長文生成には不向き",
      "クリエイティブな文章作成が苦手",
      "コーディング支援は基本的",
    ],
    speed_score: 95,
    quality_score: 75,
    price_score: 70,
    beginner_score: 92,
    overall_score: 80,
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Microsoft Copilot Pro",
    slug: "copilot",
    category: "AI アシスタント",
    description:
      "MicrosoftのAIアシスタント。Office 365との統合が最大の強み。Word・Excel・PowerPointでAI機能を直接利用でき、ビジネスユーザーの生産性を大幅に向上。",
    price_monthly: 3200,
    price_yearly: 38400,
    free_plan: true,
    affiliate_url: "#",
    reward_amount: 1800,
    official_url: "https://copilot.microsoft.com",
    image_url: "/images/copilot.png",
    logo_emoji: "✈️",
    features: [
      "GPT-4 Turbo搭載",
      "Office 365完全統合",
      "画像生成（Designer）",
      "Web検索統合（Bing）",
      "Word/Excel/PowerPoint連携",
      "Outlook連携",
      "Teams連携",
    ],
    pros: [
      "Office 365ユーザーには最強の選択肢",
      "ビジネス文書作成が効率化",
      "画像生成も無料で利用可能",
      "Edgeブラウザとの統合が便利",
    ],
    cons: [
      "Office 365の契約が別途必要",
      "単体のAI性能はChatGPT/Claudeに劣る",
      "カスタマイズ性が低い",
    ],
    speed_score: 75,
    quality_score: 78,
    price_score: 55,
    beginner_score: 88,
    overall_score: 76,
    updated_at: new Date().toISOString(),
  },
];

// スコアキーのマッピング
export const scoreKeys: Record<string, keyof Product> = {
  overall: "overall_score",
  speed: "speed_score",
  quality: "quality_score",
  price: "price_score",
  beginner: "beginner_score",
};

// intent別のラベル
export const intentLabels: Record<string, string> = {
  overall: "総合ランキング",
  speed: "速度重視ランキング",
  quality: "品質重視ランキング",
  price: "コスパ重視ランキング",
  beginner: "初心者向けランキング",
};

// intent別の説明文
export const intentDescriptions: Record<string, string> = {
  overall: "価格・性能・使いやすさを総合的に評価したランキングです。",
  speed: "レスポンスの速さと処理効率を重視したランキングです。",
  quality: "回答の正確性と品質を重視したランキングです。",
  price: "月額料金と機能のコストパフォーマンスを重視したランキングです。",
  beginner: "初めてAIツールを使う方にとっての使いやすさを重視したランキングです。",
};

// 商品をintentに応じてソートする
export function sortProductsByIntent(
  products: Product[],
  intent: string
): Product[] {
  const key = scoreKeys[intent] ?? "overall_score";
  return [...products].sort((a, b) => {
    const aVal = a[key] as number;
    const bVal = b[key] as number;
    return bVal - aVal;
  });
}

-- ============================================
-- AI SaaS比較サイト データベーススキーマ
-- Supabase (PostgreSQL) 用
-- ============================================

-- 商品テーブル
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(100) NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  price_monthly INTEGER,
  price_yearly INTEGER,
  free_plan BOOLEAN NOT NULL DEFAULT false,
  affiliate_url TEXT NOT NULL DEFAULT '#',
  reward_amount INTEGER NOT NULL DEFAULT 0,
  official_url TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  logo_emoji VARCHAR(10) NOT NULL DEFAULT '',
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  pros JSONB NOT NULL DEFAULT '[]'::jsonb,
  cons JSONB NOT NULL DEFAULT '[]'::jsonb,
  speed_score INTEGER NOT NULL DEFAULT 0,
  quality_score INTEGER NOT NULL DEFAULT 0,
  price_score INTEGER NOT NULL DEFAULT 0,
  beginner_score INTEGER NOT NULL DEFAULT 0,
  overall_score INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- クリックテーブル（アフィリエイトリンククリック記録）
CREATE TABLE IF NOT EXISTS clicks (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tracking_id VARCHAR(255) NOT NULL,
  user_agent TEXT NOT NULL DEFAULT '',
  referer TEXT NOT NULL DEFAULT '',
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- コンバージョンテーブル（成約記録）
CREATE TABLE IF NOT EXISTS conversions (
  id SERIAL PRIMARY KEY,
  click_id INTEGER REFERENCES clicks(id) ON DELETE SET NULL,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  converted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reward_received INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected'))
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_clicks_product_id ON clicks(product_id);
CREATE INDEX IF NOT EXISTS idx_clicks_clicked_at ON clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_conversions_product_id ON conversions(product_id);
CREATE INDEX IF NOT EXISTS idx_conversions_status ON conversions(status);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 商品の updated_at を自動更新するトリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 初期データ（サンプル商品5件）
-- ============================================

INSERT INTO products (name, slug, category, description, price_monthly, price_yearly, free_plan, affiliate_url, reward_amount, official_url, image_url, logo_emoji, features, pros, cons, speed_score, quality_score, price_score, beginner_score, overall_score)
VALUES
(
  'ChatGPT Plus',
  'chatgpt',
  'AI チャット',
  'OpenAIが開発した最も有名なAIアシスタント。GPT-4oを搭載し、テキスト生成・コード作成・画像生成まで幅広く対応。プラグインやカスタムGPTsで拡張性も高い。',
  3000, 36000, true, '#', 1500,
  'https://chat.openai.com', '/images/chatgpt.png', '🤖',
  '["GPT-4o搭載","画像生成（DALL-E 3）","コード実行（Code Interpreter）","カスタムGPTs作成","ファイルアップロード対応","プラグイン対応","音声会話機能"]'::jsonb,
  '["最も知名度が高く情報が豊富","プラグインで機能拡張可能","画像生成もワンストップ","カスタムGPTsでワークフロー自動化"]'::jsonb,
  '["月額3,000円とやや高め","ピーク時にレスポンスが遅い場合あり","無料版は機能制限が多い"]'::jsonb,
  80, 90, 60, 95, 88
),
(
  'Claude Pro',
  'claude',
  'AI チャット',
  'Anthropicが開発したAIアシスタント。長文理解に優れ、最大20万トークンのコンテキストウィンドウを持つ。論理的な回答と安全性の高さが特徴。コーディング支援にも強い。',
  3000, 36000, true, '#', 2000,
  'https://claude.ai', '/images/claude.png', '🧠',
  '["Claude 3.5 Sonnet / Opus搭載","20万トークンの長文理解","高精度なコーディング支援","ファイル分析対応","Artifacts機能（コード実行）","Projects機能","安全性重視の設計"]'::jsonb,
  '["長文の理解・要約が業界最強","論理的で正確な回答が得意","コーディング支援の精度が高い","日本語の品質が自然"]'::jsonb,
  '["画像生成機能がない","プラグイン非対応","利用回数制限がやや厳しい"]'::jsonb,
  85, 95, 60, 85, 90
),
(
  'Gemini Advanced',
  'gemini',
  'AI チャット',
  'Google DeepMindが開発したマルチモーダルAI。Google Workspaceとの連携が強み。画像・動画・音声の理解に対応し、Google検索との統合で最新情報にアクセス可能。',
  2900, 34800, true, '#', 1000,
  'https://gemini.google.com', '/images/gemini.png', '💎',
  '["Gemini 1.5 Pro搭載","100万トークンの超長文理解","Google Workspace連携","マルチモーダル（画像・動画・音声）","Google検索統合","2TBクラウドストレージ付属","リアルタイム情報アクセス"]'::jsonb,
  '["Google Workspaceとの連携が便利","最新情報をリアルタイムで取得","マルチモーダル対応が充実","Google One特典付きでコスパ良好"]'::jsonb,
  '["回答の正確性がやや不安定","日本語の品質がやや劣る場合あり","クリエイティブ系の出力が弱い"]'::jsonb,
  90, 80, 75, 90, 82
),
(
  'Perplexity Pro',
  'perplexity',
  'AI 検索',
  'AI搭載の次世代検索エンジン。質問に対してソース付きで回答し、情報の正確性を担保。リサーチ・調査業務に特化しており、最新情報へのアクセスが強み。',
  2960, 29600, true, '#', 1200,
  'https://www.perplexity.ai', '/images/perplexity.png', '🔍',
  '["ソース付き回答","リアルタイムWeb検索","複数AIモデル選択可能","ファイルアップロード対応","Copilotモード（対話型リサーチ）","コレクション機能","API利用可能"]'::jsonb,
  '["回答にソースが明示される信頼性","リサーチ・調査に最適","無料版でも十分使える","最新情報のアクセスが速い"]'::jsonb,
  '["長文生成には不向き","クリエイティブな文章作成が苦手","コーディング支援は基本的"]'::jsonb,
  95, 75, 70, 92, 80
),
(
  'Microsoft Copilot Pro',
  'copilot',
  'AI アシスタント',
  'MicrosoftのAIアシスタント。Office 365との統合が最大の強み。Word・Excel・PowerPointでAI機能を直接利用でき、ビジネスユーザーの生産性を大幅に向上。',
  3200, 38400, true, '#', 1800,
  'https://copilot.microsoft.com', '/images/copilot.png', '✈️',
  '["GPT-4 Turbo搭載","Office 365完全統合","画像生成（Designer）","Web検索統合（Bing）","Word/Excel/PowerPoint連携","Outlook連携","Teams連携"]'::jsonb,
  '["Office 365ユーザーには最強の選択肢","ビジネス文書作成が効率化","画像生成も無料で利用可能","Edgeブラウザとの統合が便利"]'::jsonb,
  '["Office 365の契約が別途必要","単体のAI性能はChatGPT/Claudeに劣る","カスタマイズ性が低い"]'::jsonb,
  75, 78, 55, 88, 76
);

-- ============================================
-- コンバージョン率計算用関数
-- ============================================

CREATE OR REPLACE FUNCTION calculate_conversion_rates()
RETURNS TABLE (
  product_id INTEGER,
  product_name VARCHAR(255),
  clicks BIGINT,
  conversions BIGINT,
  revenue BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS product_id,
    p.name AS product_name,
    COALESCE(cl.click_count, 0) AS clicks,
    COALESCE(cv.conv_count, 0) AS conversions,
    COALESCE(cv.total_revenue, 0) AS revenue
  FROM products p
  LEFT JOIN (
    SELECT c.product_id, COUNT(*)::BIGINT AS click_count
    FROM clicks c
    GROUP BY c.product_id
  ) cl ON p.id = cl.product_id
  LEFT JOIN (
    SELECT cv2.product_id, COUNT(*)::BIGINT AS conv_count, SUM(cv2.reward_received)::BIGINT AS total_revenue
    FROM conversions cv2
    WHERE cv2.status = 'approved'
    GROUP BY cv2.product_id
  ) cv ON p.id = cv.product_id
  ORDER BY revenue DESC;
END;
$$ LANGUAGE plpgsql;

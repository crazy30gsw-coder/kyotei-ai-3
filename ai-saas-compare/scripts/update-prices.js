/**
 * 商品価格自動更新スクリプト
 * GitHub Actionsから毎日実行される
 *
 * 注意: 本番運用時は各サービスの公式APIやRSSフィードから
 * 価格情報を取得するように実装を変更してください。
 * スクレイピングはサービスの利用規約を確認の上で行ってください。
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log(
    "Supabase環境変数が未設定のためスキップします。SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY を設定してください。"
  );
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 各商品の最新価格データ（手動更新 or API取得に置き換え可能）
const priceUpdates = [
  { slug: "chatgpt", price_monthly: 3000, price_yearly: 36000 },
  { slug: "claude", price_monthly: 3000, price_yearly: 36000 },
  { slug: "gemini", price_monthly: 2900, price_yearly: 34800 },
  { slug: "perplexity", price_monthly: 2960, price_yearly: 29600 },
  { slug: "copilot", price_monthly: 3200, price_yearly: 38400 },
];

async function updatePrices() {
  console.log("=== 商品価格更新を開始 ===");
  console.log(`更新日時: ${new Date().toISOString()}`);

  for (const update of priceUpdates) {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          price_monthly: update.price_monthly,
          price_yearly: update.price_yearly,
          updated_at: new Date().toISOString(),
        })
        .eq("slug", update.slug);

      if (error) {
        console.error(`${update.slug} の更新に失敗:`, error.message);
      } else {
        console.log(
          `${update.slug}: 月額${update.price_monthly}円 / 年額${update.price_yearly}円 に更新`
        );
      }
    } catch (err) {
      console.error(`${update.slug} の更新で例外発生:`, err);
    }
  }

  console.log("=== 商品価格更新を完了 ===");
}

updatePrices().catch(console.error);

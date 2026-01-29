/**
 * 日次統計集計スクリプト
 * GitHub Actionsから毎日実行される
 *
 * 前日のクリック数・コンバージョン数を集計し、
 * 「どの商品が儲かるか」を分析するためのデータを生成
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log(
    "Supabase環境変数が未設定のためスキップします。"
  );
  process.exit(0);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function aggregateStats() {
  console.log("=== 日次統計集計を開始 ===");

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  // 昨日のクリック数を商品別に集計
  const { data: clicks, error: clickError } = await supabase
    .from("clicks")
    .select("product_id")
    .gte("clicked_at", `${yesterdayStr}T00:00:00`)
    .lt("clicked_at", `${yesterdayStr}T23:59:59`);

  if (clickError) {
    console.error("クリック集計エラー:", clickError.message);
    return;
  }

  // 商品別のクリック数
  const clickCounts = {};
  for (const click of clicks || []) {
    clickCounts[click.product_id] =
      (clickCounts[click.product_id] || 0) + 1;
  }

  // 昨日のコンバージョン数を集計
  const { data: conversions, error: convError } = await supabase
    .from("conversions")
    .select("product_id, reward_received")
    .gte("converted_at", `${yesterdayStr}T00:00:00`)
    .lt("converted_at", `${yesterdayStr}T23:59:59`)
    .eq("status", "approved");

  if (convError) {
    console.error("コンバージョン集計エラー:", convError.message);
    return;
  }

  // 商品別の成約数・売上
  const conversionStats = {};
  for (const conv of conversions || []) {
    if (!conversionStats[conv.product_id]) {
      conversionStats[conv.product_id] = { count: 0, revenue: 0 };
    }
    conversionStats[conv.product_id].count += 1;
    conversionStats[conv.product_id].revenue += conv.reward_received || 0;
  }

  // 結果をログ出力
  console.log(`\n集計日: ${yesterdayStr}`);
  console.log(`総クリック数: ${clicks?.length || 0}`);
  console.log(`総コンバージョン数: ${conversions?.length || 0}`);
  console.log("\n--- 商品別集計 ---");

  const allProductIds = new Set([
    ...Object.keys(clickCounts),
    ...Object.keys(conversionStats),
  ]);

  for (const pid of allProductIds) {
    const c = clickCounts[pid] || 0;
    const cv = conversionStats[pid]?.count || 0;
    const rev = conversionStats[pid]?.revenue || 0;
    const rate = c > 0 ? ((cv / c) * 100).toFixed(1) : "0.0";

    console.log(
      `商品ID ${pid}: クリック${c}件 / 成約${cv}件 (${rate}%) / 売上${rev}円`
    );
  }

  console.log("\n=== 日次統計集計を完了 ===");
}

aggregateStats().catch(console.error);

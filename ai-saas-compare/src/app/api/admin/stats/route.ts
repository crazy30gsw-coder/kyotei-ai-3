import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { initialProducts } from "@/data/products";

// 管理用統計API
// GET /api/admin/stats?period=30d
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") ?? "30d";

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseKey) {
      // Supabase未設定時はデモデータを返す
      return NextResponse.json(getDemoStats());
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 期間の開始日を計算
    let startDate: string | null = null;
    if (period === "7d") {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      startDate = d.toISOString();
    } else if (period === "30d") {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      startDate = d.toISOString();
    }

    // クリック数を集計
    let clickQuery = supabase.from("clicks").select("product_id");
    if (startDate) {
      clickQuery = clickQuery.gte("clicked_at", startDate);
    }
    const { data: clicksData } = await clickQuery;
    const clicks = (clicksData ?? []) as Array<{ product_id: number }>;

    // コンバージョンを集計
    let convQuery = supabase
      .from("conversions")
      .select("product_id, reward_received")
      .eq("status", "approved");
    if (startDate) {
      convQuery = convQuery.gte("converted_at", startDate);
    }
    const { data: convsData } = await convQuery;
    const conversions = (convsData ?? []) as Array<{
      product_id: number;
      reward_received: number;
    }>;

    // 商品情報を取得
    const { data: productsData } = await supabase
      .from("products")
      .select("id, name");
    const products = (productsData ?? []) as Array<{
      id: number;
      name: string;
    }>;

    const productMap: Record<number, string> = {};
    const source = products.length > 0 ? products : initialProducts;
    for (const p of source) {
      productMap[p.id] = p.name;
    }

    // 商品別に集計
    const clickCounts: Record<number, number> = {};
    for (const c of clicks) {
      clickCounts[c.product_id] = (clickCounts[c.product_id] ?? 0) + 1;
    }

    const convCounts: Record<number, { count: number; revenue: number }> = {};
    for (const cv of conversions) {
      if (!convCounts[cv.product_id]) {
        convCounts[cv.product_id] = { count: 0, revenue: 0 };
      }
      convCounts[cv.product_id].count += 1;
      convCounts[cv.product_id].revenue += cv.reward_received ?? 0;
    }

    const totalClicks = clicks.length;
    const totalConversions = conversions.length;
    const totalRevenue = Object.values(convCounts).reduce(
      (sum, v) => sum + v.revenue,
      0
    );

    const productIds = new Set([
      ...Object.keys(clickCounts).map(Number),
      ...Object.keys(convCounts).map(Number),
    ]);

    const productStats = Array.from(productIds).map((pid) => {
      const pidClicks = clickCounts[pid] ?? 0;
      const conv = convCounts[pid]?.count ?? 0;
      const revenue = convCounts[pid]?.revenue ?? 0;
      return {
        product_id: pid,
        product_name: productMap[pid] ?? `商品${pid}`,
        clicks: pidClicks,
        conversions: conv,
        revenue,
        conversion_rate: pidClicks > 0 ? (conv / pidClicks) * 100 : 0,
      };
    });

    // 売上順にソート
    productStats.sort((a, b) => b.revenue - a.revenue);

    return NextResponse.json({
      totalClicks,
      totalConversions,
      totalRevenue,
      conversionRate:
        totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0,
      productStats,
    });
  } catch (error) {
    console.error("統計API エラー:", error);
    return NextResponse.json(getDemoStats());
  }
}

// デモ用統計データ（Supabase未接続時）
function getDemoStats() {
  return {
    totalClicks: 0,
    totalConversions: 0,
    totalRevenue: 0,
    conversionRate: 0,
    productStats: [],
  };
}

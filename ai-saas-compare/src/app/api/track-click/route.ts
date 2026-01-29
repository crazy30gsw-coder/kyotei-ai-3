import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { initialProducts } from "@/data/products";

// クリック計測API
// POST /api/track-click
// Body: { product_id: number, tracking_id: string, referer: string }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product_id, tracking_id, referer } = body;

    if (!product_id || !tracking_id) {
      return NextResponse.json(
        { error: "product_id と tracking_id は必須です" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") ?? "";

    // Supabase接続がある場合はクリックを記録
    const supabase = getSupabase();
    if (supabase) {
      await supabase.from("clicks").insert({
        product_id,
        tracking_id,
        user_agent: userAgent,
        referer: referer ?? "",
      });
    }

    // 対象商品のアフィリエイトURLを返す
    let affiliateUrl = "#";

    if (supabase) {
      const { data } = await supabase
        .from("products")
        .select("affiliate_url")
        .eq("id", product_id)
        .single();

      if (data?.affiliate_url) {
        affiliateUrl = data.affiliate_url as string;
      }
    }

    // Supabase未接続 or データ取得失敗時はフォールバック
    if (affiliateUrl === "#") {
      const fallback = initialProducts.find((p) => p.id === product_id);
      if (fallback) {
        affiliateUrl = fallback.affiliate_url;
      }
    }

    return NextResponse.json({
      success: true,
      redirect_url: affiliateUrl,
      tracking_id,
    });
  } catch (error) {
    console.error("トラッキングエラー:", error);
    return NextResponse.json(
      { error: "トラッキングの記録に失敗しました" },
      { status: 500 }
    );
  }
}

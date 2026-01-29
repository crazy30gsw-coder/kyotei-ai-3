import { NextRequest, NextResponse } from "next/server";
import { getProductsByIntent, getProducts } from "@/lib/products";

// 商品一覧取得API
// GET /api/products?intent=speed
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const intent = searchParams.get("intent") ?? "overall";

    const products = await getProductsByIntent(intent);

    return NextResponse.json({
      intent,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("商品取得エラー:", error);
    // エラー時はフォールバックデータ
    const products = await getProducts();
    return NextResponse.json({
      intent: "overall",
      count: products.length,
      products,
    });
  }
}

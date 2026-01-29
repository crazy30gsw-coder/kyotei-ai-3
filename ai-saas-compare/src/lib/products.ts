import { getSupabase } from "@/lib/supabase";
import { initialProducts, sortProductsByIntent } from "@/data/products";
import type { Product } from "@/types/database";

// 全商品を取得（Supabase接続失敗時はフォールバックデータを使用）
export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      // Supabase未設定の場合はフォールバックデータ
      return initialProducts;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("overall_score", { ascending: false });

    if (error || !data || data.length === 0) {
      return initialProducts;
    }

    return data as Product[];
  } catch {
    return initialProducts;
  }
}

// intent別にソートされた商品を取得
export async function getProductsByIntent(intent: string): Promise<Product[]> {
  const products = await getProducts();
  return sortProductsByIntent(products, intent);
}

// slugで商品を取得
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

// IDで商品を取得
export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => ids.includes(p.id));
}

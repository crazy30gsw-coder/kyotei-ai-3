import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

interface PageProps {
  params: { slug: string };
}

// 静的パス生成
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// 動的メタデータ
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: "商品が見つかりません" };

  return {
    title: `${product.name}の評判・料金・特徴を徹底レビュー`,
    description: `${product.name}を実際に使って徹底レビュー。料金プラン、メリット・デメリット、他のAIツールとの比較を詳しく解説。${product.price_monthly ? `月額${product.price_monthly.toLocaleString()}円` : "無料プランあり"}。`,
    openGraph: {
      title: `${product.name}の評判・料金・特徴を徹底レビュー`,
      description: product.description,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  // 同じカテゴリの他商品（比較用）
  const relatedProducts = allProducts.filter((p) => p.id !== product.id);

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}

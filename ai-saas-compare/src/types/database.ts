// Supabaseデータベースの型定義
export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, "id" | "updated_at">;
        Update: Partial<Omit<Product, "id">>;
      };
      clicks: {
        Row: Click;
        Insert: Omit<Click, "id" | "clicked_at">;
        Update: Partial<Omit<Click, "id">>;
      };
      conversions: {
        Row: Conversion;
        Insert: Omit<Conversion, "id">;
        Update: Partial<Omit<Conversion, "id">>;
      };
    };
    Functions: {
      calculate_conversion_rates: {
        Args: Record<string, never>;
        Returns: ConversionRate[];
      };
    };
  };
}

// 商品データの型
export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  description: string;
  price_monthly: number | null;
  price_yearly: number | null;
  free_plan: boolean;
  affiliate_url: string;
  reward_amount: number;
  official_url: string;
  image_url: string;
  logo_emoji: string;
  features: string[];
  pros: string[];
  cons: string[];
  speed_score: number;
  quality_score: number;
  price_score: number;
  beginner_score: number;
  overall_score: number;
  updated_at: string;
}

// クリックデータの型
export interface Click {
  id: number;
  product_id: number;
  tracking_id: string;
  user_agent: string;
  referer: string;
  clicked_at: string;
}

// コンバージョンデータの型
export interface Conversion {
  id: number;
  click_id: number;
  product_id: number;
  converted_at: string;
  reward_received: number;
  status: "pending" | "approved" | "rejected";
}

// コンバージョン率集計結果の型
export interface ConversionRate {
  product_id: number;
  product_name: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

// ランキングの意図（intent）の型
export type RankingIntent = "overall" | "speed" | "price" | "quality" | "beginner";

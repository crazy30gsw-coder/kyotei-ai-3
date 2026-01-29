"use client";

import { useEffect, useState } from "react";

interface DashboardStats {
  totalClicks: number;
  totalConversions: number;
  totalRevenue: number;
  conversionRate: number;
  productStats: ProductStat[];
}

interface ProductStat {
  product_id: number;
  product_name: string;
  clicks: number;
  conversions: number;
  revenue: number;
  conversion_rate: number;
}

export default function AdminDashboardClient() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "all">("30d");

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/stats?period=${period}`);
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("統計データ取得エラー:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [period]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">収益ダッシュボード</h2>

      {/* 期間選択 */}
      <div className="flex gap-2 mb-6">
        {(["7d", "30d", "all"] as const).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              period === p
                ? "bg-blue-600 text-white"
                : "bg-white border text-gray-700 hover:bg-gray-50"
            }`}
          >
            {p === "7d" ? "7日間" : p === "30d" ? "30日間" : "全期間"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">読み込み中...</div>
      ) : stats ? (
        <>
          {/* サマリーカード */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">合計クリック数</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalClicks.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">合計コンバージョン</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalConversions.toLocaleString()}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">成約率</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.conversionRate.toFixed(1)}%
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <p className="text-sm text-gray-500">合計売上</p>
              <p className="text-3xl font-bold text-orange-600">
                ¥{stats.totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* 商品別テーブル */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-bold">商品別パフォーマンス</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-4">商品名</th>
                    <th className="text-right p-4">クリック数</th>
                    <th className="text-right p-4">成約数</th>
                    <th className="text-right p-4">成約率</th>
                    <th className="text-right p-4">売上</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.productStats.map((row) => (
                    <tr key={row.product_id} className="border-t">
                      <td className="p-4 font-medium">
                        {row.product_name}
                      </td>
                      <td className="p-4 text-right">
                        {row.clicks.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        {row.conversions.toLocaleString()}
                      </td>
                      <td className="p-4 text-right">
                        {row.conversion_rate.toFixed(1)}%
                      </td>
                      <td className="p-4 text-right font-medium">
                        ¥{row.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h3 className="font-bold mb-4">ダッシュボードの初期設定</h3>
          <p className="text-sm text-gray-600 mb-4">
            統計データを表示するには、Supabaseの設定が必要です。
          </p>
          <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
            <li>
              Supabaseプロジェクトを作成し、
              <code className="bg-gray-100 px-1 rounded">.env.local</code>
              に環境変数を設定
            </li>
            <li>
              <code className="bg-gray-100 px-1 rounded">
                supabase/schema.sql
              </code>
              を実行してテーブルを作成
            </li>
            <li>サイトにアクセスがあるとクリックデータが蓄積されます</li>
            <li>
              コンバージョンはASPからの成果通知後に手動で
              <code className="bg-gray-100 px-1 rounded">conversions</code>
              テーブルに記録
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

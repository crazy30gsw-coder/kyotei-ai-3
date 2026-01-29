import type { Metadata } from "next";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata: Metadata = {
  title: "管理ダッシュボード",
  robots: { index: false, follow: false },
};

// 管理ダッシュボードページ（noindex設定済み）
export default function AdminDashboardPage() {
  return <AdminDashboardClient />;
}

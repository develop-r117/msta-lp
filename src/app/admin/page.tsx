import type { Metadata } from "next";
import AdminApp from "./admin-app";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "コンテンツ管理 | エムスタ",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminApp />;
}

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "プライバシーポリシー",
  description:
    "エムスタ（MS Studio / 株式会社R117）のプライバシーポリシー。個人情報の取り扱い・利用目的・第三者提供・お問い合わせ窓口についてご案内します。",
  path: "/privacy",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "特定商取引法に基づく表記",
  description:
    "エムスタ（MS Studio / 株式会社R117）の特定商取引法に基づく表記。事業者名・所在地・販売価格・支払方法・解約条件などを記載しています。",
  path: "/commercial",
});

export default function CommercialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

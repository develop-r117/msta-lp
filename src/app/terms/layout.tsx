import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "利用規約",
  description:
    "エムスタ（MS Studio / 株式会社R117）の利用規約。本サービスのご利用条件についてご案内します。",
  path: "/terms",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

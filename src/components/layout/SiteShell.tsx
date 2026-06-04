import { type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BottomCTA from "./BottomCTA";
import Breadcrumb, { type BreadcrumbItem } from "./Breadcrumb";

type Props = {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  audience?: "general" | "agency" | "both";
  bottomCtaTitle?: string;
  bottomCtaDescription?: string;
  hideBottomCTA?: boolean;
};

/**
 * 全下層ページの共通シェル。Header / Breadcrumb / main / BottomCTA / Footer を内包。
 */
export default function SiteShell({
  children,
  breadcrumbs,
  audience = "both",
  bottomCtaTitle,
  bottomCtaDescription,
  hideBottomCTA,
}: Props) {
  return (
    <>
      <Header />
      {breadcrumbs ? <Breadcrumb items={breadcrumbs} /> : null}
      <main>{children}</main>
      {hideBottomCTA ? null : (
        <BottomCTA audience={audience} title={bottomCtaTitle} description={bottomCtaDescription} />
      )}
      <Footer />
    </>
  );
}

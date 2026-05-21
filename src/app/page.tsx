import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/layout/FloatingCTA";
import BottomCTA from "@/components/layout/BottomCTA";

import Hero from "@/components/sections/Hero";
import Intro3 from "@/components/sections/Intro3";
import About from "@/components/sections/About";
import { TwoPathSplit, ProductGrid, PartnerStrip, ServiceMix } from "@/components/sections/HomeDigest";
import Pricing from "@/components/sections/Pricing";
import Cases from "@/components/sections/Cases";
import FAQ from "@/components/sections/FAQ";
import { fetchCases } from "@/lib/microcms";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 60;

export const metadata = buildMetadata({
  title: "エムスタ - 真のノーコード × 最強CMS",
  description:
    "アプリ制作・運用・改善・収益化までを一つの場所で。Webアプリ・iOS・Android対応、CMS標準搭載の次世代型アプリ制作プラットフォーム。2週間無料トライアル / 初期費用0円。",
  path: "/",
});

export default async function Home() {
  const cases = await fetchCases({ limit: 6 });
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro3 />
        <TwoPathSplit />
        <About />
        <ProductGrid />
        <ServiceMix />
        <PartnerStrip />
        <Pricing />
        <Cases initialCases={cases} />
        <FAQ />
      </main>
      <BottomCTA audience="both" />
      <Footer />
      <FloatingCTA />
    </>
  );
}

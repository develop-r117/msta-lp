import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Problems from "@/components/Problems";
import Features from "@/components/Features";
import OperationModes from "@/components/OperationModes";
import Support from "@/components/Support";
import Cases from "@/components/Cases";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTAMessage from "@/components/CTAMessage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Problems />
        <Features />
        <OperationModes />
        <Support />
        <Cases />
        <Pricing />
        <FAQ />
        <CTAMessage />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}

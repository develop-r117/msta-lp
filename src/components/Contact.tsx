"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Load Spir widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.spirinc.com/js/external/iframe.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600" />
      
      {/* Mesh overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="contact-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      {/* Floating shapes */}
      <motion.div
        animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur"
      />
      <motion.div
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white/10 backdrop-blur"
      />
      <motion.div
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-20 w-16 h-16 rounded-xl bg-accent-400/20 backdrop-blur"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-white text-center lg:text-left"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm font-semibold mb-6"
            >
              CONTACT
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              まずは<span className="text-accent-300">お気軽に</span>
              <br />
              ご相談ください
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
              エムスタでは、アプリの<strong>企画・開発・運用</strong>までを一気通貫でサポート。
              事業者様が「本来の価値提供に集中できる環境」をつくることを大切にしています。
            </p>

            {/* Examples */}
            <div className="space-y-3 mb-8">
              {[
                "「今使っているアプリの後継が必要…」",
                "「運用しやすいアプリが欲しい」",
                "「うちの業種でも導入できる?」",
              ].map((example, index) => (
                <motion.div
                  key={example}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="text-sm">💬</span>
                  </div>
                  <span className="text-white/90 text-left">{example}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
              そんなお悩みやご相談からでも大歓迎です。<br />
              まずは現在の状況をヒアリングし、<strong>最適なプランをご提案</strong>いたします。
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {[
                "導入から運用まで専任チームがサポート",
                "お客様の業種・用途に合わせたご提案",
                "最短14日でリリース可能",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-400 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-8 border-t border-white/20"
            >
              <p className="text-sm text-white/60 mb-4">お問い合わせ</p>
              <a 
                href="mailto:info@msta-app.com" 
                className="text-white font-semibold hover:text-accent-300 transition-colors"
              >
                info@msta-app.com
              </a>
            </motion.div>
          </motion.div>

          {/* Right - Spir Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                導入相談・サービス説明のご予約
              </h3>
              <p className="text-sm text-neutral-600">
                ご都合の良い日時をお選びください
              </p>
            </div>
            
            {/* Spir Embed Widget */}
            <div 
              className="spir-widget" 
              data-url="https://app.spirinc.com/external/teams/qv5Ja4Ok-UwGc1wXPQ3S5/availability-sharings/d4ApACwngUerSflItxt_g/confirm" 
              style={{ minWidth: "320px", height: "600px" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}


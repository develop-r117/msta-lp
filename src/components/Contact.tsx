"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const industries = [
  "飲食店",
  "美容院・サロン",
  "病院・クリニック",
  "スポーツジム・フィットネス",
  "スクール・教室",
  "コミュニティ・サークル",
  "小規模小売店",
  "その他",
];

const interests = [
  "プッシュ通知",
  "チャット",
  "スタンプ・クーポン",
  "予約システム",
  "EC機能",
  "その他",
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
              GET STARTED
            </motion.span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              まずは<span className="text-accent-300">無料</span>で
              <br />
              お試しください
            </h2>

            <p className="text-lg text-white/80 mb-8 max-w-md mx-auto lg:mx-0">
              14日間の無料トライアル実施中。
              <br />
              今すぐ始めましょう。
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "クレジットカード不要",
                "14日間全機能利用可能",
                "専任スタッフがサポート",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 justify-center lg:justify-start"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <p className="text-sm text-white/60 mb-4">ご安心ください</p>
              <div className="flex justify-center lg:justify-start gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">🔒</div>
                  <div className="text-xs text-white/60 mt-1">SSL暗号化</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">📋</div>
                  <div className="text-xs text-white/60 mt-1">プライバシー保護</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">⏱️</div>
                  <div className="text-xs text-white/60 mt-1">48時間以内回答</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6"
                >
                  <svg className="w-10 h-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  お問い合わせありがとうございます
                </h3>
                <p className="text-neutral-600">
                  48時間以内にご連絡いたします。
                  <br />
                  しばらくお待ちください。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
                <div className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      お名前 <span className="text-accent-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="山田 太郎"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      会社名・店舗名
                    </label>
                    <input
                      type="text"
                      placeholder="株式会社〇〇"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        メールアドレス <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">
                        電話番号 <span className="text-accent-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="090-1234-5678"
                        className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      業種 <span className="text-accent-500">*</span>
                    </label>
                    <select
                      required
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors appearance-none bg-white"
                    >
                      <option value="">選択してください</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-3">
                      ご関心のある機能
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          type="button"
                          onClick={() => toggleInterest(interest)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedInterests.includes(interest)
                              ? "bg-primary-100 text-primary-700 border-2 border-primary-300"
                              : "bg-neutral-100 text-neutral-600 border-2 border-transparent hover:bg-neutral-200"
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-2">
                      お問い合わせ内容
                    </label>
                    <textarea
                      rows={3}
                      placeholder="ご質問やご要望がございましたら、お気軽にお書きください。"
                      className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:border-primary-500 focus:ring-0 transition-colors resize-none"
                    />
                  </div>

                  {/* Privacy Policy */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      className="w-5 h-5 rounded border-2 border-neutral-300 text-primary-600 focus:ring-primary-500 mt-0.5"
                    />
                    <span className="text-sm text-neutral-600">
                      <a href="#" className="text-primary-600 hover:underline">プライバシーポリシー</a>
                      に同意します
                    </span>
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        送信中...
                      </span>
                    ) : (
                      "無料トライアルを始める"
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


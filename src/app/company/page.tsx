"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Company() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>トップページに戻る</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">会社概要</h1>
          
          {/* Company Info Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden mb-12">
            <table className="w-full">
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <th className="px-6 py-4 bg-neutral-50 text-left text-sm font-semibold text-neutral-700 w-1/3">運営会社</th>
                  <td className="px-6 py-4 text-neutral-900">株式会社R117</td>
                </tr>
                <tr>
                  <th className="px-6 py-4 bg-neutral-50 text-left text-sm font-semibold text-neutral-700">所在地</th>
                  <td className="px-6 py-4 text-neutral-900">
                    〒450-0002<br />
                    愛知県名古屋市中村区名駅5-2-17<br />
                    フロンティア名駅13F
                  </td>
                </tr>
                <tr>
                  <th className="px-6 py-4 bg-neutral-50 text-left text-sm font-semibold text-neutral-700">事業内容</th>
                  <td className="px-6 py-4 text-neutral-900">
                    <ul className="space-y-2">
                      <li>• MS Studio（エムスタ）の企画開発・運営<br />
                        <span className="text-sm text-neutral-500 ml-3">（アプリ開発プラットフォーム / 管理・運用CMS）</span>
                      </li>
                      <li>• 洗車事業者特化型SaaSプロダクト『WashLink』の企画開発・運営</li>
                      <li>• モバイルアプリ企画開発チーム MS HOLDINGSの運営</li>
                      <li>• アプリ・Web受託開発</li>
                      <li>• マーケティング広報支援</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th className="px-6 py-4 bg-neutral-50 text-left text-sm font-semibold text-neutral-700">お問い合わせ</th>
                  <td className="px-6 py-4 text-neutral-900">
                    <a href="mailto:info@msta-app.com" className="text-primary-600 hover:text-primary-700 transition-colors">
                      info@msta-app.com
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                  MISSION
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6 leading-relaxed">
                  「可能性を発掘し可能性を磨く。<br />
                  事業を通じて社会に新たな価値を創造する」
                </h2>
                <p className="text-neutral-600 leading-relaxed max-w-2xl mx-auto">
                  私たちは、人や事業（サービス）の「まだ見ぬ可能性」を発掘し、
                  プロダクトを通じて価値へと磨き上げることで、
                  自己実現へと導く架け橋になります。
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-2xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all hover:scale-105"
            >
              <span>お問い合わせ</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}


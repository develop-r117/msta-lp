"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-8">プライバシーポリシー</h1>
          
          <div className="prose prose-neutral max-w-none">
            <p className="text-neutral-600 mb-8">
              株式会社R117（以下「当社」といいます）は、MS Studio（エムスタ）サービス（以下「本サービス」といいます）において、
              お客様の個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第1条（個人情報の定義）</h2>
              <p className="text-neutral-600">
                「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、
                当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報、
                及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報
                （個人識別情報）を指します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第2条（個人情報の収集方法）</h2>
              <p className="text-neutral-600">
                当社は、お客様が利用登録をする際に氏名、メールアドレス、電話番号、会社名などの個人情報をお尋ねすることがあります。
                また、お客様と提携先などとの間でなされた取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先などを含みます。
                以下「提携先」といいます）などから収集することがあります。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第3条（個人情報を収集・利用する目的）</h2>
              <p className="text-neutral-600 mb-4">当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>本サービスの提供・運営のため</li>
                <li>お客様からのお問い合わせに回答するため</li>
                <li>お客様が利用中のサービスの新機能、更新情報、キャンペーン等のご案内のため</li>
                <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                <li>利用規約に違反したお客様や、不正・不当な目的でサービスを利用しようとするお客様の特定をし、ご利用をお断りするため</li>
                <li>お客様にご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                <li>有料サービスにおいて、お客様に利用料金を請求するため</li>
                <li>上記の利用目的に付随する目的</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第4条（利用目的の変更）</h2>
              <p className="text-neutral-600">
                当社は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
                利用目的の変更を行った場合には、変更後の目的について、当社所定の方法により、お客様に通知し、または本ウェブサイト上に公表するものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第5条（個人情報の第三者提供）</h2>
              <p className="text-neutral-600 mb-4">
                当社は、次に掲げる場合を除いて、あらかじめお客様の同意を得ることなく、第三者に個人情報を提供することはありません。
                ただし、個人情報保護法その他の法令で認められる場合を除きます。
              </p>
              <ul className="list-disc pl-6 text-neutral-600 space-y-2">
                <li>人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき</li>
                <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第6条（個人情報の開示）</h2>
              <p className="text-neutral-600">
                当社は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。
                ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、
                開示しない決定をした場合には、その旨を遅滞なく通知します。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第7条（個人情報の訂正および削除）</h2>
              <p className="text-neutral-600">
                お客様は、当社の保有する自己の個人情報が誤った情報である場合には、当社が定める手続きにより、
                当社に対して個人情報の訂正、追加または削除（以下「訂正等」といいます）を請求することができます。
                当社は、お客様から前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、
                当該個人情報の訂正等を行うものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第8条（個人情報の利用停止等）</h2>
              <p className="text-neutral-600">
                当社は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、
                または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下「利用停止等」といいます）を
                求められた場合には、遅滞なく必要な調査を行います。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第9条（プライバシーポリシーの変更）</h2>
              <p className="text-neutral-600">
                本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、お客様に通知することなく、
                変更することができるものとします。当社が別途定める場合を除いて、変更後のプライバシーポリシーは、
                本ウェブサイトに掲載したときから効力を生じるものとします。
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">第10条（お問い合わせ窓口）</h2>
              <p className="text-neutral-600">
                本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。
              </p>
              <div className="mt-4 p-4 bg-neutral-100 rounded-lg">
                <p className="text-neutral-700">
                  <strong>株式会社R117</strong><br />
                  〒450-0002 愛知県名古屋市中村区名駅5-2-17 フロンティア名駅13F<br />
                  メール: info@msta-app.com
                </p>
              </div>
            </section>

            <p className="text-neutral-500 text-sm mt-12">
              制定日: 2025年1月1日<br />
              最終更新日: 2025年1月1日
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}


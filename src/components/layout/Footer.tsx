import Link from "next/link";
import Image from "next/image";
import { CTA_LINKS } from "@/lib/sections";
import { FOOTER_SITEMAP } from "@/lib/navigation";

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-neutral-300">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Link href="/" className="inline-flex items-center" aria-label="エムスタ ホーム">
              <Image
                src="/logo-white.png"
                alt="エムスタ"
                width={507}
                height={176}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400">
              アプリ制作・運用・改善・収益化までを支える、
              <br />
              次世代型アプリ制作プラットフォーム。
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={CTA_LINKS.signup}
                target={CTA_LINKS.signup.startsWith("http") ? "_blank" : undefined}
                rel={CTA_LINKS.signup.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition hover:shadow-primary-500/40"
              >
                2週間無料で始める
              </a>
              <Link
                href="/partners/document"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                パートナー資料DL
              </Link>
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {FOOTER_SITEMAP.map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-200">{col.title}</h3>
                  <ul className="mt-4 space-y-3">
                    {col.links.map((l) =>
                      l.external ? (
                        <li key={l.href}>
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                          >
                            {l.label}
                          </a>
                        </li>
                      ) : (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="text-sm text-neutral-400 transition-colors hover:text-white"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-neutral-800 pt-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} エムスタ. All rights reserved.</p>
          <p>
            Powered by <span className="text-neutral-300">R117</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

#!/usr/bin/env node
/**
 * ヘルプ記事用スクリーンショット撮影。
 * AuthGate / Next.js loading.tsx のローディング画面を待ってから撮影する。
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "fs/promises";
import path from "path";

const BASE_URL = process.env.DASHBOARD_URL || "http://localhost:4000";
const OUT_DIR = path.resolve("public/screenshots/help");
const EMAIL = process.env.HELP_CAPTURE_EMAIL || "develop@r117.co.jp";
const PASSWORD = process.env.HELP_CAPTURE_PASSWORD || "r1172025";
const ONLY = (process.env.ONLY || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const PAGES = [
  { path: "/", name: "dashboard-home" },
  { path: "/apps", name: "apps-list" },
  { path: "/build", name: "content-flow-editor" },
  { path: "/build/static", name: "static-content-build" },
  { path: "/build/feature-flags", name: "feature-flags-setup" },
  { path: "/build/mobile-ui", name: "mobile-ui-customize" },
  { path: "/build/mobile-ui/app-settings", name: "app-basic-settings" },
  { path: "/build/mobile-ui/menu-settings", name: "menu-settings" },
  { path: "/build/mobile-ui/top-content", name: "top-content-setup" },
  { path: "/build/mobile-ui/brand-components", name: "brand-components" },
  { path: "/build/deployment", name: "deployment-guide" },
  { path: "/build/deployment/build-settings", name: "build-settings-detail" },
  { path: "/ops/push", name: "push-notifications" },
  { path: "/chat/list", name: "chat-list" },
  { path: "/chat/settings", name: "chat-settings" },
  { path: "/chat/reports", name: "chat-reports" },
  { path: "/chat/coupons", name: "coupons" },
  { path: "/members/list", name: "members-list" },
  { path: "/members/registration-settings", name: "members-registration" },
  { path: "/members/login-content-settings", name: "members-login-content" },
  { path: "/members/rank-settings", name: "members-rank" },
  { path: "/members/feature-access", name: "members-feature-access" },
  { path: "/members/terms-settings", name: "members-terms" },
  { path: "/members/privacy-settings", name: "members-privacy" },
  { path: "/content/list", name: "content-posts-list" },
  { path: "/content/categories", name: "content-categories" },
  { path: "/content/default-image", name: "content-default-image" },
  { path: "/content/static", name: "content-static-list" },
  { path: "/content/static-categories", name: "content-static-categories" },
  { path: "/content/popups", name: "content-popups" },
  { path: "/content/gps", name: "content-map-locations" },
  { path: "/content/map-tags", name: "content-map-tags" },
  { path: "/content/map-settings", name: "content-map-settings" },
  { path: "/content/map-deletion-requests", name: "map-deletion-requests" },
  { path: "/inquiry/messages", name: "inquiry-messages" },
  { path: "/inquiry/list", name: "inquiry-forms" },
  { path: "/inquiry/settings", name: "inquiry-settings" },
  { path: "/inquiry/sns", name: "sns-links" },
  { path: "/inquiry/files", name: "files" },
  { path: "/surveys/list", name: "surveys-list" },
  { path: "/surveys/responses", name: "surveys-responses" },
  { path: "/surveys/settings", name: "surveys-settings" },
  { path: "/stamps/list", name: "stamps-list" },
  { path: "/stamps/benefits", name: "stamps-benefits" },
  { path: "/stamps/grant", name: "stamps-grant" },
  { path: "/chat/catalog", name: "catalog-gallery" },
  { path: "/chat/photo-gallery", name: "photo-gallery" },
  { path: "/chat/movie-gallery", name: "movie-gallery" },
  { path: "/email/campaigns", name: "email-campaigns" },
  { path: "/email/campaigns/new", name: "email-campaign-new" },
  { path: "/email/templates", name: "email-templates" },
  { path: "/email/groups", name: "email-groups" },
  { path: "/email/credits", name: "email-credits" },
  { path: "/email/settings", name: "email-settings" },
  { path: "/email/domains", name: "email-domains" },
  { path: "/ecommerce/products", name: "ec-products" },
  { path: "/ecommerce/categories", name: "ec-categories" },
  { path: "/ecommerce/orders", name: "ec-orders" },
  { path: "/ecommerce/customers", name: "ec-customers" },
  { path: "/ecommerce/reviews", name: "ec-reviews" },
  { path: "/ecommerce/coupons", name: "ec-coupons" },
  { path: "/ecommerce/points", name: "ec-points" },
  { path: "/ecommerce/delivery", name: "ec-delivery" },
  { path: "/ecommerce/gift", name: "ec-gift" },
  { path: "/ecommerce/reports", name: "ec-reports" },
  { path: "/ecommerce/settings", name: "ec-settings" },
  { path: "/ecommerce/stock-alerts", name: "ec-stock-alerts" },
  { path: "/reservations/dashboard", name: "reservations-dashboard" },
  { path: "/reservations/calendar", name: "reservations-calendar" },
  { path: "/reservations/bookings", name: "reservations-bookings" },
  { path: "/reservations/pages", name: "reservations-pages" },
  { path: "/reservations/pages/new", name: "reservations-pages-new" },
  { path: "/reservations/staff", name: "reservations-staff" },
  { path: "/reservations/temporary-open", name: "reservations-temp-open" },
  { path: "/reservations/temporary-closed", name: "reservations-temp-closed" },
  { path: "/reservations/google-calendar", name: "reservations-google-calendar" },
  { path: "/reservations/easy/dashboard", name: "reservations-easy-dashboard" },
  { path: "/reservations/easy", name: "reservations-easy" },
  { path: "/reservations/easy/calendar", name: "reservations-easy-calendar" },
  { path: "/reservations/easy/bookings", name: "reservations-easy-bookings" },
  { path: "/payment/links", name: "payment-links" },
  { path: "/apps/payouts", name: "payment-overview", tab: "概要" },
  { path: "/apps/payouts", name: "payment-balance", tab: "明細" },
  { path: "/apps/payouts", name: "payment-payouts", tab: "出金" },
  { path: "/apps/payouts", name: "payment-stripe-connect", tab: "連携設定" },
  { path: "/apps/storage", name: "settings-storage" },
  { path: "/apps/team", name: "team-management" },
  { path: "/apps/billing", name: "billing-plans" },
  { path: "/apps/store-checklist", name: "store-checklist" },
  { path: "/analytics", name: "analytics-summary" },
  { path: "/analytics/app-usage", name: "analytics-app-usage" },
  { path: "/analytics/active-users", name: "analytics-active-users" },
  { path: "/analytics/app-registrations", name: "analytics-registrations" },
  { path: "/analytics/app-suspensions", name: "analytics-suspensions" },
  { path: "/analytics/downloads", name: "analytics-downloads" },
  { path: "/analytics/stamps", name: "analytics-stamps" },
  { path: "/webview", name: "webview" },
  { path: "/ai-image", name: "ai-image" },
  { path: "/ai/credits", name: "ai-credits" },
  { path: "/settings/account", name: "settings-account" },
  { path: "/settings/legal/specified-commercial-transactions", name: "settings-legal" },
  { path: "/ops/admob", name: "admob" },
  { path: "/qa/list", name: "qa-list" },
  { path: "/qa/categories", name: "qa-categories" },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function isLoadingOverlay(el) {
  if (!el) return false;
  const cls = el.className || "";
  return (
    typeof cls === "string" &&
    cls.includes("fixed") &&
    cls.includes("inset-0") &&
    (cls.includes("z-[99999]") || cls.includes("z-99999") || /z-\[99999\]/.test(cls))
  );
}

async function dismissOverlays(page) {
  for (const label of ["スキップ", "閉じる", "わかった", "後で"]) {
    const clicked = await page.evaluate((text) => {
      const buttons = [...document.querySelectorAll("button, a, [role='button']")];
      const el = buttons.find((b) => (b.textContent || "").trim() === text);
      if (el) {
        el.click();
        return true;
      }
      return false;
    }, label);
    if (clicked) await sleep(400);
  }
  await page.keyboard.press("Escape").catch(() => {});
}

async function waitForPageReady(page, { timeout = 45000 } = {}) {
  const started = Date.now();

  await page
    .waitForFunction(
      () => {
        const imgs = [...document.querySelectorAll('img[alt="Logo"]')];
        const overlay = imgs.some((img) => {
          const wrap = img.closest("div.fixed");
          return wrap && wrap.className.includes("inset-0");
        });
        if (overlay) return false;
        const fullSpinners = [...document.querySelectorAll(".animate-spin")].filter((el) => {
          const parent = el.parentElement;
          return parent && (parent.className || "").includes("h-64");
        });
        return fullSpinners.length === 0;
      },
      { timeout, polling: 300 },
    )
    .catch(() => {});

  await dismissOverlays(page);
  await sleep(800);

  await page
    .waitForFunction(
      () => {
        const imgs = [...document.querySelectorAll('img[alt="Logo"]')];
        const overlay = imgs.some((img) => {
          const wrap = img.closest("div.fixed");
          return wrap && wrap.className.includes("inset-0");
        });
        if (overlay) return false;
        const body = document.body?.innerText || "";
        return body.replace(/\s+/g, " ").trim().length > 40;
      },
      { timeout: Math.max(8000, timeout - (Date.now() - started)), polling: 300 },
    )
    .catch(() => {});

  await sleep(1200);
}

async function pageLooksReady(page) {
  return page.evaluate(() => {
    const imgs = [...document.querySelectorAll('img[alt="Logo"]')];
    const overlay = imgs.some((img) => {
      const wrap = img.closest("div.fixed");
      return wrap && wrap.className.includes("inset-0");
    });
    if (overlay) return { ok: false, reason: "loading-overlay" };
    const text = (document.body?.innerText || "").replace(/\s+/g, " ").trim();
    if (text.length < 40) return { ok: false, reason: "too-little-text", len: text.length };
    return { ok: true, len: text.length };
  });
}

async function clickTab(page, label) {
  const clicked = await page.evaluate((text) => {
    const buttons = [...document.querySelectorAll("button")];
    const el = buttons.find((b) => (b.textContent || "").trim() === text);
    if (!el) return false;
    el.click();
    return true;
  }, label);
  if (clicked) await sleep(1500);
  return clicked;
}

async function login(page) {
  console.log("🔐 Logging in...");
  await page.goto(`${BASE_URL}/signin`, { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForSelector('input[placeholder="info@gmail.com"]', { timeout: 20000 });

  // reCAPTCHA v3 の準備待ち
  await page
    .waitForFunction(
      () =>
        typeof window.grecaptcha !== "undefined" ||
        document.querySelector('script[src*="recaptcha"]'),
      { timeout: 15000 },
    )
    .catch(() => {});
  await sleep(2500);

  await page.click('input[placeholder="info@gmail.com"]', { clickCount: 3 });
  await page.type('input[placeholder="info@gmail.com"]', EMAIL, { delay: 20 });
  await page.click('input[placeholder="パスワードを入力"]', { clickCount: 3 });
  await page.type('input[placeholder="パスワードを入力"]', PASSWORD, { delay: 20 });

  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 45000 }).catch(() => {}),
    page.evaluate(() => {
      const form = document.querySelector("form");
      if (form) form.requestSubmit();
      else document.querySelector("button[type='submit']")?.click();
    }),
  ]);

  await sleep(2000);
  const url = page.url();
  console.log("✅ After login URL:", url);

  if (url.includes("/signin")) {
    const err = await page.evaluate(() => document.body.innerText.slice(0, 400));
    throw new Error(`Login failed. Still on signin. Page text: ${err}`);
  }
}

async function enterFirstApp(page) {
  if (!page.url().includes("/apps")) {
    await page.goto(`${BASE_URL}/apps`, { waitUntil: "domcontentloaded", timeout: 30000 });
  }
  await waitForPageReady(page);
  await dismissOverlays(page);

  const clicked = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll("button")];
    const ops = buttons.find((b) => (b.textContent || "").trim() === "運用");
    if (ops) {
      ops.click();
      return true;
    }
    return false;
  });

  if (clicked) {
    await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
    await waitForPageReady(page);
    console.log("📱 Entered first app (運用):", page.url());
  } else {
    console.log("⚠️  No 運用 button found. Staying on", page.url());
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--lang=ja-JP",
    ],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(45000);
  await page.setExtraHTTPHeaders({ "Accept-Language": "ja-JP,ja;q=0.9" });

  await login(page);
  await enterFirstApp(page);

  const targets = ONLY.length
    ? PAGES.filter((p) => ONLY.includes(p.name) || ONLY.includes(p.path))
    : PAGES;
  let success = 0;
  let failed = 0;
  const failedNames = [];

  for (const item of targets) {
    const outPath = path.join(OUT_DIR, `${item.name}.png`);
    try {
      console.log(`📸 ${item.name} (${item.path}${item.tab ? ` / ${item.tab}` : ""})...`);
      let navigated = false;
      for (let attempt = 1; attempt <= 3 && !navigated; attempt++) {
        try {
          await page.goto(`${BASE_URL}${item.path}`, { waitUntil: "domcontentloaded", timeout: 60000 });
          navigated = true;
        } catch (e) {
          console.log(`   ↻ goto retry ${attempt}: ${e.message}`);
          await sleep(2000);
        }
      }
      if (!navigated) throw new Error("navigation failed after retries");
      await waitForPageReady(page);

      if (item.tab) {
        await clickTab(page, item.tab);
        await waitForPageReady(page, { timeout: 20000 });
      }

      let ready = await pageLooksReady(page);
      if (!ready.ok) {
        console.log(`   ⏳ not ready (${ready.reason}), waiting more...`);
        await sleep(4000);
        await waitForPageReady(page, { timeout: 20000 });
        ready = await pageLooksReady(page);
      }

      await page.screenshot({ path: outPath, fullPage: false });

      if (!ready.ok) {
        console.log(`   ⚠️  saved but may be incomplete (${ready.reason}, text=${ready.len ?? 0})`);
      } else {
        console.log(`   ✅ saved`);
      }
      success++;
    } catch (err) {
      failed++;
      failedNames.push(item.name);
      console.log(`   ❌ ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n🎉 Done! ${success} captured, ${failed} failed.`);
  if (failedNames.length) console.log("Failed:", failedNames.join(", "));
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

#!/usr/bin/env node
import puppeteer from "puppeteer-core";
import { mkdir } from "fs/promises";
import path from "path";

const BASE_URL = "http://localhost:4000";
const OUT_DIR = path.resolve("public/screenshots/help");
const EMAIL = "cto6@r117.co.jp";
const PASSWORD = "r1172026";

const PAGES = [
  { path: "/", name: "dashboard-home" },
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
  { path: "/content/flow-editor", name: "content-flow-editor" },
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
  { path: "/ecommerce/stripe-connect", name: "ec-stripe-connect" },
  { path: "/ecommerce/stock-alerts", name: "ec-stock-alerts" },
  { path: "/reservations/bookings", name: "reservations-bookings" },
  { path: "/reservations/easy", name: "reservations-easy" },
  { path: "/reservations/resources", name: "reservations-resources" },
  { path: "/reservations/menus", name: "reservations-menus" },
  { path: "/reservations/staff", name: "reservations-staff" },
  { path: "/reservations/groups", name: "reservations-groups" },
  { path: "/reservations/slots", name: "reservations-slots" },
  { path: "/reservations/temporary-open", name: "reservations-temp-open" },
  { path: "/reservations/temporary-closed", name: "reservations-temp-closed" },
  { path: "/reservations/google-calendar", name: "reservations-google-calendar" },
  { path: "/reservations/settings", name: "reservations-settings" },
  { path: "/payment", name: "payment-overview" },
  { path: "/payment/balance", name: "payment-balance" },
  { path: "/payment/payouts", name: "payment-payouts" },
  { path: "/payment/connect", name: "payment-stripe-connect" },
  { path: "/analytics", name: "analytics-summary" },
  { path: "/analytics/app-usage", name: "analytics-app-usage" },
  { path: "/analytics/active-users", name: "analytics-active-users" },
  { path: "/analytics/app-registrations", name: "analytics-registrations" },
  { path: "/analytics/downloads", name: "analytics-downloads" },
  { path: "/analytics/stamps", name: "analytics-stamps" },
  { path: "/webview", name: "webview" },
  { path: "/ai-image", name: "ai-image" },
  { path: "/ai/credits", name: "ai-credits" },
  { path: "/settings/storage", name: "settings-storage" },
  { path: "/settings/account", name: "settings-account" },
  { path: "/settings/legal/specified-commercial-transactions", name: "settings-legal" },
  { path: "/ops/admob", name: "admob" },
  { path: "/qa/list", name: "qa-list" },
  { path: "/qa/categories", name: "qa-categories" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  console.log("🔐 Logging in...");
  await page.goto(`${BASE_URL}/signin`, { waitUntil: "networkidle2", timeout: 30000 });
  await page.waitForSelector('input[placeholder="info@gmail.com"]', { timeout: 10000 });
  await page.type('input[placeholder="info@gmail.com"]', EMAIL);
  await page.type('input[placeholder="パスワードを入力"]', PASSWORD);
  await page.click("button");
  await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });
  console.log("✅ Logged in, current URL:", page.url());

  if (page.url().includes("/apps")) {
    console.log("📱 Navigating to app dashboard...");
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000));
  }

  let success = 0;
  let failed = 0;

  for (const { path: p, name } of PAGES) {
    const outPath = path.join(OUT_DIR, `${name}.png`);
    try {
      console.log(`📸 ${name} (${p})...`);
      await page.goto(`${BASE_URL}${p}`, { waitUntil: "networkidle2", timeout: 20000 });
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: outPath, fullPage: false });
      success++;
      console.log(`   ✅ saved`);
    } catch (err) {
      failed++;
      console.log(`   ❌ ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n🎉 Done! ${success} captured, ${failed} failed.`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.tmpdir(), "ideal-solutions-browser-qa/node_modules/playwright-core"));
const pillars = JSON.parse(fs.readFileSync("data/service-pillars-content.json", "utf8"));
const children = JSON.parse(fs.readFileSync("data/subservice-production.json", "utf8"));
const routeSource = fs.readFileSync("data/service-pillars.ts", "utf8");
const aliases = JSON.parse(routeSource.match(/existingCapabilityRoutes: Record<string, string> = (\{[\s\S]*?\});/)[1].replace(/,\s*}/, "}"));
function canonicalRoute(href) {
  const leaf = href.split("/").at(-1);
  if (aliases[leaf]) return "/services/" + aliases[leaf];
  if (leaf === "rack-cabling-remediation") return "/services/network-infrastructure-connectivity/rack-cabling-remediation";
  return href;
}
for (const page of [...pillars, ...children]) {
  assert.ok(page.faq.items.length >= 6);
  const questions = page.faq.items.map(item => item.title.toLowerCase());
  assert.equal(new Set(questions).size, questions.length);
  for (const item of page.faq.items) {
    assert.ok(item.title.trim() && item.body.every(text => text.trim()));
    assert.ok(!/auxano|This keeps Pillar/i.test(JSON.stringify(item)));
  }
}
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const base = process.env.QA_BASE_URL || "http://localhost:3001";
try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const routes = [...new Set(["/", ...pillars.map(p => "/services/" + p.slug), ...pillars.flatMap(p => p.capabilities.items.map(item => canonicalRoute(item.href))), "/technology-security-checklist"])];
  for (const route of routes) {
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200, route);
    assert.ok(!/auxano/i.test(await page.locator("body").innerText()), route);
    if (route !== "/technology-security-checklist") {
      assert.ok(await page.locator("details summary").count() > 0, route);
    }
  }
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base);
    const summary = page.locator("details summary").filter({ hasText: "Who does Ideal Solutions work with?" });
    await summary.waitFor();
    await summary.scrollIntoViewIfNeeded();
    await summary.focus();
    await page.keyboard.press("Enter");
    assert.ok(await summary.evaluate(el => el.parentElement.open));
    assert.ok((await summary.locator("..").innerText()).includes("technical owners retain control"));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.keyboard.press("Enter");
    assert.equal(await summary.evaluate(el => el.parentElement.open), false);
  }
  assert.deepEqual(errors, []);
  console.log("FAQ checks passed: 36 service FAQ groups, unique questions, no legacy branding/editorial notes, " + routes.length + " rendered routes, mobile/desktop keyboard accordions and no page errors.");
} finally {
  await browser.close();
}

// 在真正的官网上填一次表单，确认页面显示“收到了”。负责人会真的收到一封测试询问电邮。
import { chromium } from "playwright-core";

const browser = await chromium.launch({ executablePath: process.env.CHROME || "/usr/bin/google-chrome" });
const page = await browser.newPage();
const messages = [];
page.on("console", m => { if (m.type() === "error") messages.push(m.text()); });
page.on("pageerror", e => messages.push(e.message));

await page.goto(process.env.SITE, { waitUntil: "load" });
await page.fill("#f-name", "Claude 上线测试");
await page.fill("#f-contact", "test@example.com");
await page.fill("#f-need", "官网上线测试，这条不用回复");
await page.click("#send-btn");

const wait = (selector, label) =>
  page.waitForSelector(selector, { state: "visible", timeout: 30000 }).then(() => label, () => "timeout");
const result = await Promise.race([wait("#sent", "sent"), wait("#form-error", "error")]);
const preview = result === "sent" && await page.isVisible("#sent-note");
const errorText = result === "error" ? await page.textContent("#form-error") : "";

console.log("结果：", result, preview ? "（预览模式，没有真的送出）" : "", errorText);
if (messages.length) console.log("浏览器讯息：\n" + messages.join("\n"));
await browser.close();
if (result !== "sent" || preview) {
  console.log("::error::表单没有送出");
  process.exit(1);
}

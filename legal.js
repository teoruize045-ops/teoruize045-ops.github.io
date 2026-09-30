/* 隐私声明和服务条款共用：选语言，填入 config.js 里的商业资料。 */
(() => {
  const cfg = window.TZ || {};
  const TEXT = {
    zh: { email: "电邮", or: "，或 ", ssm: "SSM 注册号", terms: "服务条款", privacy: "隐私声明" },
    en: { email: "email", or: ", or ", ssm: "SSM reg. no.", terms: "Terms of service", privacy: "Privacy notice" },
    ms: { email: "e-mel", or: ", atau ", ssm: "No. pendaftaran SSM", terms: "Terma perkhidmatan", privacy: "Notis privasi" }
  };
  const HTML_LANG = { zh: "zh-Hans", en: "en", ms: "ms" };
  const name = cfg.businessName || "TZ Works";

  // 601120900533 → +60 11-2090 0533
  const digits = String(cfg.whatsapp || "").replace(/\D/g, "");
  const parts = digits.match(/^60(1\d)(\d{3,4})(\d{4})$/);
  const phone = parts ? `+60 ${parts[1]}-${parts[2]} ${parts[3]}` : (digits ? "+" + digits : "");

  function fill(lang) {
    const m = TEXT[lang];
    const article = document.querySelector(`article[data-lang="${lang}"]`);
    const reg = cfg.ssm ? (lang === "zh" ? `（${m.ssm} ${cfg.ssm}）` : ` (${m.ssm} ${cfg.ssm})`) : "";
    const ways = [];
    if (phone) ways.push(`WhatsApp ${phone}`);
    if (cfg.email) ways.push(`${m.email} ${cfg.email}`);
    article.querySelectorAll('[data-fill="entity"]').forEach(el => { el.textContent = name + reg; });
    if (ways.length) article.querySelectorAll('[data-fill="contact"]').forEach(el => { el.textContent = ways.join(m.or); });
  }

  function show(lang) {
    if (!TEXT[lang]) lang = "zh";
    const article = document.querySelector(`article[data-lang="${lang}"]`);
    document.querySelectorAll("article[data-lang]").forEach(a => { a.hidden = a !== article; });
    document.querySelectorAll(".langs button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.querySelectorAll("[data-link]").forEach(a => { a.textContent = TEXT[lang][a.dataset.link]; });
    document.documentElement.lang = HTML_LANG[lang];
    document.title = article.dataset.title;
    try { localStorage.setItem("tzworks-lang", lang); } catch (e) {}
  }

  Object.keys(TEXT).forEach(fill);
  document.querySelectorAll('[data-fill="name"]').forEach(el => { el.textContent = name; });
  document.getElementById("year").textContent = new Date().getFullYear();
  document.querySelectorAll(".langs button").forEach(b => b.addEventListener("click", () => {
    show(b.dataset.lang);
    history.replaceState(null, "", "#" + b.dataset.lang);
  }));

  let lang = "zh";
  try { lang = localStorage.getItem("tzworks-lang") || lang; } catch (e) {}
  const hash = location.hash.replace("#", "");
  if (TEXT[hash]) lang = hash;
  show(lang);
})();

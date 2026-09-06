import { readFileSync } from "node:fs";

/* load the real product catalog */
const src = readFileSync("js/products.js", "utf8");
const PRODUCTS = new Function(src + "; return PRODUCTS;")();

/* === exact copies of the search logic from js/script.js === */
const norm = s => (s || "").toLowerCase();
function lev(a, b) {
  const m = a.length, n = b.length;
  if (!m) return n;
  if (!n) return m;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[n];
}
function tokenHits(token, text) {
  if (text.includes(token)) return true;
  return text.split(/[\s,/()•—-]+/).some(w => {
    if (!w || w.length < 3) return token === w;
    if (w.includes(token) || token.includes(w)) return true;
    const max = token.length <= 4 ? 1 : 2;
    return Math.abs(token.length - w.length) <= max && lev(token, w) <= max;
  });
}
function productMatches(p, tokens) {
  const hay = norm([p.name, p.pa, p.cat, p.desc, p.keys || ""].join(" "));
  return tokens.every(t => tokenHits(t, hay));
}
const search = q => {
  const tokens = norm(q).split(/\s+/).filter(Boolean);
  return PRODUCTS.filter(p => productMatches(p, tokens)).map(p => p.name);
};

let fails = 0;
const check = (q, fn, label) => {
  const r = search(q);
  const ok = fn(r);
  if (!ok) fails++;
  console.log(`${ok ? "PASS" : "FAIL"}  "${q}" -> ${r.length} result(s) [${label}]${ok ? "" : " => " + JSON.stringify(r)}`);
};

check("frame",    r => r.length === 3, "exact word: 3 frames");
check("frme",     r => r.length === 3, "typo frme -> frames");
check("fram",     r => r.length >= 3, "partial fram");
check("mug",      r => r.length === 1 && r[0].includes("Mug"), "mug");
check("cup",      r => r.some(n => n.includes("Mug")), "synonym cup -> Mug");
check("mag",      r => r.some(n => n.includes("Mug")), "typo mag -> Mug");
check("chai",     r => r.some(n => n.includes("Mug")), "synonym chai -> Mug");
check("calender", r => r.length === 1 && r[0].includes("Calendar"), "typo calender");
check("shadi",    r => r.some(n => n.includes("Wedding")), "hinglish shadi");
check("viah",     r => r.some(n => n.includes("Wedding")), "punjabi viah");
check("chabi",    r => r.some(n => n.includes("Keychain")), "hinglish chabi");
check("pillow",   r => r.some(n => n.includes("Cushion")), "synonym pillow");
check("cup cha",  r => r.length === 1 && r[0].includes("Mug"), "multi-word");
check("photo",    r => r.length >= 9, "broad word photo");
check("led",      r => r.some(n => n.includes("LED")), "led");
check("ਫਰੇਮ",     r => r.length >= 1, "gurmukhi frame");
check("xyzqq",    r => r.length === 0, "no match");

console.log(fails ? `\n${fails} TEST(S) FAILED ❌` : "\nALL SEARCH TESTS PASSED ✅");
process.exitCode = fails ? 1 : 0;
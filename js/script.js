/* ============================================================
   AMIT DIGITAL CENTRE — storefront logic
   (products live in js/products.js)
   ============================================================ */

/* ---------- helpers ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const rupees = n => "₹" + n.toLocaleString("en-IN");

/* ---------- state ---------- */
let cart = {};               // { productId: qty }
let activeCat = "All";
let searchTerm = "";

try {
  cart = JSON.parse(localStorage.getItem("adc_cart")) || {};
} catch { cart = {}; }

const saveCart = () => localStorage.setItem("adc_cart", JSON.stringify(cart));

/* ---------- toast ---------- */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

/* ---------- category filters ---------- */
function renderFilters() {
  const wrap = $("#filters");
  wrap.innerHTML = CATEGORIES.map(cat =>
    `<button class="chip ${cat === activeCat ? "active" : ""}" data-cat="${cat}">${cat}</button>`
  ).join("");
  $$(".chip", wrap).forEach(chip =>
    chip.addEventListener("click", () => {
      activeCat = chip.dataset.cat;
      renderFilters();
      renderProducts();
    })
  );
}

/* ---------- product grid ---------- */
function visibleProducts() {
  const term = searchTerm.trim().toLowerCase();
  return PRODUCTS.filter(p =>
    (activeCat === "All" || p.cat === activeCat) &&
    (!term || (p.name + " " + p.cat + " " + p.desc).toLowerCase().includes(term))
  );
}

function renderProducts() {
  const grid = $("#productGrid");
  const list = visibleProducts();
  $("#emptyMsg").hidden = list.length > 0;
  grid.innerHTML = list.map(p => {
    const off = Math.round((1 - p.price / p.mrp) * 100);
    return `
    <article class="card">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <div class="card-img" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">
        <span class="card-emoji" aria-hidden="true">${p.emoji}</span>
      </div>
      <div class="card-body">
        <span class="card-cat">${p.cat}</span>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-pa">${p.pa}</p>
        <p class="card-desc">${p.desc}</p>
        <div class="card-price">
          <strong>${rupees(p.price)}</strong>
          <s>${rupees(p.mrp)}</s>
          ${off > 0 ? `<em>${off}% OFF</em>` : ""}
        </div>
        <button class="btn add-btn" data-add="${p.id}">🛒 Add to Cart</button>
      </div>
    </article>`;
  }).join("");
  $$("[data-add]", grid).forEach(btn =>
    btn.addEventListener("click", () => addToCart(+btn.dataset.add))
  );
}

/* ---------- cart ---------- */
function cartEntries() {
  return Object.entries(cart)
    .map(([id, qty]) => ({ p: PRODUCTS.find(x => x.id === +id), qty }))
    .filter(e => e.p);
}

function cartCount()  { return cartEntries().reduce((s, e) => s + e.qty, 0); }
function cartTotal()  { return cartEntries().reduce((s, e) => s + e.qty * e.p.price, 0); }

function renderCart() {
  const items = $("#cartItems");
  const entries = cartEntries();
  const n = cartCount();
  $("#cartCount").textContent = n;
  $("#cartCount").classList.toggle("pop", n > 0);
  $("#cartEmpty").style.display = entries.length ? "none" : "flex";
  $("#cartFoot").style.display  = entries.length ? "block" : "none";
  items.innerHTML = entries.map(({ p, qty }) => `
    <div class="cart-item">
      <div class="ci-thumb" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${p.emoji}</div>
      <div class="ci-info">
        <strong>${p.name}</strong>
        <span>${rupees(p.price)} each</span>
        <div class="qty">
          <button data-dec="${p.id}" aria-label="Decrease quantity">−</button>
          <span>${qty}</span>
          <button data-inc="${p.id}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="ci-right">
        <strong>${rupees(p.price * qty)}</strong>
        <button class="ci-remove" data-del="${p.id}" aria-label="Remove item">✕</button>
      </div>
    </div>`).join("");
  $("#cartTotal").textContent = rupees(cartTotal());
  $$("[data-inc]", items).forEach(b => b.addEventListener("click", () => changeQty(+b.dataset.inc, 1)));
  $$("[data-dec]", items).forEach(b => b.addEventListener("click", () => changeQty(+b.dataset.dec, -1)));
  $$("[data-del]", items).forEach(b => b.addEventListener("click", () => removeItem(+b.dataset.del)));
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
  renderCart();
  const p = PRODUCTS.find(x => x.id === id);
  toast(`${p.emoji} ${p.name} added to cart!`);
}

function changeQty(id, delta) {
  if (!cart[id]) return;
  cart[id] += delta;
  if (cart[id] <= 0) delete cart[id];
  saveCart();
  renderCart();
}

function removeItem(id) {
  delete cart[id];
  saveCart();
  renderCart();
}

function clearCart() {
  if (!cartCount()) return;
  cart = {};
  saveCart();
  renderCart();
  toast("🧺 Cart cleared!");
}
/* ---------- drawer, checkout, menu, search, config ---------- */
const drawer = $("#cartDrawer"), overlay = $("#overlay");

function openCart() {
  drawer.classList.add("open");
  overlay.classList.add("show");
  drawer.setAttribute("aria-hidden", "false");
}
function closeCart() {
  drawer.classList.remove("open");
  overlay.classList.remove("show");
  drawer.setAttribute("aria-hidden", "true");
}

$("#cartBtn").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);
document.addEventListener("keydown", e => e.key === "Escape" && closeCart());

/* ---------- checkout on WhatsApp ---------- */
$("#checkoutBtn").addEventListener("click", () => {
  const entries = cartEntries();
  if (!entries.length) return;
  let msg = "ਸਤ ਸ੍ਰੀ ਅਕਾਲ ji! 🙏\nI want to order from *Amit Digital Centre*:\n\n";
  entries.forEach(({ p, qty }, i) => {
    msg += `${i + 1}. ${p.name} x${qty} — ${rupees(p.price * qty)}\n`;
  });
  msg += `\n*Total: ${rupees(cartTotal())}*\n\nName:\nDelivery address:`;
  window.open(`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
});

$("#clearCartBtn").addEventListener("click", clearCart);

/* ---------- mobile menu ---------- */
$("#menuBtn").addEventListener("click", () => $("#navLinks").classList.toggle("open"));
$$("#navLinks a").forEach(a => a.addEventListener("click", () => $("#navLinks").classList.remove("open")));

/* ---------- search ---------- */
$("#searchInput").addEventListener("input", e => {
  searchTerm = e.target.value;
  renderProducts();
});

/* ---------- push shop config into the page ---------- */
$("#instaHero").href = SHOP.instagram;
$("#instaFooter").href = SHOP.instagram;
$("#waFooter").href = `https://wa.me/${SHOP.whatsapp}`;
$("#callFooter").href = "tel:" + SHOP.phone.replace(/\s/g, "");
$("#shopPhone").textContent = SHOP.phone;
$("#shopPhone").href = "tel:" + SHOP.phone.replace(/\s/g, "");
$("#shopAddress").textContent = SHOP.address;

/* ---------- go! ---------- */
renderFilters();
renderProducts();
renderCart();


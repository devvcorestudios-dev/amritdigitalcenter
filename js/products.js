/* ============================================================
   AMIT DIGITAL CENTRE — PRODUCT CATALOG
   👉 Instagram cannot be auto-scraped (login required), so the
      products below are the shop's typical catalogue. To update:
      copy any object, change name / price / emoji / colours (g).
   ============================================================ */

const SHOP = {
  name: "Amit Digital Centre",
  instagram: "https://www.instagram.com/amrit_digital_centre",
  whatsapp: "919999999999",            // 👈 PUT YOUR REAL NUMBER HERE (country code + number, no +)
  phone: "+91 99999 99999",            // 👈 shop phone shown in footer
  address: "Main Bazaar, Punjab, India" // 👈 shop address shown in footer
};

const CATEGORIES = ["All", "Frames", "Prints", "Gifts", "Albums", "Studio"];

const PRODUCTS = [
  { id:1,  name:"Classic Wooden Photo Frame", pa:"ਲੱਕੜ ਦਾ ਫੋਟੋ ਫਰੇਮ",   cat:"Frames", price:499,  mrp:799,  emoji:"🖼️", badge:"Bestseller", g:["#FF9A3C","#FFD93D"], desc:"Solid wood frame with glass front. A4 / 8x10 inch." },
  { id:2,  name:"Canvas Wall Print",          pa:"ਕੈਨਵਸ ਪ੍ਰਿੰਟ",          cat:"Prints", price:899,  mrp:1499, emoji:"🎨", badge:"Trending",   g:["#E91E63","#FF6F91"], desc:"Gallery-quality canvas on wooden bars. 12x18 inch." },
  { id:3,  name:"Magic Photo Mug",            pa:"ਫੋਟੋ ਮੱਗ",              cat:"Gifts",  price:299,  mrp:449,  emoji:"☕",                     g:["#7B1FA2","#E040FB"], desc:"Heat-resistant ceramic mug with your favourite photo." },
  { id:4,  name:"Photo Keychain (Set of 2)",  pa:"ਫੋਟੋ ਚਾਬੀ ਦਾ ਗੁੱਛਾ",     cat:"Gifts",  price:149,  mrp:249,  emoji:"🔑",                     g:["#00897B","#4DD0E1"], desc:"Acrylic keychains — one for you, one for your loved one." },
  { id:5,  name:"Premium Wedding Album",      pa:"ਵਿਆਹ ਦਾ ਐਲਬਮ",          cat:"Albums", price:2499, mrp:3999, emoji:"💍", badge:"Premium",    g:["#C62828","#FF8A65"], desc:"40 laminated pages, designer cover. Memories for life." },
  { id:6,  name:"Passport Photos (Set of 8)", pa:"ਪਾਸਪੋਰਟ ਫੋਟੋ",          cat:"Studio", price:99,   mrp:149,  emoji:"🪪",                     g:["#1565C0","#42A5F5"], desc:"Studio quality, all standard sizes, ready in 10 minutes." },
  { id:7,  name:"Photo Cushion",              pa:"ਫੋਟੋ ਕਸ਼ਨ",             cat:"Gifts",  price:399,  mrp:599,  emoji:"🛋️",                    g:["#F57C00","#FFCA28"], desc:"Soft satin cushion 12x12 inch with your printed photo." },
  { id:8,  name:"Custom Photo T-Shirt",       pa:"ਫੋਟੋ ਟੀ-ਸ਼ਰਟ",          cat:"Gifts",  price:599,  mrp:899,  emoji:"👕",                     g:["#2E7D32","#66BB6A"], desc:"Cotton t-shirt, all sizes, wash-proof print." },
  { id:9,  name:"Poster Print (A3, Laminated)",pa:"ਪੋਸਟਰ ਪ੍ਰਿੰਟ",         cat:"Prints", price:199,  mrp:299,  emoji:"🌄",                     g:["#5D4037","#FFB74D"], desc:"Glossy A3 poster with matte lamination, vivid colours." },
  { id:10, name:"Photo Calendar 2026",        pa:"ਫੋਟੋ ਕੈਲੰਡਰ",          cat:"Prints", price:299,  mrp:499,  emoji:"📅", badge:"New",        g:["#AD1457","#F06292"], desc:"12 personal photos — one for every month of the year!" },
  { id:11, name:"LED Backlit Photo Frame",    pa:"ਐੱਲ.ਈ.ਡੀ. ਫਰੇਮ",        cat:"Frames", price:1299, mrp:1899, emoji:"💡",                     g:["#4527A0","#7C4DFF"], desc:"Backlit frame — your photo glows like a masterpiece." },
  { id:12, name:"Collage Frame (6 Photos)",   pa:"ਕੋਲਾਜ ਫਰੇਮ",           cat:"Frames", price:799,  mrp:1199, emoji:"🧩",                     g:["#00695C","#26A69A"], desc:"Six photos, one story. Perfect family gift." }
];

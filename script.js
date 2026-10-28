"use strict";

// ======================================================
// 1. CONFIGURATION
// ======================================================

// Replace this with your verified merchant UPI ID.
const MERCHANT_UPI_ID = "joeljoseph1061-2@okicici" 

// Demo reward policy:
// Orders strictly above ₹2,000 receive ₹100 off.
// Every ₹100 of final eligible spend earns 1 demo coin.
// Coins are displayed as a reward; no real wallet exists.
const REWARD_THRESHOLD = 2000;
const REWARD_DISCOUNT = 100;

// Replace sample product images, names and prices as needed.
const products = [
  {
    id: 1,
    category: "watch",
    name: "The Sovereign",
    description: "Gold-tone finish with a refined, classic silhouette.",
    price: 2499,
    tag: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 2,
    category: "watch",
    name: "Midnight Chrono",
    description: "A bold dark dial designed for evening elegance.",
    price: 1899,
    tag: "NEW ARRIVAL",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 3,
    category: "watch",
    name: "Heritage Classic",
    description: "Understated styling for every occasion.",
    price: 3299,
    tag: "SIGNATURE",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 4,
    category: "watch",
    name: "Urban Minimal",
    description: "Clean lines and versatile contemporary design.",
    price: 1599,
    tag: "EVERYDAY",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 5,
    category: "gadget",
    name: "Sonic Pro",
    description: "Wireless headphones for immersive listening.",
    price: 2299,
    tag: "POPULAR",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 6,
    category: "gadget",
    name: "Pulse Watch",
    description: "A smart wearable for your everyday routine.",
    price: 2799,
    tag: "SMART TECH",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 7,
    category: "gadget",
    name: "AirBeat Buds",
    description: "Compact wireless earbuds with a sleek finish.",
    price: 1299,
    tag: "ESSENTIAL",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: 8,
    category: "gadget",
    name: "PowerDock",
    description: "A modern charging accessory for your desk.",
    price: 999,
    tag: "DAILY TECH",
    image: "https://images.unsplash.com/photo-1609592806596-b43bada2f9f5?auto=format&fit=crop&w=700&q=80"
  }
];

// ======================================================
// 2. STATE AND HELPERS
// ======================================================

const cart = new Map();

const $ = (selector) => document.querySelector(selector);

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

const getProduct = (id) =>
  products.find((product) => product.id === Number(id));

const getSubtotal = () => {
  let total = 0;

  for (const [id, quantity] of cart) {
    const product = getProduct(id);
    if (product) total += product.price * quantity;
  }

  return total;
};

const getItemCount = () =>
  [...cart.values()].reduce((total, quantity) => total + quantity, 0);

const getDiscount = (subtotal) =>
  subtotal > REWARD_THRESHOLD ? REWARD_DISCOUNT : 0;

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");

  window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// ======================================================
// 3. PRODUCT RENDERING
// ======================================================

function renderProducts(category, targetSelector) {
  const target = $(targetSelector);

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  target.replaceChildren();

  for (const product of categoryProducts) {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageBox = document.createElement("div");
    imageBox.className = "product-image";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.decoding = "async";

    // Graceful fallback if a remote image fails to load.
    image.addEventListener("error", () => {
      image.removeAttribute("src");
      image.alt = `${product.name} — image unavailable`;
      imageBox.style.background =
        "linear-gradient(135deg, #302b20, #171714)";
    }, { once: true });

    const tag = document.createElement("span");
    tag.className = "product-tag";
    tag.textContent = product.tag;

    imageBox.append(image, tag);

    const info = document.createElement("div");
    info.className = "product-info";

    const categoryLabel = document.createElement("div");
    categoryLabel.className = "product-category";
    categoryLabel.textContent =
      category === "watch" ? "WATCH COLLECTION" : "GADGET COLLECTION";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const bottom = document.createElement("div");
    bottom.className = "product-bottom";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatINR(product.price);

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.type = "button";
    addButton.textContent = "ADD TO BAG +";
    addButton.setAttribute("aria-label", `Add ${product.name} to bag`);

    addButton.addEventListener("click", () => {
      addToCart(product.id, addButton);
    });

    bottom.append(price, addButton);
    info.append(categoryLabel, title, description, bottom);
    card.append(imageBox, info);
    target.append(card);
  }
}

// ======================================================
// 4. ADD TO CART + CONFETTI
// ======================================================

function addToCart(id, button) {
  const product = getProduct(id);
  if (!product) return;

  cart.set(id, (cart.get(id) || 0) + 1);

  renderCart();
  launchConfetti(button);

  showToast(`${product.name} added to your bag`);
}

function launchConfetti(button) {
  const rect = button.getBoundingClientRect();

  // Confetti is decorative and does not block shopping.
  const colors = ["#c9a86a", "#f5f0e7", "#e7d4a5", "#a98543"];
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 34; i++) {
    const particle = document.createElement("span");
    const angle = Math.random() * Math.PI * 2;
    const distance = 45 + Math.random() * 100;

    particle.style.cssText = `
      position:fixed;
      z-index:999;
      left:${rect.left + rect.width / 2}px;
      top:${rect.top + rect.height / 2}px;
      width:${4 + Math.random() * 5}px;
      height:${5 + Math.random() * 7}px;
      background:${colors[i % colors.length]};
      border-radius:1px;
      pointer-events:none;
      --dx:${Math.cos(angle) * distance}px;
      --dy:${Math.sin(angle) * distance - 25}px;
      animation:confetti-fly ${600 + Math.random() * 500}ms ease-out forwards;
    `;

    fragment.append(particle);
    particle.addEventListener("animationend", () => particle.remove(), {
      once: true
    });
  }

  document.body.append(fragment);
}

// Inject the animation once.
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
  @keyframes confetti-fly {
    0% { opacity:1; transform:translate(0,0) rotate(0deg); }
    100% {
      opacity:0;
      transform:translate(var(--dx),var(--dy)) rotate(540deg);
    }
  }
`;
document.head.append(confettiStyle);

// ======================================================
// 5. CART DRAWER AND QUANTITY CONTROLS
// ======================================================

function openCart() {
  $("#cart-drawer").classList.add("active");
  $("#cart-overlay").classList.add("active");
  updateScrollLock();
}

function closeCart() {
  $("#cart-drawer").classList.remove("active");
  $("#cart-overlay").classList.remove("active");
  updateScrollLock();
}

function renderCart() {
  const container = $("#cart-items");
  container.replaceChildren();

  if (cart.size === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-cart";
    empty.textContent = "Your bag is waiting for something exceptional.";
    container.append(empty);
  }

  for (const [id, quantity] of cart) {
    const product = getProduct(id);
    if (!product) continue;

    const row = document.createElement("div");
    row.className = "cart-row";

    const details = document.createElement("div");
    const name = document.createElement("h4");
    name.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `${formatINR(product.price)} each`;

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", `Remove one ${product.name}`);
    minus.addEventListener("click", () => changeQuantity(id, -1));

    const count = document.createElement("span");
    count.textContent = String(quantity);

    const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", `Add one ${product.name}`);
    plus.addEventListener("click", () => changeQuantity(id, 1));

    controls.append(minus, count, plus);

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      cart.delete(id);
      renderCart();
    });

    details.append(name, price, controls, remove);

    const lineTotal = document.createElement("strong");
    lineTotal.textContent = formatINR(product.price * quantity);

    row.append(details, lineTotal);
    container.append(row);
  }

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);

  $("#cart-count").textContent = String(getItemCount());
  $("#cart-subtotal").textContent = formatINR(subtotal);

  $("#cart-reward-message").textContent =
    discount > 0
      ? `Super Coin reward unlocked: ${formatINR(discount)} off!`
      : `Spend more than ${formatINR(REWARD_THRESHOLD)} to unlock ${formatINR(REWARD_DISCOUNT)} off.`;

  $("#checkout-button").disabled = cart.size === 0;
  renderCheckoutSummary();
}

function changeQuantity(id, change) {
  const nextQuantity = (cart.get(id) || 0) + change;

  if (nextQuantity <= 0) {
    cart.delete(id);
  } else {
    cart.set(id, nextQuantity);
  }

  renderCart();
}

// ======================================================
// 6. CHECKOUT TOTALS AND SUPER COIN REWARDS
// ======================================================

function renderCheckoutSummary() {
  const container = $("#checkout-items");
  if (!container) return;

  container.replaceChildren();

  for (const [id, quantity] of cart) {
    const product = getProduct(id);
    if (!product) continue;

    const line = document.createElement("div");
    line.className = "summary-line";

    const name = document.createElement("span");
    name.textContent = `${product.name} × ${quantity}`;

    const price = document.createElement("strong");
    price.textContent = formatINR(product.price * quantity);

    line.append(name, price);
    container.append(line);
  }

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  const total = subtotal - discount;
  const coinsEarned = Math.floor(total / 100);

  $("#checkout-subtotal").textContent = formatINR(subtotal);
  $("#coin-discount").textContent = `−${formatINR(discount)}`;
  $("#checkout-total").textContent = formatINR(total);

  $("#checkout-coin-message").textContent =
    discount > 0
      ? `Reward unlocked! You save ${formatINR(discount)} and earn ${coinsEarned} demo Super Coins if this order is completed.`
      : `Add products worth more than ${formatINR(REWARD_THRESHOLD)} to unlock the Super Coin discount.`;

  $("#merchant-upi-display").textContent = MERCHANT_UPI_ID;
}

// ======================================================
// 7. PAYMENT METHOD DISPLAY
// ======================================================

function updatePaymentDetails() {
  const method = document.querySelector(
    'input[name="payment"]:checked'
  )?.value;

  const upiDetails = $("#upi-details");
  const upiInput = $("#upi-id");

  const isUPI = method === "upi";
  upiDetails.hidden = !isUPI;
  upiInput.required = isUPI;
}

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", updatePaymentDetails);
});

// ======================================================
// 8. CHECKOUT FORM — DEMO ONLY
// ======================================================

function openCheckout() {
  if (cart.size === 0) {
    showToast("Add a product before checking out.");
    return;
  }

  closeCart();
  $("#order-message").textContent = "";
  $("#checkout-overlay").classList.add("active");
  updatePaymentDetails();
  renderCheckoutSummary();
  updateScrollLock();

  $("#checkout-title").scrollIntoView({
    behavior: "auto",
    block: "start"
  });
}

function closeCheckout() {
  $("#checkout-overlay").classList.remove("active");
  updateScrollLock();
}

$("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();

  if (cart.size === 0) {
    $("#order-message").textContent = "Your bag is empty.";
    return;
  }

  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const method = form.querySelector(
    'input[name="payment"]:checked'
  )?.value;

  if (method === "upi") {
    const enteredUPI = $("#upi-id").value.trim();

    // Basic input check, not actual UPI verification.
    if (!/^[\w.-]+@[\w.-]+$/.test(enteredUPI)) {
      $("#order-message").textContent =
        "Enter a UPI ID in the expected format, or choose another payment option.";
      $("#upi-id").focus();
      return;
    }

    if (MERCHANT_UPI_ID === "REPLACE_WITH_YOUR_UPI_ID") {
      $("#order-message").textContent =
        "Demo checkout only. Configure your verified merchant UPI ID and payment gateway before accepting payments.";
      return;
    }
  }

  const subtotal = getSubtotal();
  const discount = getDiscount(subtotal);
  const total = subtotal - discount;
  const coins = Math.floor(total / 100);

  // Intentionally does not transmit personal data or take payment.
  const orderReference =
    "BC-DEMO-" + Date.now().toString().slice(-8);

  $("#order-message").textContent =
    `Demo order ${orderReference}: ${formatINR(total)}. ` +
    `${discount ? formatINR(discount) + " Super Coin discount applied. " : ""}` +
    `Potential reward: ${coins} demo coins. ` +
    `No payment was processed and no real order was submitted.`;

  showToast("Demo checkout completed");
});

// ======================================================
// 9. OVERLAYS, SPLASH AND ACCESSIBILITY
// ======================================================

function updateScrollLock() {
  const open =
    $("#cart-drawer").classList.contains("active") ||
    $("#checkout-overlay").classList.contains("active");

  document.body.classList.toggle("no-scroll", open);
}

$("#open-cart").addEventListener("click", openCart);
$("#close-cart").addEventListener("click", closeCart);
$("#cart-overlay").addEventListener("click", closeCart);

$("#checkout-button").addEventListener("click", openCheckout);
$("#close-checkout").addEventListener("click", closeCheckout);

$("#checkout-overlay").addEventListener("click", (event) => {
  if (event.target === $("#checkout-overlay")) closeCheckout();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCart();
    closeCheckout();
  }
});

// Ensure the splash is removed from the interactive page after its
// two-second introduction, including when reduced motion is enabled.
window.addEventListener("load", () => {
  window.setTimeout(() => {
    const splash = $("#splash");
    if (splash) splash.remove();
  }, 1000);
});

// Start the storefront.
renderProducts("watch", "#watch-list");
renderProducts("gadget", "#gadget-list");
renderCart();
updatePaymentDetails();

// ==========================================
// THEODORE LUXE — E-COMMERCE WEBSITE
// JavaScript Application
// ==========================================

const THEODORE_LUXE = {
    name: "THEODORE LUXE",
    currency: "INR",
    symbol: "₹",
    shipping: 99,
    freeShippingAbove: 1999
};

// ==========================================
// PRODUCT DATABASE
// ==========================================

let products = [
    { id: 1, name: "Heritage Chronograph", category: "Watches", price: 4299, rating: 4.8, image: "⌚" },
    { id: 2, name: "Midnight Smart Watch", category: "Smart Gadgets", price: 3499, rating: 4.6, image: "◉" },
    { id: 3, name: "Leather Wallet", category: "Bags & Wallets", price: 1499, rating: 4.5, image: "▰" },
    { id: 4, name: "Aura Perfume", category: "Perfumes", price: 2299, rating: 4.9, image: "♧" },
    { id: 5, name: "Gold Pendant", category: "Jewellery", price: 1899, rating: 4.7, image: "✧" },
    { id: 6, name: "Wireless Earbuds", category: "Electronics", price: 2799, rating: 4.4, image: "◖" },
    { id: 7, name: "Classic Sunglasses", category: "Accessories", price: 1199, rating: 4.3, image: "◉" },
    { id: 8, name: "Power Bank", category: "Mobile Accessories", price: 1599, rating: 4.6, image: "▰" },
    { id: 9, name: "Crossbody Bag", category: "Bags & Wallets", price: 2599, rating: 4.7, image: "▱" },
    { id: 10, name: "Linen Shirt", category: "Fashion", price: 1999, rating: 4.5, image: "♢" }
];

// ==========================================
// WEBSITE DATA
// ==========================================

let cart = JSON.parse(localStorage.getItem("tl_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("tl_wishlist")) || [];
let users = JSON.parse(localStorage.getItem("tl_users")) || [];
let orders = JSON.parse(localStorage.getItem("tl_orders")) || [];
let coupons = JSON.parse(localStorage.getItem("tl_coupons")) || [
    { code: "WELCOME10", discount: 10, type: "percentage" },
    { code: "LUXE200", discount: 200, type: "fixed" }
];

let currentUser = JSON.parse(localStorage.getItem("tl_user")) || null;
let activeCoupon = null;

// ==========================================
// STORAGE FUNCTIONS
// ==========================================

function saveData() {
    localStorage.setItem("tl_cart", JSON.stringify(cart));
    localStorage.setItem("tl_wishlist", JSON.stringify(wishlist));
    localStorage.setItem("tl_users", JSON.stringify(users));
    localStorage.setItem("tl_orders", JSON.stringify(orders));
    localStorage.setItem("tl_coupons", JSON.stringify(coupons));
}

function formatPrice(price) {
    return "₹" + Number(price).toLocaleString("en-IN");
}

// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(list = products) {

    const container = document.getElementById("productGrid");

    if (!container) return;

    container.innerHTML = "";

    list.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <div class="product-image">
                    <span>${product.image}</span>
                    <button onclick="toggleWishlist(${product.id})">
                        ${wishlist.includes(product.id) ? "♥" : "♡"}
                    </button>
                </div>

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <p>⭐ ${product.rating}</p>

                <h4>${formatPrice(product.price)}</h4>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}

// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const search = document.getElementById("searchInput").value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
    );

    displayProducts(filtered);
}

// ==========================================
// FILTER PRODUCTS
// ==========================================

function filterCategory(category) {

    if (category === "All") {
        displayProducts();
        return;
    }

    const filtered = products.filter(product =>
        product.category === category
    );

    displayProducts(filtered);
}

// ==========================================
// SORT PRODUCTS
// ==========================================

function sortProducts(type) {

    let sorted = [...products];

    if (type === "low") {
        sorted.sort((a, b) => a.price - b.price);
    }

    if (type === "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    if (type === "rating") {
        sorted.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(sorted);
}

// ==========================================
// ADD TO CART
// ==========================================

function addToCart(id) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveData();
    updateCart();

    alert("Product added to your shopping bag!");
}

// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const container = document.getElementById("cartItems");

    if (!container) return;

    container.innerHTML = "";

    cart.forEach(item => {

        container.innerHTML += `
            <div class="cart-item">

                <span>${item.image}</span>

                <h4>${item.name}</h4>

                <p>${formatPrice(item.price)}</p>

                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                ${item.quantity}

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button onclick="removeFromCart(${item.id})">
                    Remove
                </button>

            </div>
        `;
    });

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const countElement = document.getElementById("cartCount");

    if (countElement) {
        countElement.textContent = count;
    }

    updateTotal();
}

// ==========================================
// CHANGE QUANTITY
// ==========================================

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveData();
    updateCart();
}

// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveData();
    updateCart();
}

// ==========================================
// CART TOTAL
// ==========================================

function calculateSubtotal() {

    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

function calculateDiscount() {

    if (!activeCoupon) return 0;

    const coupon = coupons.find(c => c.code === activeCoupon);

    if (!coupon) return 0;

    const subtotal = calculateSubtotal();

    if (coupon.type === "percentage") {
        return subtotal * coupon.discount / 100;
    }

    return Math.min(coupon.discount, subtotal);
}

function updateTotal() {

    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();

    const shipping = subtotal === 0 ||
        subtotal >= THEODORE_LUXE.freeShippingAbove
        ? 0
        : THEODORE_LUXE.shipping;

    const total = subtotal - discount + shipping;

    const totalElement = document.getElementById("cartTotal");

    if (totalElement) {
        totalElement.textContent = formatPrice(total);
    }

    return total;
}

// ==========================================
// COUPON SYSTEM
// ==========================================

function applyCoupon(code) {

    code = code.trim().toUpperCase();

    const coupon = coupons.find(c => c.code === code);

    if (!coupon) {
        alert("Invalid coupon code!");
        return;
    }

    activeCoupon = code;

    updateTotal();

    alert("Coupon applied successfully!");
}

// ==========================================
// WISHLIST
// ==========================================

function toggleWishlist(id) {

    if (wishlist.includes(id)) {

        wishlist = wishlist.filter(item => item !== id);

    } else {

        wishlist.push(id);
    }

    saveData();

    displayProducts();
}

function showWishlist() {

    const items = products.filter(product =>
        wishlist.includes(product.id)
    );

    displayProducts(items);
}

// ==========================================
// CUSTOMER REGISTRATION
// ==========================================

function registerUser(name, email, password) {

    if (!name || !email || !password) {
        alert("Please complete all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    const exists = users.find(user => user.email === email);

    if (exists) {
        alert("Account already exists.");
        return;
    }

    users.push({
        name,
        email,
        password
    });

    saveData();

    alert("Registration successful!");
}

// ==========================================
// CUSTOMER LOGIN
// ==========================================

function loginUser(email, password) {

    const user = users.find(user =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    currentUser = {
        name: user.name,
        email: user.email
    };

    localStorage.setItem("tl_user", JSON.stringify(currentUser));

    alert("Welcome to THEODORE LUXE!");
}

// ==========================================
// CUSTOMER LOGOUT
// ==========================================

function logoutUser() {

    currentUser = null;

    localStorage.removeItem("tl_user");

    alert("You have logged out.");
}

// ==========================================
// CUSTOMER REVIEWS
// ==========================================

function addReview(productId, rating, comment) {

    if (rating < 1 || rating > 5) {
        alert("Rating must be between 1 and 5.");
        return;
    }

    const reviews = JSON.parse(
        localStorage.getItem("tl_reviews")
    ) || [];

    reviews.push({
        productId,
        rating,
        comment,
        customer: currentUser?.name || "Guest",
        date: new Date().toISOString()
    });

    localStorage.setItem("tl_reviews", JSON.stringify(reviews));

    alert("Thank you for your review!");
}

// ==========================================
// CHECKOUT
// ==========================================

function checkout(customer, paymentMethod) {

    if (!cart.length) {
        alert("Your cart is empty.");
        return;
    }

    const total = updateTotal();

    const order = {
        id: "TL" + Date.now(),
        customer,
        products: [...cart],
        paymentMethod,
        total,
        status: "Pending",
        date: new Date().toISOString()
    };

    orders.push(order);

    saveData();

    cart = [];
    activeCoupon = null;

    saveData();
    updateCart();

    alert("Demo order placed successfully! Order ID: " + order.id);

    return order;
}

// ==========================================
// ADMIN LOGIN
// DEMO ONLY — NOT SECURE
// ==========================================

function adminLogin(username, password) {

    if (username === "admin" && password === "Luxe@2026") {

        sessionStorage.setItem("tl_admin", "true");

        alert("Admin login successful!");

        displayAdminDashboard();

        return true;
    }

    alert("Invalid admin credentials.");

    return false;
}

// ==========================================
// ADMIN DASHBOARD
// ==========================================

function displayAdminDashboard() {

    if (sessionStorage.getItem("tl_admin") !== "true") {
        alert("Please login as administrator.");
        return;
    }

    console.log("THEODORE LUXE ADMIN DASHBOARD");

    console.log("Total Products:", products.length);

    console.log("Total Orders:", orders.length);

    console.log(
        "Total Sales:",
        formatPrice(orders.reduce((sum, order) => sum + order.total, 0))
    );

    console.table(products);
    console.table(orders);
}

// ==========================================
// ADMIN ADD PRODUCT
// ==========================================

function addProduct(name, category, price, image) {

    if (!name || !category || price <= 0) {
        alert("Enter valid product details.");
        return;
    }

    products.push({
        id: Date.now(),
        name,
        category,
        price: Number(price),
        image: image || "◇",
        rating: 0
    });

    saveData();

    displayProducts();

    alert("New product added!");
}

// ==========================================
// ADMIN EDIT PRODUCT
// ==========================================

function editProduct(id, newName, newPrice) {

    const product = products.find(p => p.id === id);

    if (!product) return;

    product.name = newName;
    product.price = Number(newPrice);

    saveData();

    displayProducts();

    alert("Product updated!");
}

// ==========================================
// ADMIN DELETE PRODUCT
// ==========================================

function deleteProduct(id) {

    products = products.filter(p => p.id !== id);

    cart = cart.filter(item => item.id !== id);

    wishlist = wishlist.filter(item => item !== id);

    saveData();

    displayProducts();
    updateCart();

    alert("Product deleted!");
}

// ==========================================
// ADMIN COUPON MANAGEMENT
// ==========================================

function createCoupon(code, discount, type) {

    code = code.trim().toUpperCase();

    if (!code || discount <= 0) return;

    if (coupons.some(c => c.code === code)) {
        alert("Coupon already exists.");
        return;
    }

    coupons.push({
        code,
        discount: Number(discount),
        type
    });

    saveData();

    alert("Coupon created successfully!");
}

// ==========================================
// ADMIN VIEW ORDERS
// ==========================================

function viewOrders() {

    console.table(orders);

    return orders;
}

// ==========================================
// WHATSAPP SUPPORT
// ==========================================

function openWhatsApp() {

    const phoneNumber = "919876543210";

    const message = encodeURIComponent(
        "Hello THEODORE LUXE! I need shopping assistance."
    );

    window.open(
        `https://wa.me/${phoneNumber}?text=${message}`,
        "_blank"
    );
}

// ==========================================
// ANIMATIONS
// ==========================================

function startSplashScreen() {

    const splash = document.getElementById("splashScreen");

    if (!splash) return;

    setTimeout(() => {

        splash.style.opacity = "0";

        setTimeout(() => {
            splash.style.display = "none";
        }, 600);

    }, 2000);
}

// ==========================================
// INITIALIZE WEBSITE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    displayProducts();

    updateCart();

    startSplashScreen();

    console.log("THEODORE LUXE website initialized successfully.");

});
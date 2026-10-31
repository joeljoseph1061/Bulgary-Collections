# THEODORE LUXE — Local e-commerce demo

A responsive HTML, CSS and vanilla JavaScript shopping website for learning and local testing.

## Files
- `index.html` — page structure, shopping UI, dialogs and admin dashboard
- `styles.css` — responsive luxury styling and animations
- `app.js` — sample products, cart, wishlist, demo account, coupons, checkout and admin tools

## Run on Android (free)
1. Download and extract `theodore_luxe.zip` on your Android phone.
2. Install a code editor that can preview HTML locally, such as Acode or Spck Editor (availability may vary by device).
3. Open the extracted `theodore_luxe` folder in the editor.
4. Open `index.html` and use the editor's Preview / Run option.
5. Keep all three files in the same folder. Internet is needed for the optional Google Fonts; the site otherwise runs locally.

You can also copy the folder to a computer and open `index.html` in a modern browser.

## Demo admin login
- Username: `admin`
- Password: `Luxe@2026`

Open **Admin dashboard** in the footer.

## Demo coupons
- `WELCOME10` — 10% off
- `LUXE200` — ₹200 off

## What works locally
- Responsive home page and 10 categories
- Product search, category filter and sorting
- Add/remove cart items and quantity changes
- Wishlist
- Demo account registration/login
- Coupon creation and application
- Checkout form and local demo order creation
- Admin product add/edit/delete
- Admin order, coupon and demo-user views
- WhatsApp support link (replace its number in `app.js`)

## Important limitations before a real launch
This is a front-end learning prototype, not a secure production commerce system:
- Browser `localStorage` is not a secure database. Demo passwords are stored locally and must never be used for real customer accounts.
- Admin credentials are visible in JavaScript and are not secure.
- Checkout does not collect money. UPI/card choices are demonstrations only.
- Orders and customer records exist only in the browser/device where they were created.
- Product art is illustrative emoji artwork because no product photos or logo were supplied.
- Replace the example WhatsApp number (`919876543210`) with your official number.
- Add a backend (for example Node.js + Express with a database), server-side authentication, admin authorization, validation, order emails, shipping integration, privacy/terms pages and a payment gateway such as Razorpay/ Cashfree/PayU before accepting real orders. Never collect or store raw card details yourself.

## Suggested next development stages
1. Backend API and database (products, users, orders, reviews).
2. Secure customer/admin authentication and role-based access.
3. Payment gateway sandbox integration and verified webhooks.
4. Product image uploads, inventory, shipping and order tracking.
5. Deployment, domain, HTTPS, backups, privacy policy and production testing.

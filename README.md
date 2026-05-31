# 🍔 FastFood POS & Billing System

A Point of Sale (POS) and billing system for fast food shops. Built with Node.js, Express, EJS, SQLite, and Tailwind CSS.

---

## Features

- **Fast order entry** — click menu items to add to cart instantly
- **UPI QR code** on receipts for digital payments
- **Thermal-ready receipts** — print-optimised 80mm layout
- **Role-based access** — Admin and Cashier roles
- **Menu & category management** with custom emoji icons
- **Order history** with search and filters
- **Daily sales report** with payment breakdown and top items
- **Mobile friendly** — works on phones, tablets, and desktops

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v18+ |
| Framework | Express.js |
| Template Engine | EJS |
| Database | SQLite (via `sqlite3`) |
| Styling | Tailwind CSS (CDN) |
| Auth | express-session + bcryptjs |
| QR Code | qrcode |

---

## Installation

### 1. Clone or download the project

```bash
git clone <repo-url>
cd fast-food
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment (optional)

Copy the example env or edit `.env` directly:

```bash
# .env
UPI_ID=yourname@bankname                # UPI ID shown on receipts
SHOP_NAME=Fast Food Shop                # Shop name on receipts
PORT=4000                               # Server port (default: 4000)
SESSION_SECRET=fastfood-secret-2024     # Secret for session cookies
```

### 4. Start the server

```bash
npm start
```

Open **http://localhost:4000** in your browser.

The database (`database/fastfood.db`) and all tables are created automatically on first run. Sample categories and menu items are seeded automatically.

---

## Default Login Credentials

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Cashier | `cashier` | `cashier123` |

> Change passwords after first login via the database or by adding a change-password route.

---

## NPM Scripts

| Command | Description |
|---|---|
| `npm start` | Start the server on port 4000 |
| `npm run kill` | Free port 4000 if already in use |
| `npm run fresh` | Kill port 4000 then start the server |

### Port already in use?

```bash
npm run kill    # frees port 4000
npm start       # then start normally
```

Or in one command:

```bash
npm run fresh
```

---

## Project Structure

```
fast-food/
├── bin/
│   └── www                  # Server entry point
├── database/
│   └── db.js                # SQLite setup, schema, seed data
├── middleware/
│   └── auth.js              # requireAuth, requireAdmin
├── public/
│   └── js/
│       └── pos.js           # POS client-side logic
├── routes/
│   ├── auth.js              # Login / logout
│   ├── categories.js        # Category CRUD
│   ├── dashboard.js         # Dashboard stats
│   ├── menu.js              # Menu item CRUD
│   ├── orders.js            # POS, order creation, receipt
│   └── reports.js           # Daily sales report
├── views/
│   ├── auth/login.ejs
│   ├── categories/index.ejs
│   ├── dashboard/index.ejs
│   ├── menu/index.ejs
│   ├── orders/
│   │   ├── pos.ejs          # Main POS / billing screen
│   │   ├── history.ejs      # Order history
│   │   └── receipt.ejs      # Printable receipt
│   ├── reports/daily.ejs
│   └── partials/            # Shared layout partials
├── .env                     # Environment config
├── app.js                   # Express app setup
└── package.json
```

---

## Usage Guide

### Taking an Order (Cashier)

1. Go to **New Order** (or press the `+` button)
2. Use the **search box** or category tabs to find items
3. **Click a menu item card** to add it to the cart
4. Adjust quantity with the `+` / `−` buttons in the cart
5. Select payment method: **Cash**, **UPI**, or **Card**
6. For Cash — enter the amount received; change is calculated automatically
7. Click **Generate Bill** → receipt opens automatically
8. Click **Print Receipt** to print

**Keyboard shortcuts on the POS screen:**
- Press `/` → jump to search box
- Press `Enter` in search → add the top matching item

### Managing Menu (Admin)

- **Categories** — add/edit/delete categories, set emoji icon
- **Menu Items** — add/edit/delete items, set price, GST%, and active/inactive status

### Reports (Admin)

- **Daily Report** — select any date to see total orders, revenue, GST collected, payment breakdown, and top-selling items

---

## Receipt & UPI QR

When payment method is **UPI**, the receipt automatically shows a scannable QR code encoded with:

```
upi://pay?pa=<UPI_ID>&am=<order_total>&cu=INR
```

To change the UPI ID, edit `.env`:

```
UPI_ID=9876543210@paytm
```

Then restart the server.

---

## Database

SQLite database file is stored at `database/fastfood.db`. It is created automatically on first run.

**Tables:** `users`, `categories`, `menu_items`, `orders`, `order_items`

To reset everything (wipe all data):

```bash
# Stop the server first, then:
del database\fastfood.db    # Windows
rm database/fastfood.db     # Mac/Linux
npm start                   # Re-creates with fresh seed data
```

---


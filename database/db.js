const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'fastfood.db');
const db = new sqlite3.Database(DB_PATH);

db.serialize(() => db.run('PRAGMA journal_mode = WAL'));

const run = (sql, params = []) => new Promise((resolve, reject) => {
  db.run(sql, params, function (err) {
    if (err) reject(err);
    else resolve(this);
  });
});

const get = (sql, params = []) => new Promise((resolve, reject) => {
  db.get(sql, params, (err, row) => {
    if (err) reject(err);
    else resolve(row);
  });
});

const all = (sql, params = []) => new Promise((resolve, reject) => {
  db.all(sql, params, (err, rows) => {
    if (err) reject(err);
    else resolve(rows);
  });
});

async function initSchema() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'cashier',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    emoji TEXT NOT NULL DEFAULT '🍽️',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  // migrate existing databases that don't have the emoji column yet
  await run(`ALTER TABLE categories ADD COLUMN emoji TEXT NOT NULL DEFAULT '🍽️'`).catch(() => {});

  await run(`CREATE TABLE IF NOT EXISTS menu_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    gst REAL NOT NULL DEFAULT 5,
    status TEXT NOT NULL DEFAULT 'active',
    FOREIGN KEY (category_id) REFERENCES categories(id)
  )`);

  await run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT UNIQUE NOT NULL,
    customer_name TEXT,
    mobile TEXT,
    order_type TEXT NOT NULL DEFAULT 'Dine In',
    table_number TEXT,
    subtotal REAL NOT NULL DEFAULT 0,
    gst REAL NOT NULL DEFAULT 0,
    discount REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'Cash',
    cash_received REAL,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  await run(`CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    gst REAL NOT NULL DEFAULT 5,
    total REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id)
  )`);

  await seedData();
}

async function seedData() {
  const adminExists = await get('SELECT id FROM users WHERE username = ?', ['admin']);
  if (adminExists) return;

  const adminHash = await bcrypt.hash('admin123', 10);
  const cashierHash = await bcrypt.hash('cashier123', 10);
  await run('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', ['admin', adminHash, 'admin']);
  await run('INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)', ['cashier', cashierHash, 'cashier']);

  const cats = [
    ['Burgers', '🍔'], ['Pizza', '🍕'], ['Sandwiches', '🥪'],
    ['Rolls', '🌯'], ['Drinks', '🥤'], ['Fries', '🍟'], ['Combo Meals', '🍱'],
  ];
  for (const [name, emoji] of cats) {
    await run('INSERT INTO categories (name, emoji) VALUES (?, ?)', [name, emoji]);
  }

  const items = [
    [1, 'Veg Burger', 80, 5], [1, 'Chicken Burger', 120, 5], [1, 'Paneer Burger', 100, 5], [1, 'Double Patty Burger', 150, 5],
    [2, 'Margherita Pizza', 150, 5], [2, 'Chicken BBQ Pizza', 220, 5], [2, 'Veggie Supreme Pizza', 180, 5],
    [3, 'Veg Sandwich', 60, 5], [3, 'Chicken Sandwich', 90, 5], [3, 'Club Sandwich', 110, 5],
    [4, 'Egg Roll', 80, 5], [4, 'Chicken Roll', 100, 5], [4, 'Paneer Roll', 90, 5],
    [5, 'Coke', 40, 12], [5, 'Pepsi', 40, 12], [5, 'Sprite', 40, 12], [5, 'Lassi', 60, 5], [5, 'Water', 20, 12],
    [6, 'Small Fries', 60, 5], [6, 'Medium Fries', 80, 5], [6, 'Large Fries', 100, 5],
    [7, 'Burger + Fries + Drink', 180, 5], [7, 'Pizza + Drink', 200, 5], [7, 'Sandwich + Fries', 130, 5],
  ];
  for (const [cat_id, name, price, gst] of items) {
    await run('INSERT INTO menu_items (category_id, name, price, gst) VALUES (?, ?, ?, ?)', [cat_id, name, price, gst]);
  }
}

initSchema().catch(console.error);

module.exports = { db, run, get, all };

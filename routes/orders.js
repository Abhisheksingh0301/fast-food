const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { run, get, all } = require('../database/db');
const { requireAuth } = require('../middleware/auth');

const UPI_ID = process.env.UPI_ID || '9239042405@ptyes';
const SHOP_NAME = process.env.SHOP_NAME || 'Fast Food Shop';

function generateOrderNumber() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0') + String(now.getSeconds()).padStart(2, '0');
  return `ORD${date}${time}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
}

// POS screen
router.get('/new', requireAuth, async (req, res) => {
  const [categories, items] = await Promise.all([
    all('SELECT * FROM categories ORDER BY name'),
    all(`SELECT m.*, c.name as category_name, c.emoji as category_emoji FROM menu_items m
         LEFT JOIN categories c ON m.category_id = c.id
         WHERE m.status = 'active' ORDER BY c.name, m.name`)
  ]);
  res.render('orders/pos', { title: 'New Order', categories, items });
});

// Create order
router.post('/', requireAuth, async (req, res) => {
  const { customer_name, mobile, order_type, table_number, discount, payment_method, cash_received, items } = req.body;

  let cartItems;
  try {
    cartItems = typeof items === 'string' ? JSON.parse(items) : items;
  } catch {
    return res.status(400).json({ error: 'Invalid cart data' });
  }

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const subtotal = cartItems.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const gstAmount = cartItems.reduce((sum, i) => sum + (i.price * i.quantity * i.gst / 100), 0);
  const discountAmt = parseFloat(discount) || 0;
  const total = subtotal + gstAmount - discountAmt;
  const orderNumber = generateOrderNumber();

  try {
    const result = await run(
      `INSERT INTO orders (order_number, customer_name, mobile, order_type, table_number, subtotal, gst, discount, total, payment_method, cash_received)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [orderNumber, customer_name || null, mobile || null, order_type || 'Dine In',
       table_number || null, subtotal, gstAmount, discountAmt, total, payment_method || 'Cash',
       payment_method === 'Cash' ? (parseFloat(cash_received) || total) : null]
    );
    const orderId = result.lastID;
    for (const item of cartItems) {
      await run(
        `INSERT INTO order_items (order_id, item_id, item_name, quantity, price, gst, total) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [orderId, item.id, item.name, item.quantity, item.price, item.gst, item.price * item.quantity]
      );
    }
    return res.json({ success: true, orderId, orderNumber });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save order' });
  }
});

// Order history
router.get('/', requireAuth, async (req, res) => {
  const { from, to, q, payment } = req.query;
  let sql = 'SELECT * FROM orders WHERE 1=1';
  const params = [];
  if (from) { sql += ' AND date(created_at) >= ?'; params.push(from); }
  if (to) { sql += ' AND date(created_at) <= ?'; params.push(to); }
  if (q) { sql += ' AND (order_number LIKE ? OR customer_name LIKE ? OR mobile LIKE ?)'; params.push(`%${q}%`, `%${q}%`, `%${q}%`); }
  if (payment) { sql += ' AND payment_method = ?'; params.push(payment); }
  sql += ' ORDER BY created_at DESC LIMIT 100';
  const orders = await all(sql, params);
  res.render('orders/history', { title: 'Order History', orders, query: req.query });
});

// Receipt view
router.get('/:id/receipt', requireAuth, async (req, res) => {
  const order = await get('SELECT * FROM orders WHERE id = ?', [req.params.id]);
  if (!order) return res.redirect('/orders');
  const orderItems = await all('SELECT * FROM order_items WHERE order_id = ?', [req.params.id]);

  let upiQrCode = null;
  if (order.payment_method === 'UPI') {
    const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(SHOP_NAME)}&am=${order.total.toFixed(2)}&cu=INR&tn=${encodeURIComponent('Order ' + order.order_number)}`;
    upiQrCode = await QRCode.toDataURL(upiString, { width: 200, margin: 1, errorCorrectionLevel: 'M' });
  }

  res.render('orders/receipt', { title: 'Receipt', order, orderItems, upiQrCode, upiId: UPI_ID });
});

// Cancel order (admin)
router.post('/:id/cancel', requireAuth, async (req, res) => {
  if (req.session.user.role !== 'admin') {
    req.flash('error', 'Admin access required.');
    return res.redirect('/orders');
  }
  await run("UPDATE orders SET status = 'cancelled' WHERE id = ?", [req.params.id]);
  req.flash('success', 'Order cancelled.');
  res.redirect('/orders');
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { get, all } = require('../database/db');
const { requireAuth } = require('../middleware/auth');

router.get('/', requireAuth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const todayOrders = await get(
      `SELECT COUNT(*) as count, COALESCE(SUM(total), 0) as revenue FROM orders WHERE date(created_at) = ?`, [today]
    );
    const totalItems = await get('SELECT COUNT(*) as count FROM menu_items WHERE status = ?', ['active']);
    const totalCategories = await get('SELECT COUNT(*) as count FROM categories');
    const recentOrders = await all(
      `SELECT id, order_number, customer_name, total, payment_method, created_at
       FROM orders ORDER BY created_at DESC LIMIT 8`
    );
    const hourlyData = await all(
      `SELECT strftime('%H', created_at) as hour, COUNT(*) as orders, SUM(total) as revenue
       FROM orders WHERE date(created_at) = ? GROUP BY hour ORDER BY hour`, [today]
    );
    res.render('dashboard/index', {
      title: 'Dashboard',
      todayOrders,
      totalItems,
      totalCategories,
      recentOrders,
      hourlyData
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { get, all } = require('../database/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/daily', requireAuth, requireAdmin, async (req, res) => {
  const date = req.query.date || new Date().toISOString().slice(0, 10);
  const [summary, paymentBreakdown, topItems, hourlyOrders] = await Promise.all([
    get(`SELECT COUNT(*) as total_orders, COALESCE(SUM(total),0) as revenue,
         COALESCE(SUM(gst),0) as total_gst, COALESCE(AVG(total),0) as avg_order
         FROM orders WHERE date(created_at) = ? AND status != 'cancelled'`, [date]),
    all(`SELECT payment_method, COUNT(*) as count, SUM(total) as amount
         FROM orders WHERE date(created_at) = ? AND status != 'cancelled'
         GROUP BY payment_method`, [date]),
    all(`SELECT oi.item_name, SUM(oi.quantity) as qty, SUM(oi.total) as revenue
         FROM order_items oi JOIN orders o ON oi.order_id = o.id
         WHERE date(o.created_at) = ? AND o.status != 'cancelled'
         GROUP BY oi.item_name ORDER BY qty DESC LIMIT 10`, [date]),
    all(`SELECT strftime('%H', created_at) as hour, COUNT(*) as count, SUM(total) as revenue
         FROM orders WHERE date(created_at) = ? AND status != 'cancelled'
         GROUP BY hour ORDER BY hour`, [date])
  ]);
  res.render('reports/daily', { title: 'Daily Report', date, summary, paymentBreakdown, topItems, hourlyOrders });
});

module.exports = router;

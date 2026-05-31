const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const { search, category, status } = req.query;
  let sql = `SELECT m.*, c.name as category_name FROM menu_items m
             LEFT JOIN categories c ON m.category_id = c.id WHERE 1=1`;
  const params = [];
  if (search) { sql += ' AND m.name LIKE ?'; params.push(`%${search}%`); }
  if (category) { sql += ' AND m.category_id = ?'; params.push(category); }
  if (status) { sql += ' AND m.status = ?'; params.push(status); }
  sql += ' ORDER BY c.name, m.name';
  const [items, categories] = await Promise.all([all(sql, params), all('SELECT * FROM categories ORDER BY name')]);
  res.render('menu/index', { title: 'Menu Items', items, categories, query: req.query });
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { name, category_id, price, gst, status } = req.body;
  try {
    await run('INSERT INTO menu_items (category_id, name, price, gst, status) VALUES (?, ?, ?, ?, ?)',
      [category_id, name.trim(), parseFloat(price), parseFloat(gst) || 5, status || 'active']);
    req.flash('success', 'Menu item added.');
  } catch (err) {
    req.flash('error', 'Failed to add item.');
  }
  res.redirect('/menu');
});

router.post('/:id/edit', requireAuth, requireAdmin, async (req, res) => {
  const { name, category_id, price, gst, status } = req.body;
  try {
    await run('UPDATE menu_items SET name=?, category_id=?, price=?, gst=?, status=? WHERE id=?',
      [name.trim(), category_id, parseFloat(price), parseFloat(gst) || 5, status, req.params.id]);
    req.flash('success', 'Item updated.');
  } catch (err) {
    req.flash('error', 'Failed to update item.');
  }
  res.redirect('/menu');
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await run('DELETE FROM menu_items WHERE id = ?', [req.params.id]);
  req.flash('success', 'Item deleted.');
  res.redirect('/menu');
});

router.post('/:id/toggle', requireAuth, requireAdmin, async (req, res) => {
  const item = await get('SELECT status FROM menu_items WHERE id = ?', [req.params.id]);
  const newStatus = item.status === 'active' ? 'inactive' : 'active';
  await run('UPDATE menu_items SET status = ? WHERE id = ?', [newStatus, req.params.id]);
  res.json({ status: newStatus });
});

module.exports = router;

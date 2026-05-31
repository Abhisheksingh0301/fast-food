const express = require('express');
const router = express.Router();
const { run, get, all } = require('../database/db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const categories = await all(
    `SELECT c.*, COUNT(m.id) as item_count FROM categories c
     LEFT JOIN menu_items m ON c.id = m.category_id GROUP BY c.id ORDER BY c.name`
  );
  res.render('categories/index', { title: 'Categories', categories });
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { name, emoji } = req.body;
  if (!name || !name.trim()) {
    req.flash('error', 'Category name is required.');
    return res.redirect('/categories');
  }
  try {
    await run('INSERT INTO categories (name, emoji) VALUES (?, ?)', [name.trim(), emoji || '🍽️']);
    req.flash('success', 'Category added successfully.');
  } catch (err) {
    req.flash('error', 'Category name already exists.');
  }
  res.redirect('/categories');
});

router.post('/:id/edit', requireAuth, requireAdmin, async (req, res) => {
  const { name, emoji } = req.body;
  try {
    await run('UPDATE categories SET name = ?, emoji = ? WHERE id = ?', [name.trim(), emoji || '🍽️', req.params.id]);
    req.flash('success', 'Category updated.');
  } catch (err) {
    req.flash('error', 'Failed to update category.');
  }
  res.redirect('/categories');
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const used = await get('SELECT id FROM menu_items WHERE category_id = ? LIMIT 1', [req.params.id]);
  if (used) {
    req.flash('error', 'Cannot delete category with menu items.');
    return res.redirect('/categories');
  }
  await run('DELETE FROM categories WHERE id = ?', [req.params.id]);
  req.flash('success', 'Category deleted.');
  res.redirect('/categories');
});

module.exports = router;

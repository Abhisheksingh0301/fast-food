const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { get } = require('../database/db');

router.get('/login', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  res.render('auth/login', { title: 'Login' });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/login');
    }
    req.session.user = { id: user.id, username: user.username, role: user.role };
    res.redirect('/dashboard');
  } catch (err) {
    req.flash('error', 'Login failed. Please try again.');
    res.redirect('/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;

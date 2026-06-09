const path = require('path');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FastFood POS & Billing System – Full Feature Documentation</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a2e;
    background: #fff;
  }

  /* ── COVER PAGE ── */
  .cover {
    height: 100vh;
    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 40%, #ffcc02 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    page-break-after: always;
    padding: 60px;
  }
  .cover .logo { font-size: 80pt; margin-bottom: 20px; }
  .cover h1 { font-size: 36pt; color: #fff; font-weight: 800; letter-spacing: -1px; text-shadow: 0 2px 8px rgba(0,0,0,0.2); }
  .cover h2 { font-size: 18pt; color: rgba(255,255,255,0.9); font-weight: 400; margin-top: 10px; }
  .cover .divider { width: 80px; height: 4px; background: rgba(255,255,255,0.6); border-radius: 2px; margin: 28px auto; }
  .cover .meta { color: rgba(255,255,255,0.85); font-size: 12pt; line-height: 2; }
  .cover .badge {
    margin-top: 36px;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.5);
    border-radius: 50px;
    padding: 8px 28px;
    color: #fff;
    font-size: 11pt;
    font-weight: 600;
    letter-spacing: 1px;
  }

  /* ── LAYOUT ── */
  .page { padding: 48px 56px; page-break-after: always; }
  .page:last-child { page-break-after: auto; }

  /* ── TOC ── */
  .toc-title { font-size: 22pt; font-weight: 800; color: #ff6b35; margin-bottom: 28px; padding-bottom: 10px; border-bottom: 3px solid #ff6b35; }
  .toc-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px dotted #ddd; }
  .toc-item a { text-decoration: none; color: #1a1a2e; font-size: 11pt; }
  .toc-item .toc-num { color: #ff6b35; font-weight: 700; font-size: 10pt; }
  .toc-section { font-weight: 700; font-size: 12pt; color: #ff6b35; margin-top: 16px; margin-bottom: 4px; }

  /* ── SECTION HEADERS ── */
  .section-header {
    background: linear-gradient(90deg, #ff6b35, #f7931e);
    color: #fff;
    padding: 14px 24px;
    border-radius: 8px;
    font-size: 16pt;
    font-weight: 800;
    margin-bottom: 24px;
    letter-spacing: 0.3px;
  }
  .section-num { opacity: 0.7; font-size: 13pt; margin-right: 8px; }
  h2 { font-size: 14pt; font-weight: 700; color: #ff6b35; margin: 24px 0 12px; padding-left: 12px; border-left: 4px solid #ff6b35; }
  h3 { font-size: 12pt; font-weight: 700; color: #1a1a2e; margin: 16px 0 8px; }
  h4 { font-size: 11pt; font-weight: 600; color: #444; margin: 12px 0 6px; }

  /* ── TABLES ── */
  table { width: 100%; border-collapse: collapse; margin: 14px 0 20px; font-size: 10pt; }
  thead tr { background: #ff6b35; color: #fff; }
  thead th { padding: 9px 12px; text-align: left; font-weight: 700; }
  tbody tr:nth-child(even) { background: #fff8f4; }
  tbody tr:hover { background: #fff3ec; }
  tbody td { padding: 8px 12px; border-bottom: 1px solid #f0e8e2; vertical-align: top; }
  .table-note { font-size: 9pt; color: #888; margin-top: -12px; margin-bottom: 14px; font-style: italic; }

  /* ── CARDS ── */
  .card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0; }
  .card {
    border: 1px solid #f0e0d6;
    border-radius: 10px;
    padding: 16px 20px;
    background: #fffaf7;
    border-left: 4px solid #ff6b35;
  }
  .card h4 { color: #ff6b35; margin: 0 0 8px; font-size: 11pt; }
  .card p, .card ul { font-size: 10pt; color: #444; }

  /* ── CODE BLOCKS ── */
  .code {
    background: #1a1a2e;
    color: #e8f4fd;
    padding: 16px 20px;
    border-radius: 8px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 9.5pt;
    line-height: 1.7;
    margin: 14px 0;
    overflow: hidden;
  }
  .code .key { color: #ff9f43; }
  .code .val { color: #55efc4; }
  .code .cmt { color: #636e72; font-style: italic; }

  /* ── BADGES & PILLS ── */
  .badge-admin { background: #e84393; color: #fff; padding: 2px 8px; border-radius: 20px; font-size: 8.5pt; font-weight: 700; }
  .badge-cashier { background: #0984e3; color: #fff; padding: 2px 8px; border-radius: 20px; font-size: 8.5pt; font-weight: 700; }
  .badge-get { background: #00b894; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 8pt; font-weight: 700; }
  .badge-post { background: #0984e3; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 8pt; font-weight: 700; }
  .badge-delete { background: #d63031; color: #fff; padding: 2px 8px; border-radius: 4px; font-size: 8pt; font-weight: 700; }
  .path { font-family: 'Consolas', monospace; background: #f5f5f5; padding: 1px 6px; border-radius: 3px; font-size: 9.5pt; color: #e84393; }

  /* ── LISTS ── */
  ul, ol { padding-left: 20px; margin: 8px 0; }
  li { margin: 4px 0; font-size: 10.5pt; }
  ul li::marker { color: #ff6b35; }

  /* ── HIGHLIGHT BOX ── */
  .highlight {
    background: linear-gradient(90deg, #fff9f5, #fff3ec);
    border: 1px solid #ffd4b8;
    border-left: 4px solid #f7931e;
    border-radius: 6px;
    padding: 14px 18px;
    margin: 14px 0;
    font-size: 10.5pt;
  }
  .info-box {
    background: #f0f9ff;
    border: 1px solid #bde0fa;
    border-left: 4px solid #0984e3;
    border-radius: 6px;
    padding: 14px 18px;
    margin: 14px 0;
    font-size: 10.5pt;
  }
  .warning-box {
    background: #fffbf0;
    border: 1px solid #ffeaa7;
    border-left: 4px solid #fdcb6e;
    border-radius: 6px;
    padding: 14px 18px;
    margin: 14px 0;
    font-size: 10.5pt;
  }

  /* ── FEATURE ROWS ── */
  .feature-row { display: flex; align-items: flex-start; gap: 14px; padding: 10px 0; border-bottom: 1px solid #f5ede8; }
  .feature-icon { font-size: 20pt; flex-shrink: 0; width: 36px; text-align: center; }
  .feature-body h4 { margin: 0 0 4px; font-size: 11pt; color: #1a1a2e; }
  .feature-body p { font-size: 10pt; color: #555; margin: 0; }

  /* ── FOOTER ── */
  .page-footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #eee; font-size: 8.5pt; color: #aaa; text-align: center; }

  /* ── PRINT ── */
  @media print {
    .cover { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .section-header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    thead tr { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .code { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }

  p { margin: 6px 0; font-size: 10.5pt; }
  .mt { margin-top: 20px; }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .three-col { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }

  .stat-card {
    background: linear-gradient(135deg, #ff6b35, #f7931e);
    border-radius: 10px;
    padding: 18px;
    color: #fff;
    text-align: center;
  }
  .stat-card .number { font-size: 24pt; font-weight: 800; }
  .stat-card .label { font-size: 9pt; opacity: 0.85; margin-top: 4px; }
</style>
</head>
<body>

<!-- ══════════════════ COVER PAGE ══════════════════ -->
<div class="cover">
  <div class="logo">🍔</div>
  <h1>FastFood POS</h1>
  <h2>Point-of-Sale &amp; Billing System</h2>
  <div class="divider"></div>
  <div class="meta">
    <strong>Full Feature Documentation</strong><br>
    Technology: Node.js · Express.js · SQLite3 · EJS · Tailwind CSS<br>
    Version: 1.0.0 &nbsp;|&nbsp; Generated: ${new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'long', year:'numeric' })}
  </div>
  <div class="badge">&#128274; Role-Based &nbsp;·&nbsp; &#129534; Thermal Receipt &nbsp;·&nbsp; &#128200; Analytics</div>
</div>

<!-- ══════════════════ TABLE OF CONTENTS ══════════════════ -->
<div class="page">
  <div class="toc-title">Table of Contents</div>

  <div class="toc-section">Overview &amp; Setup</div>
  <div class="toc-item"><a>1. Project Overview</a><span class="toc-num">3</span></div>
  <div class="toc-item"><a>2. Technology Stack</a><span class="toc-num">3</span></div>
  <div class="toc-item"><a>3. Installation &amp; Configuration</a><span class="toc-num">4</span></div>
  <div class="toc-item"><a>4. Database Schema</a><span class="toc-num">5</span></div>

  <div class="toc-section">Core Features</div>
  <div class="toc-item"><a>5. Authentication &amp; Role-Based Access</a><span class="toc-num">6</span></div>
  <div class="toc-item"><a>6. Dashboard</a><span class="toc-num">7</span></div>
  <div class="toc-item"><a>7. POS Ordering System</a><span class="toc-num">8</span></div>
  <div class="toc-item"><a>8. Cart Management</a><span class="toc-num">9</span></div>
  <div class="toc-item"><a>9. Payment Processing</a><span class="toc-num">10</span></div>
  <div class="toc-item"><a>10. Bill Generation &amp; Receipts</a><span class="toc-num">11</span></div>

  <div class="toc-section">Admin Features</div>
  <div class="toc-item"><a>11. Menu Management</a><span class="toc-num">12</span></div>
  <div class="toc-item"><a>12. Category Management</a><span class="toc-num">13</span></div>
  <div class="toc-item"><a>13. Order History &amp; Search</a><span class="toc-num">14</span></div>
  <div class="toc-item"><a>14. Daily Sales Reports</a><span class="toc-num">15</span></div>

  <div class="toc-section">Technical Reference</div>
  <div class="toc-item"><a>15. API Endpoints Reference</a><span class="toc-num">16</span></div>
  <div class="toc-item"><a>16. Frontend Architecture (pos.js)</a><span class="toc-num">18</span></div>
  <div class="toc-item"><a>17. Project File Structure</a><span class="toc-num">19</span></div>
  <div class="toc-item"><a>18. Default Seed Data</a><span class="toc-num">20</span></div>
</div>

<!-- ══════════════════ 1. PROJECT OVERVIEW ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">1</span>Project Overview</div>
  <p>
    <strong>FastFood POS &amp; Billing System</strong> is a complete, production-ready point-of-sale and billing solution built for fast food restaurants and food outlets. It provides an intuitive touchscreen-friendly ordering interface, thermal-printer-ready receipts with UPI QR codes, comprehensive inventory/menu management, and real-time daily sales analytics — all through a secure, role-based web interface accessible from any device on the local network.
  </p>

  <div class="card-grid mt">
    <div class="card">
      <h4>&#127979; For Cashiers</h4>
      <p>Quick order entry with category filters and keyboard shortcuts. Real-time cart with GST calculation. One-click bill generation with printable receipt. Order history lookup.</p>
    </div>
    <div class="card">
      <h4>&#128736; For Admins</h4>
      <p>Full menu &amp; category management. Activate/deactivate items instantly. View daily sales reports with payment breakdowns and top-selling items. Cancel orders.</p>
    </div>
    <div class="card">
      <h4>&#128247; Receipt &amp; Payment</h4>
      <p>80mm thermal-printer-ready layout. UPI QR code auto-generated on receipt. Cash change calculator. Supports Cash, UPI, and Card payments.</p>
    </div>
    <div class="card">
      <h4>&#128200; Analytics</h4>
      <p>Today's revenue, order count, and averages on the dashboard. Daily report with hourly breakdown, top 10 items, and payment method split.</p>
    </div>
  </div>

  <h2>Key Highlights</h2>
  <div class="feature-row">
    <div class="feature-icon">&#128241;</div>
    <div class="feature-body">
      <h4>Mobile-First Responsive Design</h4>
      <p>Works seamlessly on tablets, phones, and desktops. Bottom-sheet cart drawer on mobile, side cart on desktop.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#9889;</div>
    <div class="feature-body">
      <h4>Keyboard Shortcuts</h4>
      <p>Press <strong>/</strong> to focus search, <strong>Enter</strong> to add the top match to cart. Designed for high-speed order entry.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128274;</div>
    <div class="feature-body">
      <h4>Secure &amp; Role-Based</h4>
      <p>Bcrypt-hashed passwords, session-based auth, 8-hour expiry. Cashiers cannot access admin features.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#9889;</div>
    <div class="feature-body">
      <h4>Zero Setup Database</h4>
      <p>SQLite with WAL mode. Database and seed data created automatically on first run — no external DB server needed.</p>
    </div>
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 2. TECHNOLOGY STACK ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">2</span>Technology Stack</div>

  <table>
    <thead><tr><th>Layer</th><th>Technology</th><th>Version</th><th>Purpose</th></tr></thead>
    <tbody>
      <tr><td><strong>Runtime</strong></td><td>Node.js</td><td>v18+</td><td>Server-side JavaScript runtime</td></tr>
      <tr><td><strong>Framework</strong></td><td>Express.js</td><td>~4.16.1</td><td>Web application framework, routing</td></tr>
      <tr><td><strong>Template Engine</strong></td><td>EJS</td><td>~2.6.1</td><td>Server-side HTML rendering</td></tr>
      <tr><td><strong>Database</strong></td><td>SQLite3</td><td>^6.0.1</td><td>Embedded relational database (WAL mode)</td></tr>
      <tr><td><strong>Styling</strong></td><td>Tailwind CSS</td><td>CDN v3</td><td>Utility-first responsive CSS framework</td></tr>
      <tr><td><strong>Session Auth</strong></td><td>express-session</td><td>^1.19.0</td><td>User session management (8-hour expiry)</td></tr>
      <tr><td><strong>Password Hash</strong></td><td>bcryptjs</td><td>^3.0.3</td><td>Secure password hashing &amp; comparison</td></tr>
      <tr><td><strong>Flash Messages</strong></td><td>connect-flash</td><td>^0.1.1</td><td>One-time notification messages</td></tr>
      <tr><td><strong>QR Code</strong></td><td>qrcode</td><td>^1.5.4</td><td>UPI QR code generation on receipts</td></tr>
      <tr><td><strong>HTTP Override</strong></td><td>method-override</td><td>^3.0.0</td><td>PUT/DELETE via HTML forms</td></tr>
      <tr><td><strong>Logging</strong></td><td>morgan</td><td>~1.9.1</td><td>HTTP request logging</td></tr>
      <tr><td><strong>Env Config</strong></td><td>dotenv</td><td>^17.4.2</td><td>Environment variable management</td></tr>
    </tbody>
  </table>

  <h2>Architecture Pattern</h2>
  <p>The app follows the <strong>MVC (Model-View-Controller)</strong> pattern:</p>
  <div class="two-col">
    <div>
      <h3>Backend (Server-Side)</h3>
      <ul>
        <li><strong>Models</strong> — SQLite tables via <span class="path">database/db.js</span></li>
        <li><strong>Controllers</strong> — Express route handlers in <span class="path">routes/</span></li>
        <li><strong>Views</strong> — EJS templates in <span class="path">views/</span></li>
        <li><strong>Middleware</strong> — Auth guards in <span class="path">middleware/auth.js</span></li>
      </ul>
    </div>
    <div>
      <h3>Frontend (Client-Side)</h3>
      <ul>
        <li><strong>Tailwind CSS</strong> — responsive layouts &amp; components</li>
        <li><strong>Vanilla JS</strong> — cart state, totals, API calls</li>
        <li><strong>pos.js</strong> — full client-side POS logic</li>
        <li><strong>EJS partials</strong> — reusable UI components</li>
      </ul>
    </div>
  </div>

  <div class="info-box">
    <strong>&#128268; No Build Step Required</strong><br>
    This project uses Tailwind CSS via CDN and vanilla JavaScript — no webpack, no build process. Just <code>npm install</code> and <code>npm start</code>.
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 3. INSTALLATION & CONFIG ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">3</span>Installation &amp; Configuration</div>

  <h2>Quick Start</h2>
  <div class="code">
<span class="cmt"># Clone / navigate to project</span>
cd fast-food

<span class="cmt"># Install dependencies</span>
npm install

<span class="cmt"># Start the server (auto-creates database &amp; seed data)</span>
npm start

<span class="cmt"># Open in browser</span>
http://localhost:4000
  </div>

  <h2>NPM Scripts</h2>
  <table>
    <thead><tr><th>Script</th><th>Command</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><span class="path">npm start</span></td><td><code>node ./bin/www</code></td><td>Start server on port 4000</td></tr>
      <tr><td><span class="path">npm run kill</span></td><td><code>netstat / taskkill</code></td><td>Free port 4000 if occupied (Windows)</td></tr>
      <tr><td><span class="path">npm run fresh</span></td><td><code>kill + start</code></td><td>Kill existing process then start fresh</td></tr>
    </tbody>
  </table>

  <h2>Environment Variables (.env)</h2>
  <div class="code">
<span class="key">UPI_ID</span>=<span class="val">yourname@bank</span>          <span class="cmt"># UPI address printed on receipts</span>
<span class="key">SHOP_NAME</span>=<span class="val">Fast Food Shop</span>       <span class="cmt"># Shop name shown on receipts &amp; QR</span>
<span class="key">PORT</span>=<span class="val">4000</span>                      <span class="cmt"># HTTP server port</span>
<span class="key">SESSION_SECRET</span>=<span class="val">your-secret</span>    <span class="cmt"># Session encryption key (change in production!)</span>
  </div>

  <h2>Default Login Credentials</h2>
  <table>
    <thead><tr><th>Role</th><th>Username</th><th>Password</th><th>Access Level</th></tr></thead>
    <tbody>
      <tr>
        <td><span class="badge-admin">ADMIN</span></td>
        <td><span class="path">admin</span></td>
        <td><span class="path">admin123</span></td>
        <td>Full access: menu, categories, reports, order cancellation</td>
      </tr>
      <tr>
        <td><span class="badge-cashier">CASHIER</span></td>
        <td><span class="path">cashier</span></td>
        <td><span class="path">cashier123</span></td>
        <td>New orders, order history, receipt viewing</td>
      </tr>
    </tbody>
  </table>

  <div class="warning-box">
    <strong>&#9888; Security Note:</strong> Change the default passwords and SESSION_SECRET before deploying on a network accessible to customers or untrusted users. The default credentials are only for initial setup.
  </div>

  <h2>System Requirements</h2>
  <ul>
    <li>Node.js v18 or higher</li>
    <li>Windows / macOS / Linux</li>
    <li>~50 MB disk space (SQLite database grows with orders)</li>
    <li>Modern browser (Chrome, Firefox, Edge, Safari)</li>
    <li>Network access for staff to connect from POS terminals</li>
  </ul>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 4. DATABASE SCHEMA ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">4</span>Database Schema</div>

  <p>The application uses <strong>SQLite3</strong> with <strong>WAL (Write-Ahead Logging)</strong> mode for better read concurrency. The database is auto-created at <span class="path">database/fastfood.db</span> on first run.</p>

  <h2>Table: users</h2>
  <table>
    <thead><tr><th>Column</th><th>Type</th><th>Constraints</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>id</strong></td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td><td>Unique user identifier</td></tr>
      <tr><td><strong>username</strong></td><td>TEXT</td><td>UNIQUE NOT NULL</td><td>Login username</td></tr>
      <tr><td><strong>password_hash</strong></td><td>TEXT</td><td>NOT NULL</td><td>Bcrypt-hashed password</td></tr>
      <tr><td><strong>role</strong></td><td>TEXT</td><td>DEFAULT 'cashier'</td><td>Values: <code>admin</code> | <code>cashier</code></td></tr>
      <tr><td><strong>created_at</strong></td><td>DATETIME</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>Account creation timestamp</td></tr>
    </tbody>
  </table>

  <h2>Table: categories</h2>
  <table>
    <thead><tr><th>Column</th><th>Type</th><th>Constraints</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>id</strong></td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td><td>Category identifier</td></tr>
      <tr><td><strong>name</strong></td><td>TEXT</td><td>UNIQUE NOT NULL</td><td>Category display name (e.g. "Burgers")</td></tr>
      <tr><td><strong>emoji</strong></td><td>TEXT</td><td>DEFAULT '🍽️'</td><td>Emoji icon shown on POS screen</td></tr>
      <tr><td><strong>created_at</strong></td><td>DATETIME</td><td>DEFAULT CURRENT_TIMESTAMP</td><td>Category creation time</td></tr>
    </tbody>
  </table>

  <h2>Table: menu_items</h2>
  <table>
    <thead><tr><th>Column</th><th>Type</th><th>Constraints</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>id</strong></td><td>INTEGER</td><td>PRIMARY KEY AUTOINCREMENT</td><td>Item identifier</td></tr>
      <tr><td><strong>category_id</strong></td><td>INTEGER</td><td>NOT NULL, FOREIGN KEY</td><td>References categories.id</td></tr>
      <tr><td><strong>name</strong></td><td>TEXT</td><td>NOT NULL</td><td>Item name</td></tr>
      <tr><td><strong>price</strong></td><td>REAL</td><td>NOT NULL</td><td>Unit price in rupees</td></tr>
      <tr><td><strong>gst</strong></td><td>REAL</td><td>DEFAULT 5</td><td>GST percentage (e.g. 5 = 5%)</td></tr>
      <tr><td><strong>status</strong></td><td>TEXT</td><td>DEFAULT 'active'</td><td>Values: <code>active</code> | <code>inactive</code></td></tr>
    </tbody>
  </table>

  <h2>Table: orders</h2>
  <table>
    <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>id</strong></td><td>INTEGER PK</td><td>Auto-incremented order ID</td></tr>
      <tr><td><strong>order_number</strong></td><td>TEXT UNIQUE</td><td>Format: <code>ORD</code> + YYYYMMDDHHMMSS + 2 random digits</td></tr>
      <tr><td><strong>customer_name</strong></td><td>TEXT</td><td>Optional customer name</td></tr>
      <tr><td><strong>mobile</strong></td><td>TEXT</td><td>Optional mobile number</td></tr>
      <tr><td><strong>order_type</strong></td><td>TEXT</td><td>Dine In | Takeaway | Delivery</td></tr>
      <tr><td><strong>table_number</strong></td><td>TEXT</td><td>Optional table number (Dine In only)</td></tr>
      <tr><td><strong>subtotal</strong></td><td>REAL</td><td>Total before GST</td></tr>
      <tr><td><strong>gst</strong></td><td>REAL</td><td>Total GST amount collected</td></tr>
      <tr><td><strong>discount</strong></td><td>REAL</td><td>Discount applied (₹)</td></tr>
      <tr><td><strong>total</strong></td><td>REAL</td><td>Final payable amount</td></tr>
      <tr><td><strong>payment_method</strong></td><td>TEXT</td><td>Cash | UPI | Card</td></tr>
      <tr><td><strong>cash_received</strong></td><td>REAL</td><td>Cash tendered (cash payments only)</td></tr>
      <tr><td><strong>status</strong></td><td>TEXT</td><td>completed | cancelled</td></tr>
      <tr><td><strong>created_at</strong></td><td>DATETIME</td><td>Order timestamp</td></tr>
    </tbody>
  </table>

  <h2>Table: order_items</h2>
  <table>
    <thead><tr><th>Column</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>id</strong></td><td>INTEGER PK</td><td>Auto-incremented</td></tr>
      <tr><td><strong>order_id</strong></td><td>INTEGER FK</td><td>References orders.id</td></tr>
      <tr><td><strong>item_id</strong></td><td>INTEGER</td><td>Original menu item ID (snapshot)</td></tr>
      <tr><td><strong>item_name</strong></td><td>TEXT</td><td>Name at time of order (immutable)</td></tr>
      <tr><td><strong>quantity</strong></td><td>INTEGER</td><td>Number of units ordered</td></tr>
      <tr><td><strong>price</strong></td><td>REAL</td><td>Unit price at time of order</td></tr>
      <tr><td><strong>gst</strong></td><td>REAL</td><td>GST % at time of order</td></tr>
      <tr><td><strong>total</strong></td><td>REAL</td><td>quantity × price (subtotal)</td></tr>
    </tbody>
  </table>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 5. AUTHENTICATION ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">5</span>Authentication &amp; Role-Based Access Control</div>

  <h2>Authentication Flow</h2>
  <ol>
    <li>User visits any route → middleware checks session for <code>req.session.user</code></li>
    <li>If not logged in → redirected to <span class="path">/login</span></li>
    <li>On login form submit → username &amp; bcrypt password compared against <span class="path">users</span> table</li>
    <li>On success → user object stored in session, redirect to <span class="path">/dashboard</span></li>
    <li>On failure → flash error message shown on login page</li>
    <li>Session expires after <strong>8 hours</strong> of inactivity (configurable via <code>maxAge</code>)</li>
  </ol>

  <h2>Middleware Guards</h2>
  <table>
    <thead><tr><th>Middleware</th><th>File</th><th>Applied To</th><th>Behavior</th></tr></thead>
    <tbody>
      <tr>
        <td><code>requireAuth</code></td>
        <td><span class="path">middleware/auth.js</span></td>
        <td>All routes except <code>/login</code></td>
        <td>Redirects unauthenticated users to <span class="path">/login</span></td>
      </tr>
      <tr>
        <td><code>requireAdmin</code></td>
        <td><span class="path">middleware/auth.js</span></td>
        <td>Admin-only routes</td>
        <td>Returns 403 Forbidden for non-admin users</td>
      </tr>
    </tbody>
  </table>

  <h2>Role-Based Feature Access</h2>
  <table>
    <thead><tr><th>Feature</th><th><span class="badge-admin">ADMIN</span></th><th><span class="badge-cashier">CASHIER</span></th></tr></thead>
    <tbody>
      <tr><td>Login / Logout</td><td>✅</td><td>✅</td></tr>
      <tr><td>Dashboard</td><td>✅</td><td>✅</td></tr>
      <tr><td>New Order (POS)</td><td>✅</td><td>✅</td></tr>
      <tr><td>View Order History</td><td>✅</td><td>✅</td></tr>
      <tr><td>View Receipt</td><td>✅</td><td>✅</td></tr>
      <tr><td>Cancel Order</td><td>✅</td><td>❌</td></tr>
      <tr><td>Menu Item Management</td><td>✅</td><td>❌</td></tr>
      <tr><td>Category Management</td><td>✅</td><td>❌</td></tr>
      <tr><td>Daily Sales Report</td><td>✅</td><td>❌</td></tr>
    </tbody>
  </table>

  <h2>Security Features</h2>
  <div class="card-grid">
    <div class="card">
      <h4>&#128274; Password Security</h4>
      <p>All passwords hashed with <strong>bcryptjs</strong>. Plain-text passwords never stored. bcrypt's built-in salt prevents rainbow table attacks.</p>
    </div>
    <div class="card">
      <h4>&#128203; Session Security</h4>
      <p>Sessions signed with a <code>SESSION_SECRET</code> key. Configurable expiry. Sessions stored server-side (memory store).</p>
    </div>
    <div class="card">
      <h4>&#128683; Route Protection</h4>
      <p>Every route applies <code>requireAuth</code>. Admin routes additionally apply <code>requireAdmin</code>. 403 returned on unauthorized access.</p>
    </div>
    <div class="card">
      <h4>&#128260; Flash Messages</h4>
      <p>One-time session messages for login errors, success confirmations, and validation feedback. Auto-cleared after display.</p>
    </div>
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 6. DASHBOARD ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">6</span>Dashboard</div>

  <p>The dashboard at <span class="path">/dashboard</span> is the home screen after login. It provides a real-time snapshot of today's business activity.</p>

  <h2>Today's Stats Cards</h2>
  <div class="three-col mt">
    <div class="stat-card">
      <div class="number">&#128230;</div>
      <div class="label">Total Orders Today</div>
    </div>
    <div class="stat-card">
      <div class="number">&#8377;</div>
      <div class="label">Revenue Today (INR)</div>
    </div>
    <div class="stat-card">
      <div class="number">&#127869;</div>
      <div class="label">Active Menu Items</div>
    </div>
  </div>

  <h2 class="mt">Dashboard Components</h2>

  <div class="feature-row">
    <div class="feature-icon">&#128200;</div>
    <div class="feature-body">
      <h4>Statistics Cards</h4>
      <p>Four cards showing: Total orders today, Today's revenue (₹ Indian locale format), Active menu items count, Total categories count. Revenue excludes cancelled orders.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#9889;</div>
    <div class="feature-body">
      <h4>Quick Actions Panel</h4>
      <p>Prominent "New Order" button for cashiers. Links to "View All Orders" and "Daily Report" (admin only). One-click navigation to most-used features.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128203;</div>
    <div class="feature-body">
      <h4>Recent Orders Table</h4>
      <p>Shows the 10 most recent orders with: Order number (clickable → receipt), customer name, payment method badge, total amount, and relative time. Empty state shown if no orders today.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128678;</div>
    <div class="feature-body">
      <h4>Responsive Navigation Sidebar</h4>
      <p>Desktop: full sidebar with icons and labels. Mobile: top bar with menu icon. Nav items show only accessible routes based on user role.</p>
    </div>
  </div>

  <h2>Dashboard SQL Queries</h2>
  <table>
    <thead><tr><th>Stat</th><th>Query Logic</th></tr></thead>
    <tbody>
      <tr><td>Today's Orders</td><td>COUNT of orders WHERE status='completed' AND date(created_at) = today</td></tr>
      <tr><td>Today's Revenue</td><td>SUM(total) WHERE status='completed' AND date(created_at) = today</td></tr>
      <tr><td>Active Items</td><td>COUNT of menu_items WHERE status='active'</td></tr>
      <tr><td>Categories</td><td>COUNT of all categories</td></tr>
      <tr><td>Recent Orders</td><td>SELECT last 10 completed orders with JOIN on items</td></tr>
    </tbody>
  </table>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 7. POS ORDERING SYSTEM ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">7</span>POS Ordering System</div>

  <p>The POS screen at <span class="path">/orders/new</span> is the core feature of the application. It is optimized for fast order entry on both desktop and mobile/tablet devices.</p>

  <h2>Menu Browsing</h2>
  <div class="feature-row">
    <div class="feature-icon">&#128193;</div>
    <div class="feature-body">
      <h4>Category Filter Tabs</h4>
      <p>Horizontal scrollable row of category buttons with emoji icons. "All" tab shows every active item. Clicking a category instantly filters the grid. Active category is highlighted in orange.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128269;</div>
    <div class="feature-body">
      <h4>Real-Time Search</h4>
      <p>Search box filters menu items by name as you type. Works across all categories simultaneously. Press <strong>/</strong> anywhere to focus the search box. Press <strong>Escape</strong> to clear search. Press <strong>Enter</strong> to add the first matching item to cart.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#127869;</div>
    <div class="feature-body">
      <h4>Menu Item Cards</h4>
      <p>Responsive grid of item cards showing name and price. Click any card to add to cart. Card flashes orange to confirm the add. Only active items are shown. Items in cart show a count badge.</p>
    </div>
  </div>

  <h2>Customer Information (Optional)</h2>
  <table>
    <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td>Customer Name</td><td>Text input</td><td>Optional — shown on receipt if entered</td></tr>
      <tr><td>Mobile Number</td><td>Number input</td><td>Optional — printed on receipt for reference</td></tr>
      <tr><td>Order Type</td><td>Dropdown</td><td>Dine In / Takeaway / Delivery</td></tr>
      <tr><td>Table Number</td><td>Text input</td><td>Visible only when Order Type = "Dine In"</td></tr>
    </tbody>
  </table>

  <h2>Responsive Layout</h2>
  <div class="two-col">
    <div>
      <h3>&#128421; Desktop / Tablet</h3>
      <ul>
        <li>Two-column layout</li>
        <li>Menu grid on the left (main area)</li>
        <li>Cart panel fixed on the right</li>
        <li>Cart always visible while browsing</li>
        <li>Wide category filter bar at top</li>
      </ul>
    </div>
    <div>
      <h3>&#128241; Mobile</h3>
      <ul>
        <li>Full-width menu grid</li>
        <li>Cart icon in top bar shows item count badge</li>
        <li>Tap cart icon → bottom sheet slides up</li>
        <li>Drag handle on sheet for touch gesture</li>
        <li>Cart overlays menu (dismissable)</li>
      </ul>
    </div>
  </div>

  <div class="highlight">
    <strong>&#9889; Speed Tip:</strong> Cashiers can enter a full order using only the keyboard: press <strong>/</strong> to focus search, type item name, press <strong>Enter</strong> to add, repeat. No mouse required for common items.
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 8. CART MANAGEMENT ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">8</span>Cart Management</div>

  <h2>Cart Features</h2>

  <div class="feature-row">
    <div class="feature-icon">&#10133;</div>
    <div class="feature-body">
      <h4>Add Items</h4>
      <p>Click any menu card to add. If item already in cart, quantity increments by 1. Visual flash confirms the add. Cart total updates instantly.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128290;</div>
    <div class="feature-body">
      <h4>Adjust Quantities</h4>
      <p>Each cart item has − and + buttons. Click − to decrement (removes item at 0). Click + to increment. Quick quantity presets available for bulk orders (e.g. 100, 500 units for high-volume items).</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#10060;</div>
    <div class="feature-body">
      <h4>Remove Items</h4>
      <p>Each cart row has a remove (×) button for direct deletion. Quantity going below 1 via the − button also removes the item.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128465;</div>
    <div class="feature-body">
      <h4>Clear Cart</h4>
      <p>Clear all button empties the entire cart. Confirmation dialog prevents accidental clears.</p>
    </div>
  </div>

  <h2>Price Calculation</h2>
  <table>
    <thead><tr><th>Field</th><th>Formula</th><th>Notes</th></tr></thead>
    <tbody>
      <tr><td><strong>Item Subtotal</strong></td><td>quantity × unit price</td><td>Shown per line in cart</td></tr>
      <tr><td><strong>Subtotal</strong></td><td>Sum of all item subtotals</td><td>Before tax</td></tr>
      <tr><td><strong>GST</strong></td><td>Each item: (qty × price × gst%) / 100, summed</td><td>Per-item GST rate configured in menu</td></tr>
      <tr><td><strong>Discount</strong></td><td>Manual entry in ₹</td><td>Deducted from total</td></tr>
      <tr><td><strong>Total</strong></td><td>Subtotal + GST − Discount</td><td>Final payable amount</td></tr>
      <tr><td><strong>Change</strong></td><td>Cash Received − Total</td><td>Only shown for Cash payments</td></tr>
    </tbody>
  </table>

  <h2>Discount &amp; Cash Change</h2>
  <div class="two-col">
    <div>
      <h3>Discount</h3>
      <ul>
        <li>Enter discount amount in ₹ directly</li>
        <li>Total recalculates in real-time</li>
        <li>Discount is stored with the order record</li>
        <li>Visible on printed receipt</li>
      </ul>
    </div>
    <div>
      <h3>Cash Change Calculator</h3>
      <ul>
        <li>Visible only when Cash payment selected</li>
        <li>Enter cash received by customer</li>
        <li>Change due shown instantly</li>
        <li>Cash received stored with order</li>
      </ul>
    </div>
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 9. PAYMENT PROCESSING ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">9</span>Payment Processing</div>

  <p>The system supports three payment methods, selectable via toggle buttons in the cart/billing panel before generating the bill.</p>

  <h2>Payment Methods</h2>

  <div class="card-grid">
    <div class="card">
      <h4>&#128181; Cash</h4>
      <ul>
        <li>Most common method</li>
        <li>Enter cash received by customer</li>
        <li>Change due calculated &amp; shown instantly</li>
        <li>Cash received stored in <code>orders.cash_received</code></li>
        <li>Change printed on receipt</li>
      </ul>
    </div>
    <div class="card">
      <h4>&#128247; UPI</h4>
      <ul>
        <li>Generates QR code on receipt</li>
        <li>QR encodes full UPI deep-link</li>
        <li>Customer scans with any UPI app</li>
        <li>UPI ID configured in <code>.env</code></li>
        <li>No cash entry needed</li>
      </ul>
    </div>
    <div class="card">
      <h4>&#128179; Card</h4>
      <ul>
        <li>Simple flag — no POS terminal integration</li>
        <li>Records payment as "Card"</li>
        <li>No additional fields required</li>
        <li>Card label shown on receipt</li>
      </ul>
    </div>
  </div>

  <h2>UPI QR Code Generation</h2>
  <p>When payment method is UPI, the receipt displays a scannable QR code. The QR code is generated using the <strong>qrcode</strong> npm package and encodes:</p>
  <div class="code">
<span class="cmt"># UPI Payment URL format</span>
upi://pay?<span class="key">pa</span>=<span class="val">{UPI_ID}</span>&<span class="key">pn</span>=<span class="val">{SHOP_NAME}</span>&<span class="key">am</span>=<span class="val">{ORDER_TOTAL}</span>&<span class="key">cu</span>=<span class="val">INR</span>

<span class="cmt"># Example</span>
upi://pay?pa=yourshop@bank&pn=Fast+Food+Shop&am=350.00&cu=INR
  </div>
  <div class="info-box">
    The QR code is generated server-side as a Base64 Data URL and embedded directly in the receipt HTML — no external service is called. Works offline.
  </div>

  <h2>Payment Method in Reporting</h2>
  <p>All three payment methods are tracked in the database and included in the daily sales report's payment breakdown, showing count and total amount per method with percentage bars.</p>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 10. RECEIPTS ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">10</span>Bill Generation &amp; Receipts</div>

  <h2>Bill Generation Process</h2>
  <ol>
    <li>Cashier clicks <strong>"Generate Bill"</strong> button in cart panel</li>
    <li>Client-side JS posts cart JSON to <span class="path">POST /orders</span></li>
    <li>Server validates, stores order + items in database</li>
    <li>Unique order number generated: <code>ORD</code> + YYYYMMDDHHMMSS + 2 random digits</li>
    <li>If UPI payment: QR code Data URL generated with <strong>qrcode</strong> library</li>
    <li>Browser redirected to <span class="path">/orders/{id}/receipt</span></li>
    <li>Receipt rendered in browser — user clicks <strong>Print</strong></li>
  </ol>

  <h2>Receipt Contents</h2>
  <table>
    <thead><tr><th>Section</th><th>Content</th></tr></thead>
    <tbody>
      <tr><td><strong>Header</strong></td><td>Shop name (from <code>SHOP_NAME</code> env), "TAX INVOICE" label</td></tr>
      <tr><td><strong>Order Info</strong></td><td>Order number, date &amp; time</td></tr>
      <tr><td><strong>Customer Info</strong></td><td>Name, mobile (if provided)</td></tr>
      <tr><td><strong>Order Type</strong></td><td>Dine In / Takeaway / Delivery, table number if applicable</td></tr>
      <tr><td><strong>Item List</strong></td><td>Item name, qty × unit price = line total</td></tr>
      <tr><td><strong>Pricing</strong></td><td>Subtotal, GST amount, discount, <strong>Grand Total</strong></td></tr>
      <tr><td><strong>Payment</strong></td><td>Payment method, cash received, change due</td></tr>
      <tr><td><strong>UPI QR</strong></td><td>Scannable QR code (only for UPI orders)</td></tr>
      <tr><td><strong>Footer</strong></td><td>"Thank you for visiting!" message</td></tr>
    </tbody>
  </table>

  <h2>Thermal Printer Support</h2>
  <div class="highlight">
    The receipt is designed for <strong>80mm thermal printers</strong>. It uses a narrow-width layout, monospace-friendly fonts, and print-optimized CSS. When printed from Chrome/Edge, it produces a clean thermal receipt with no headers/footers/margins.
  </div>
  <ul>
    <li>Max width: 80mm (print media query override)</li>
    <li>Sidebar, navigation, buttons hidden on print</li>
    <li>High contrast black &amp; white output</li>
    <li>Dotted separator lines between sections</li>
    <li>Centered alignment for header and totals</li>
  </ul>

  <h2>Unique Order Numbers</h2>
  <div class="code">
<span class="cmt"># Format: ORD + YYYYMMDDHHMMSSxx (18 characters)</span>
<span class="val">ORD20240615143052</span><span class="key">47</span>

<span class="cmt"># YYYYMMDDHHMMSS = date/time of creation</span>
<span class="cmt"># xx = random 2-digit suffix (10-99) for collision avoidance</span>
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 11. MENU MANAGEMENT ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">11</span>Menu Management <span style="font-size:11pt; font-weight:400; opacity:0.8;">(Admin Only)</span></div>

  <p>Accessible at <span class="path">/menu</span>. Allows admins to manage the full menu catalog — adding, editing, toggling, and removing items.</p>

  <h2>Add / Edit Menu Item</h2>
  <table>
    <thead><tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Name</strong></td><td>Text</td><td>Yes</td><td>Item display name shown on POS &amp; receipts</td></tr>
      <tr><td><strong>Category</strong></td><td>Dropdown</td><td>Yes</td><td>Assigns item to a category for filtering</td></tr>
      <tr><td><strong>Price</strong></td><td>Number (₹)</td><td>Yes</td><td>Unit selling price in Indian Rupees</td></tr>
      <tr><td><strong>GST %</strong></td><td>Number (%)</td><td>No</td><td>Per-item tax rate, default 5%</td></tr>
      <tr><td><strong>Status</strong></td><td>Toggle</td><td>Auto</td><td>Active (visible on POS) or Inactive (hidden)</td></tr>
    </tbody>
  </table>

  <h2>Menu Item Features</h2>
  <div class="feature-row">
    <div class="feature-icon">&#128269;</div>
    <div class="feature-body">
      <h4>Search &amp; Filter</h4>
      <p>Search by name, filter by category, filter by status (active/inactive). Helps manage large menus quickly.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#9889;</div>
    <div class="feature-body">
      <h4>Quick Status Toggle</h4>
      <p>Toggle switch on each item row calls <span class="path">POST /menu/:id/toggle</span> via AJAX. No page reload — instant availability control. Useful for "sold out" scenarios.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128260;</div>
    <div class="feature-body">
      <h4>Edit in Place</h4>
      <p>Edit button opens a form pre-filled with item data. Submit updates via <span class="path">POST /menu/:id/edit</span>. Updated item appears immediately.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128465;</div>
    <div class="feature-body">
      <h4>Delete Item</h4>
      <p>Delete button removes item via <span class="path">DELETE /menu/:id</span>. Item removed from POS menu immediately. Historical order data is preserved (order_items stores name snapshot).</p>
    </div>
  </div>

  <div class="warning-box">
    <strong>&#9888; Note on Deletion:</strong> Deleting a menu item does not affect past orders — the item name and price are stored as a snapshot in <code>order_items.item_name</code> and <code>order_items.price</code> at order time.
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 12. CATEGORY MANAGEMENT ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">12</span>Category Management <span style="font-size:11pt; font-weight:400; opacity:0.8;">(Admin Only)</span></div>

  <p>Accessible at <span class="path">/categories</span>. Organize menu items into browsable groups shown as filter tabs on the POS screen.</p>

  <h2>Category Features</h2>

  <div class="feature-row">
    <div class="feature-icon">&#10133;</div>
    <div class="feature-body">
      <h4>Add Category</h4>
      <p>Enter a category name and select an emoji from the picker grid. The emoji appears as an icon next to the category name on the POS filter tabs.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128257;</div>
    <div class="feature-body">
      <h4>Emoji Picker</h4>
      <p>A grid of preset food-related emojis (🍔🍕🥪🌯🥤🍟🍱🍣🍜🍩 etc.) with a click-to-select interface. Custom emoji can also be typed directly. Makes POS navigation visually intuitive.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#9999;</div>
    <div class="feature-body">
      <h4>Edit Category</h4>
      <p>Update category name and/or emoji. Changes reflected immediately on the POS screen category filter tabs.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128465;</div>
    <div class="feature-body">
      <h4>Delete Category (Safe)</h4>
      <p>A category can only be deleted if it has <strong>zero menu items</strong> linked to it. Prevents orphaned items. Shows an error if items exist in the category.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128202;</div>
    <div class="feature-body">
      <h4>Item Count Display</h4>
      <p>Each category card shows the count of menu items assigned to it. Helps identify empty or large categories at a glance.</p>
    </div>
  </div>

  <h2>Default Categories (Seed Data)</h2>
  <table>
    <thead><tr><th>Category</th><th>Emoji</th><th>Sample Items</th></tr></thead>
    <tbody>
      <tr><td>Burgers</td><td>🍔</td><td>Veg, Chicken, Paneer, Double Patty</td></tr>
      <tr><td>Pizza</td><td>🍕</td><td>Margherita, BBQ Chicken, Veggie Supreme</td></tr>
      <tr><td>Sandwiches</td><td>🥪</td><td>Veg, Chicken Club, Grilled</td></tr>
      <tr><td>Rolls</td><td>🌯</td><td>Egg Roll, Chicken Roll, Paneer Roll</td></tr>
      <tr><td>Drinks</td><td>🥤</td><td>Coke, Pepsi, Sprite, Lassi, Water</td></tr>
      <tr><td>Fries</td><td>🍟</td><td>Small, Medium, Large Fries</td></tr>
      <tr><td>Combo Meals</td><td>🍱</td><td>Burger+Fries+Drink, Combo A/B/C</td></tr>
    </tbody>
  </table>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 13. ORDER HISTORY ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">13</span>Order History &amp; Search</div>

  <p>Accessible at <span class="path">/orders</span>. Lists recent orders with powerful filtering to find any past order.</p>

  <h2>Search &amp; Filter Options</h2>
  <table>
    <thead><tr><th>Filter</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Search Query</strong></td><td>Text input</td><td>Searches order number, customer name, and mobile number. Case-insensitive partial match.</td></tr>
      <tr><td><strong>Date From</strong></td><td>Date picker</td><td>Show orders on or after this date</td></tr>
      <tr><td><strong>Date To</strong></td><td>Date picker</td><td>Show orders on or before this date</td></tr>
      <tr><td><strong>Payment Method</strong></td><td>Dropdown</td><td>Filter by Cash / UPI / Card (or All)</td></tr>
    </tbody>
  </table>

  <h2>Order History Table Columns</h2>
  <table>
    <thead><tr><th>Column</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Order #</strong></td><td>Clickable link → opens receipt page</td></tr>
      <tr><td><strong>Date &amp; Time</strong></td><td>Order creation timestamp (formatted)</td></tr>
      <tr><td><strong>Customer</strong></td><td>Customer name or "—" if not provided</td></tr>
      <tr><td><strong>Type</strong></td><td>Dine In / Takeaway / Delivery badge</td></tr>
      <tr><td><strong>Payment</strong></td><td>Cash / UPI / Card badge with color coding</td></tr>
      <tr><td><strong>Total</strong></td><td>Final order amount in ₹</td></tr>
      <tr><td><strong>Status</strong></td><td>Completed (green) / Cancelled (red) badge</td></tr>
      <tr><td><strong>Actions</strong></td><td>View receipt button; Cancel button (admin only)</td></tr>
    </tbody>
  </table>

  <h2>Order Cancellation</h2>
  <div class="highlight">
    <strong>Admin Only Feature.</strong> Any completed order can be cancelled via <span class="path">POST /orders/:id/cancel</span>. The order status is set to <code>cancelled</code> — it is <strong>not deleted</strong>. Cancelled orders are excluded from revenue calculations but remain visible in history for audit purposes.
  </div>

  <h2>Pagination &amp; Limits</h2>
  <p>The history view returns up to <strong>100 most recent orders</strong> by default (descending by created_at). Filters reduce this set further. For large deployments, this ensures page load performance remains fast.</p>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 14. DAILY REPORTS ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">14</span>Daily Sales Reports <span style="font-size:11pt; font-weight:400; opacity:0.8;">(Admin Only)</span></div>

  <p>Accessible at <span class="path">/reports/daily</span>. Select any date to view a comprehensive breakdown of that day's sales.</p>

  <h2>Report Sections</h2>

  <h3>Summary Statistics</h3>
  <table>
    <thead><tr><th>Metric</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Total Orders</strong></td><td>Count of completed orders for the selected date</td></tr>
      <tr><td><strong>Total Revenue</strong></td><td>Sum of all completed order totals (incl. GST)</td></tr>
      <tr><td><strong>GST Collected</strong></td><td>Sum of all GST amounts for the day</td></tr>
      <tr><td><strong>Average Order Value</strong></td><td>Total Revenue ÷ Total Orders</td></tr>
    </tbody>
  </table>

  <h3>Payment Method Breakdown</h3>
  <ul>
    <li>Count and total amount per payment method (Cash / UPI / Card)</li>
    <li>Percentage of total revenue per method</li>
    <li>Visual progress bar showing relative share</li>
    <li>Helps understand customer payment preferences</li>
  </ul>

  <h3>Top 10 Selling Items</h3>
  <ul>
    <li>Ranked by quantity sold (descending)</li>
    <li>Shows: rank, item name, total quantity sold, total revenue from item</li>
    <li>Aggregated from all completed orders on that date</li>
    <li>Useful for inventory planning and identifying bestsellers</li>
  </ul>

  <h3>Hourly Sales Chart</h3>
  <ul>
    <li>Breaks down orders and revenue by hour of day (00:00–23:00)</li>
    <li>Shows peak and off-peak hours visually</li>
    <li>Helps with staffing decisions and prep scheduling</li>
    <li>Only hours with at least one order are shown</li>
  </ul>

  <h2>Date Selection</h2>
  <p>A date picker at the top of the report defaults to today's date. Select any past date to view historical data. The URL updates with the selected date for bookmarking/sharing.</p>

  <div class="info-box">
    <strong>&#128200; Analytics are real-time:</strong> The report queries the live database — there is no pre-computed cache. Revenue figures are always accurate to the current moment.
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 15. API ENDPOINTS ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">15</span>API Endpoints Reference</div>

  <h2>Authentication Routes</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Access</th></tr></thead>
    <tbody>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/login</span></td><td>Render login page</td><td>Public</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/login</span></td><td>Authenticate user, create session</td><td>Public</td></tr>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/logout</span></td><td>Destroy session, redirect to login</td><td>Auth</td></tr>
    </tbody>
  </table>

  <h2>Dashboard Routes</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Access</th></tr></thead>
    <tbody>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/dashboard</span></td><td>Dashboard with today's stats &amp; recent orders</td><td>Auth</td></tr>
    </tbody>
  </table>

  <h2>Category Routes</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Access</th></tr></thead>
    <tbody>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/categories</span></td><td>List all categories with item counts</td><td>Admin</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/categories</span></td><td>Create new category</td><td>Admin</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/categories/:id/edit</span></td><td>Update category name &amp; emoji</td><td>Admin</td></tr>
      <tr><td><span class="badge-delete">DELETE</span></td><td><span class="path">/categories/:id</span></td><td>Delete category (fails if items exist)</td><td>Admin</td></tr>
    </tbody>
  </table>

  <h2>Menu Routes</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Access</th></tr></thead>
    <tbody>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/menu</span></td><td>List menu items with search/filter</td><td>Admin</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/menu</span></td><td>Create new menu item</td><td>Admin</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/menu/:id/edit</span></td><td>Update menu item details</td><td>Admin</td></tr>
      <tr><td><span class="badge-delete">DELETE</span></td><td><span class="path">/menu/:id</span></td><td>Delete menu item</td><td>Admin</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/menu/:id/toggle</span></td><td>Toggle active/inactive status (JSON API)</td><td>Admin</td></tr>
    </tbody>
  </table>

  <h2>Order Routes</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Access</th></tr></thead>
    <tbody>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/orders/new</span></td><td>Render POS ordering screen</td><td>Auth</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/orders</span></td><td>Create order, returns JSON {orderId}</td><td>Auth</td></tr>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/orders</span></td><td>Order history with search/filter</td><td>Auth</td></tr>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/orders/:id/receipt</span></td><td>View printable receipt (UPI QR if applicable)</td><td>Auth</td></tr>
      <tr><td><span class="badge-post">POST</span></td><td><span class="path">/orders/:id/cancel</span></td><td>Cancel order (status → cancelled)</td><td>Admin</td></tr>
    </tbody>
  </table>

  <h2>Report Routes</h2>
  <table>
    <thead><tr><th>Method</th><th>Path</th><th>Description</th><th>Access</th></tr></thead>
    <tbody>
      <tr><td><span class="badge-get">GET</span></td><td><span class="path">/reports/daily</span></td><td>Daily report for selected date</td><td>Admin</td></tr>
    </tbody>
  </table>

  <h2>POST /orders — Request Body</h2>
  <div class="code">
{
  <span class="key">"customer_name"</span>: <span class="val">"Raj Kumar"</span>,        <span class="cmt">// optional</span>
  <span class="key">"mobile"</span>: <span class="val">"9876543210"</span>,             <span class="cmt">// optional</span>
  <span class="key">"order_type"</span>: <span class="val">"Dine In"</span>,            <span class="cmt">// "Dine In" | "Takeaway" | "Delivery"</span>
  <span class="key">"table_number"</span>: <span class="val">"T5"</span>,              <span class="cmt">// optional</span>
  <span class="key">"payment_method"</span>: <span class="val">"Cash"</span>,          <span class="cmt">// "Cash" | "UPI" | "Card"</span>
  <span class="key">"cash_received"</span>: <span class="val">500</span>,              <span class="cmt">// only for Cash</span>
  <span class="key">"discount"</span>: <span class="val">20</span>,                    <span class="cmt">// optional, default 0</span>
  <span class="key">"items"</span>: [
    { <span class="key">"id"</span>: <span class="val">3</span>, <span class="key">"name"</span>: <span class="val">"Veg Burger"</span>, <span class="key">"price"</span>: <span class="val">80</span>, <span class="key">"gst"</span>: <span class="val">5</span>, <span class="key">"qty"</span>: <span class="val">2</span> },
    { <span class="key">"id"</span>: <span class="val">15</span>, <span class="key">"name"</span>: <span class="val">"Coke"</span>, <span class="key">"price"</span>: <span class="val">40</span>, <span class="key">"gst"</span>: <span class="val">12</span>, <span class="key">"qty"</span>: <span class="val">2</span> }
  ]
}
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 16. FRONTEND ARCHITECTURE ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">16</span>Frontend Architecture (pos.js)</div>

  <p>The POS screen's client-side logic lives in <span class="path">public/js/pos.js</span>. It manages all cart state, UI interactions, and the order submission flow entirely in-browser.</p>

  <h2>State Variables</h2>
  <table>
    <thead><tr><th>Variable</th><th>Type</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>cart</code></td><td>Array</td><td>Array of cart items: <code>{id, name, price, gst, qty}</code></td></tr>
      <tr><td><code>paymentMethod</code></td><td>String</td><td>Selected payment: <code>'Cash'</code> | <code>'UPI'</code> | <code>'Card'</code></td></tr>
      <tr><td><code>activeCat</code></td><td>Number/null</td><td>Currently selected category ID (null = All)</td></tr>
      <tr><td><code>cartOpen</code></td><td>Boolean</td><td>Mobile cart drawer visibility state</td></tr>
    </tbody>
  </table>

  <h2>Key Functions</h2>
  <table>
    <thead><tr><th>Function</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><code>addToCart(item)</code></td><td>Add item or increment quantity. Triggers card flash animation.</td></tr>
      <tr><td><code>changeQty(itemId, delta)</code></td><td>Adjust quantity by delta. Removes item if qty reaches 0.</td></tr>
      <tr><td><code>removeItem(itemId)</code></td><td>Remove specific item from cart entirely.</td></tr>
      <tr><td><code>clearCart()</code></td><td>Prompt confirmation then empty entire cart.</td></tr>
      <tr><td><code>filterCategory(catId)</code></td><td>Set activeCat, call applyFilters() to re-render grid.</td></tr>
      <tr><td><code>applyFilters()</code></td><td>Apply both category and search text filters to menu grid.</td></tr>
      <tr><td><code>setupSearch()</code></td><td>Bind input event for live search. Enter key adds top result.</td></tr>
      <tr><td><code>setupKeyboard()</code></td><td>Global '/' key → focus search. Escape → clear search.</td></tr>
      <tr><td><code>renderCart()</code></td><td>Re-render cart item list with qty controls and line totals.</td></tr>
      <tr><td><code>updateTotals()</code></td><td>Calculate and display subtotal, GST, discount, total, change.</td></tr>
      <tr><td><code>setPayment(method)</code></td><td>Update paymentMethod, toggle button styles, show/hide cash field.</td></tr>
      <tr><td><code>generateBill()</code></td><td>POST cart JSON to /orders API, redirect to receipt on success.</td></tr>
      <tr><td><code>openCart()</code></td><td>Show mobile bottom-sheet cart drawer with slide animation.</td></tr>
      <tr><td><code>closeCart()</code></td><td>Hide mobile cart drawer.</td></tr>
    </tbody>
  </table>

  <h2>Event Flow: Adding an Item</h2>
  <ol>
    <li>User clicks a menu card (or presses Enter in search)</li>
    <li><code>addToCart(item)</code> called with item data</li>
    <li>Cart array updated (push new item or increment qty)</li>
    <li><code>renderCart()</code> re-renders cart list HTML</li>
    <li><code>updateTotals()</code> recalculates all price fields</li>
    <li>Card element flashes orange for 300ms (visual feedback)</li>
    <li>Mobile: cart badge count updates</li>
  </ol>

  <h2>Event Flow: Generating Bill</h2>
  <ol>
    <li>Cashier clicks "Generate Bill"</li>
    <li>Validates cart is non-empty</li>
    <li><code>generateBill()</code> collects form data + cart</li>
    <li>Sends <code>POST /orders</code> with JSON body</li>
    <li>On success (200): redirects to <code>/orders/{id}/receipt</code></li>
    <li>On error: shows alert with error message</li>
  </ol>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 17. FILE STRUCTURE ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">17</span>Project File Structure</div>

  <div class="code">
fast-food/
<span class="key">├── bin/</span>
<span class="val">│   └── www</span>                        <span class="cmt"># HTTP server entry point (port 4000)</span>
<span class="key">├── database/</span>
<span class="val">│   ├── db.js</span>                      <span class="cmt"># SQLite init, schema, seed data</span>
<span class="val">│   └── fastfood.db</span>                <span class="cmt"># Auto-created SQLite database file</span>
<span class="key">├── middleware/</span>
<span class="val">│   └── auth.js</span>                    <span class="cmt"># requireAuth, requireAdmin guards</span>
<span class="key">├── public/</span>
<span class="val">│   ├── js/</span>
<span class="val">│   │   └── pos.js</span>                 <span class="cmt"># POS client-side logic (cart, filters, API)</span>
<span class="val">│   └── stylesheets/</span>
<span class="val">│       └── style.css</span>              <span class="cmt"># Custom CSS overrides</span>
<span class="key">├── routes/</span>
<span class="val">│   ├── auth.js</span>                    <span class="cmt"># GET/POST /login, GET /logout</span>
<span class="val">│   ├── dashboard.js</span>               <span class="cmt"># GET /dashboard</span>
<span class="val">│   ├── categories.js</span>              <span class="cmt"># CRUD for categories</span>
<span class="val">│   ├── menu.js</span>                    <span class="cmt"># CRUD for menu items, toggle API</span>
<span class="val">│   ├── orders.js</span>                  <span class="cmt"># POS new order, create, history, receipt, cancel</span>
<span class="val">│   └── reports.js</span>                 <span class="cmt"># GET /reports/daily</span>
<span class="key">├── views/</span>
<span class="val">│   ├── auth/login.ejs</span>             <span class="cmt"># Login form</span>
<span class="val">│   ├── categories/index.ejs</span>        <span class="cmt"># Category management UI</span>
<span class="val">│   ├── dashboard/index.ejs</span>         <span class="cmt"># Home with stats &amp; recent orders</span>
<span class="val">│   ├── menu/index.ejs</span>             <span class="cmt"># Menu item management UI</span>
<span class="val">│   ├── orders/</span>
<span class="val">│   │   ├── pos.ejs</span>               <span class="cmt"># Main POS ordering screen</span>
<span class="val">│   │   ├── history.ejs</span>           <span class="cmt"># Order history &amp; search</span>
<span class="val">│   │   └── receipt.ejs</span>           <span class="cmt"># Printable receipt (80mm thermal)</span>
<span class="val">│   ├── reports/daily.ejs</span>          <span class="cmt"># Daily analytics report</span>
<span class="val">│   └── partials/</span>
<span class="val">│       ├── head.ejs</span>              <span class="cmt"># HTML head, Tailwind CDN</span>
<span class="val">│       ├── sidebar.ejs</span>           <span class="cmt"># Navigation sidebar</span>
<span class="val">│       ├── footer.ejs</span>            <span class="cmt"># Page footer</span>
<span class="val">│       └── _emoji_grid.ejs</span>       <span class="cmt"># Emoji picker component</span>
<span class="key">├── .env</span>                           <span class="cmt"># UPI_ID, SHOP_NAME, PORT, SESSION_SECRET</span>
<span class="key">├── app.js</span>                         <span class="cmt"># Express app setup, middleware, routes</span>
<span class="key">└── package.json</span>                   <span class="cmt"># Dependencies &amp; npm scripts</span>
  </div>

  <h2>Key Architectural Decisions</h2>
  <div class="feature-row">
    <div class="feature-icon">&#128204;</div>
    <div class="feature-body">
      <h4>WAL Mode for SQLite</h4>
      <p>Write-Ahead Logging enabled for better read/write concurrency — prevents database locks during simultaneous order creation and report queries.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128204;</div>
    <div class="feature-body">
      <h4>Order Item Snapshots</h4>
      <p>Order items store name and price at time of order, not just a foreign key. This preserves historical accuracy even if menu items are later edited or deleted.</p>
    </div>
  </div>
  <div class="feature-row">
    <div class="feature-icon">&#128204;</div>
    <div class="feature-body">
      <h4>Method Override</h4>
      <p>HTML forms only support GET/POST. The <code>method-override</code> middleware allows DELETE requests via a hidden <code>_method</code> field, enabling RESTful routes without JavaScript fetch.</p>
    </div>
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation</div>
</div>

<!-- ══════════════════ 18. SEED DATA ══════════════════ -->
<div class="page">
  <div class="section-header"><span class="section-num">18</span>Default Seed Data</div>

  <p>On first run, <span class="path">database/db.js</span> automatically seeds the database with 2 users, 7 categories, and 23 menu items if the tables are empty.</p>

  <h2>Menu Items by Category</h2>

  <h3>🍔 Burgers</h3>
  <table>
    <thead><tr><th>Item</th><th>Price</th><th>GST</th></tr></thead>
    <tbody>
      <tr><td>Veg Burger</td><td>₹80</td><td>5%</td></tr>
      <tr><td>Chicken Burger</td><td>₹120</td><td>5%</td></tr>
      <tr><td>Paneer Burger</td><td>₹100</td><td>5%</td></tr>
      <tr><td>Double Patty Burger</td><td>₹150</td><td>5%</td></tr>
    </tbody>
  </table>

  <div class="two-col">
    <div>
      <h3>🍕 Pizza</h3>
      <table>
        <thead><tr><th>Item</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Margherita</td><td>₹150</td></tr>
          <tr><td>BBQ Chicken</td><td>₹220</td></tr>
          <tr><td>Veggie Supreme</td><td>₹180</td></tr>
        </tbody>
      </table>

      <h3>🥪 Sandwiches</h3>
      <table>
        <thead><tr><th>Item</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Veg Sandwich</td><td>₹60</td></tr>
          <tr><td>Chicken Sandwich</td><td>₹90</td></tr>
          <tr><td>Club Sandwich</td><td>₹110</td></tr>
        </tbody>
      </table>

      <h3>🌯 Rolls</h3>
      <table>
        <thead><tr><th>Item</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Egg Roll</td><td>₹80</td></tr>
          <tr><td>Chicken Roll</td><td>₹100</td></tr>
          <tr><td>Paneer Roll</td><td>₹90</td></tr>
        </tbody>
      </table>
    </div>
    <div>
      <h3>🥤 Drinks</h3>
      <table>
        <thead><tr><th>Item</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Coke</td><td>₹40</td></tr>
          <tr><td>Pepsi</td><td>₹40</td></tr>
          <tr><td>Sprite</td><td>₹40</td></tr>
          <tr><td>Lassi</td><td>₹60</td></tr>
          <tr><td>Water Bottle</td><td>₹20</td></tr>
        </tbody>
      </table>

      <h3>🍟 Fries</h3>
      <table>
        <thead><tr><th>Item</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Small Fries</td><td>₹60</td></tr>
          <tr><td>Medium Fries</td><td>₹80</td></tr>
          <tr><td>Large Fries</td><td>₹100</td></tr>
        </tbody>
      </table>

      <h3>🍱 Combo Meals</h3>
      <table>
        <thead><tr><th>Item</th><th>Price</th></tr></thead>
        <tbody>
          <tr><td>Combo A (Burger+Fries+Drink)</td><td>₹180</td></tr>
          <tr><td>Combo B (Chicken+Fries+Drink)</td><td>₹200</td></tr>
          <tr><td>Veg Combo</td><td>₹130</td></tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="info-box">
    <strong>&#128161; Customization:</strong> All seed data can be replaced via the Admin panel without touching code. Add your own categories with custom emojis, set your real prices, and deactivate any items not on your menu.
  </div>

  <div class="highlight" style="margin-top: 40px; text-align: center; font-size: 11pt;">
    <strong>FastFood POS &amp; Billing System</strong><br>
    Built with Node.js · Express · SQLite · Tailwind CSS<br>
    <span style="color: #ff6b35;">&#127869; Designed for speed, simplicity, and reliability &#127869;</span>
  </div>

  <div class="page-footer">FastFood POS &amp; Billing System — Full Feature Documentation &nbsp;·&nbsp; End of Document</div>
</div>

</body>
</html>`;

async function generatePDF() {
  const { default: puppeteer } = await import('puppeteer');
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  console.log('Setting HTML content...');
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const outputPath = path.join(__dirname, 'FastFood-POS-Documentation.pdf');
  console.log('Generating PDF...');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-size:8px; color:#aaa; width:100%; text-align:center; padding: 0 20px; font-family: Arial, sans-serif;">
        FastFood POS &amp; Billing System — Feature Documentation &nbsp;|&nbsp;
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>`,
  });

  await browser.close();
  console.log('✅ PDF generated: ' + outputPath);
}

generatePDF().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});

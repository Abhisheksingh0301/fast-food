// ─── State ────────────────────────────────────────────────────────────────────
let cart = [];
let paymentMethod = 'Cash';
let activeCat = 'all';
let cartOpen = false;

// ─── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  updateTotals();
  setupSearch();
  setupKeyboard();
  setInterval(() => {
    const el = document.getElementById('posTime');
    if (el) el.textContent = new Date().toLocaleTimeString('en-IN');
  }, 1000);

  document.getElementById('discountInput').addEventListener('input', updateTotals);
  document.getElementById('cashReceived').addEventListener('input', updateChange);
});

// ─── Mobile cart drawer ───────────────────────────────────────────────────────
function openCart() {
  cartOpen = true;
  const panel = document.getElementById('cartPanel');
  const backdrop = document.getElementById('cartBackdrop');
  if (panel) { panel.classList.remove('translate-y-full'); }
  if (backdrop) { backdrop.classList.remove('opacity-0', 'pointer-events-none'); }
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  cartOpen = false;
  const panel = document.getElementById('cartPanel');
  const backdrop = document.getElementById('cartBackdrop');
  if (panel) { panel.classList.add('translate-y-full'); }
  if (backdrop) { backdrop.classList.add('opacity-0', 'pointer-events-none'); }
  document.body.style.overflow = '';
}

// ─── Category filtering ───────────────────────────────────────────────────────
function filterCategory(catId) {
  activeCat = catId;
  document.querySelectorAll('.cat-tab').forEach(btn => {
    const active = btn.dataset.cat === String(catId);
    btn.className = btn.className
      .replace(/bg-orange-500\s+text-white/g, '')
      .replace(/bg-gray-100\s+text-gray-600(\s+hover:bg-gray-200)?/g, '');
    btn.classList.add(...(active
      ? ['bg-orange-500', 'text-white']
      : ['bg-gray-100', 'text-gray-600', 'hover:bg-gray-200']));
  });
  applyFilters();
}

function applyFilters() {
  const q = document.getElementById('searchBox').value.toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll('#menuGrid button[data-cat]').forEach(card => {
    const show = (activeCat === 'all' || card.dataset.cat === String(activeCat))
               && (!q || card.dataset.name.includes(q));
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  const noResults = document.getElementById('noResults');
  if (noResults) noResults.classList.toggle('hidden', visible > 0);
}

// ─── Search ───────────────────────────────────────────────────────────────────
function setupSearch() {
  const box = document.getElementById('searchBox');
  box.addEventListener('input', applyFilters);
  box.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const first = document.querySelector('#menuGrid button[data-cat]:not([style*="none"])');
      if (first) { first.click(); box.value = ''; applyFilters(); }
    }
    if (e.key === 'Escape') { box.value = ''; applyFilters(); }
  });
}

function setupKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== document.getElementById('searchBox')
        && !['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      const box = document.getElementById('searchBox');
      box.focus(); box.select();
    }
  });
}

// ─── Cart operations ──────────────────────────────────────────────────────────
function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.quantity++;
  else cart.push({ ...item, quantity: 1 });
  flashCard(item.id);
  renderCart();
  updateTotals();
}

function changeQty(itemId, delta) {
  const idx = cart.findIndex(c => c.id === itemId);
  if (idx === -1) return;
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  renderCart();
  updateTotals();
}

function removeItem(itemId) {
  cart = cart.filter(c => c.id !== itemId);
  renderCart();
  updateTotals();
}

function toggleCustomerInfo() {
  const panel = document.getElementById('customerInfo');
  const chevron = document.getElementById('customerChevron');
  const hidden = panel.classList.toggle('hidden');
  if (chevron) chevron.style.transform = hidden ? '' : 'rotate(180deg)';
}

function clearCart() {
  if (cart.length === 0) return;
  if (!confirm('Clear all items from cart?')) return;
  cart = [];
  renderCart();
  updateTotals();
}

function flashCard(itemId) {
  const card = document.getElementById(`card-${itemId}`);
  if (!card) return;
  card.classList.add('added-flash');
  setTimeout(() => card.classList.remove('added-flash'), 400);
}

// ─── Render cart ─────────────────────────────────────────────────────────────
function renderCart() {
  const container = document.getElementById('cartItems');
  const empty = document.getElementById('emptyCart');
  const totalQty = cart.reduce((s, i) => s + i.quantity, 0);

  // Desktop cart count
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = totalQty;

  // Mobile badge (top bar icon)
  const badge = document.getElementById('cartBadge');
  if (badge) {
    badge.textContent = totalQty;
    badge.classList.toggle('hidden', totalQty === 0);
  }

  // Mobile FAB bar
  const fabBtn = document.getElementById('mobileFabBtn');
  if (fabBtn) {
    fabBtn.classList.toggle('hidden', totalQty === 0);
    const fabCount = document.getElementById('fabCartCount');
    if (fabCount) fabCount.textContent = totalQty;
  }

  if (cart.length === 0) {
    if (empty) empty.style.display = '';
    if (container) container.innerHTML = '';
    return;
  }
  if (empty) empty.style.display = 'none';

  if (container) {
    container.innerHTML = cart.map(item => `
      <div class="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 transition-colors">
        <div class="flex-1 min-w-0">
          <div class="text-xs font-semibold text-gray-800 truncate">${item.name}</div>
          <div class="text-xs text-gray-400">₹${item.price} × ${item.quantity} = <span class="font-medium text-gray-600">₹${(item.price * item.quantity).toFixed(2)}</span></div>
        </div>
        <div class="flex items-center gap-1 shrink-0">
          <button onclick="changeQty(${item.id}, -1)"
            class="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 font-bold text-base flex items-center justify-center">−</button>
          <span class="w-6 text-center text-xs font-bold text-gray-700">${item.quantity}</span>
          <button onclick="changeQty(${item.id}, 1)"
            class="w-7 h-7 rounded-full bg-gray-100 hover:bg-green-100 hover:text-green-600 text-gray-600 font-bold text-base flex items-center justify-center">+</button>
          <button onclick="removeItem(${item.id})"
            class="w-5 h-5 rounded-full hover:bg-red-100 hover:text-red-500 text-gray-300 font-bold text-xs flex items-center justify-center ml-1">✕</button>
        </div>
      </div>
    `).join('');
  }
}

// ─── Totals ───────────────────────────────────────────────────────────────────
function updateTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const gst = cart.reduce((s, i) => s + (i.price * i.quantity * i.gst / 100), 0);
  const discount = parseFloat(document.getElementById('discountInput').value) || 0;
  const total = Math.max(0, subtotal + gst - discount);

  document.getElementById('subtotalDisplay').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('gstDisplay').textContent = `₹${gst.toFixed(2)}`;
  document.getElementById('totalDisplay').textContent = `₹${total.toFixed(2)}`;

  // Mobile FAB total
  const fabTotal = document.getElementById('fabCartTotal');
  if (fabTotal) fabTotal.textContent = `₹${total.toFixed(2)}`;

  updateChange();
}

function updateChange() {
  const total = getTotal();
  const received = parseFloat(document.getElementById('cashReceived').value) || 0;
  document.getElementById('changeDisplay').textContent = `₹${Math.max(0, received - total).toFixed(2)}`;
}

function getTotal() {
  return parseFloat(document.getElementById('totalDisplay').textContent.replace('₹', '')) || 0;
}

// ─── Payment method ───────────────────────────────────────────────────────────
function setPayment(method) {
  paymentMethod = method;
  ['Cash', 'UPI', 'Card'].forEach(m => {
    const btn = document.getElementById(`pay-${m}`);
    if (!btn) return;
    const colorMap = { Cash: ['border-green-500','bg-green-500'], UPI: ['border-blue-500','bg-blue-500'], Card: ['border-purple-500','bg-purple-500'] };
    // Reset
    btn.className = btn.className
      .replace(/border-(green|blue|purple)-500/g, 'border-gray-200')
      .replace(/bg-(green|blue|purple)-500/g, 'bg-white')
      .replace(/text-white/g, 'text-gray-600');
    if (m === method) {
      btn.classList.remove('border-gray-200', 'bg-white', 'text-gray-600');
      btn.classList.add(...colorMap[m], 'text-white');
    }
  });
  const cashSection = document.getElementById('cashSection');
  if (cashSection) cashSection.style.display = method === 'Cash' ? '' : 'none';
}

function setCash(amount) { document.getElementById('cashReceived').value = amount; updateChange(); }
function setExact() { document.getElementById('cashReceived').value = Math.ceil(getTotal()); updateChange(); }

// ─── Generate Bill ────────────────────────────────────────────────────────────
async function generateBill() {
  if (cart.length === 0) { alert('Please add items to cart first.'); return; }
  const btn = document.getElementById('generateBillBtn');
  btn.disabled = true;
  btn.textContent = '⏳ Processing...';

  const payload = {
    customer_name: document.getElementById('customerName').value.trim(),
    mobile: document.getElementById('customerMobile').value.trim(),
    order_type: document.getElementById('orderType').value,
    table_number: document.getElementById('tableNumber').value.trim(),
    discount: document.getElementById('discountInput').value || '0',
    payment_method: paymentMethod,
    cash_received: document.getElementById('cashReceived').value || '0',
    items: JSON.stringify(cart)
  };

  try {
    const resp = await fetch('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(payload)
    });
    const data = await resp.json();
    if (data.success) {
      window.location.href = `/orders/${data.orderId}/receipt`;
    } else {
      alert('Error: ' + (data.error || 'Failed to create order'));
      btn.disabled = false;
      btn.textContent = '🧾 Generate Bill';
    }
  } catch {
    alert('Network error. Please try again.');
    btn.disabled = false;
    btn.textContent = '🧾 Generate Bill';
  }
}

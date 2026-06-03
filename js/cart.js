/* Oni Nets — Cart Manager
   Uses localStorage key 'oni-cart'
   All methods are on the Cart namespace.
*/

const Cart = (() => {
  const KEY = 'oni-cart';

  function get() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
  }

  function add(product) {
    const items = get();
    const existing = items.find(item => item.id === product.id);
    if (existing) {
      existing.qty += (product.qty || 1);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: product.qty || 1
      });
    }
    save(items);
  }

  function remove(id) {
    const items = get().filter(item => item.id !== id);
    save(items);
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      remove(id);
      return;
    }
    const items = get();
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = qty;
      save(items);
    }
  }

  function total() {
    return get().reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function count() {
    return get().reduce((sum, item) => sum + item.qty, 0);
  }

  function updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const n = count();
    badge.textContent = n;
    badge.style.display = n > 0 ? 'flex' : 'none';
  }

  function clear() {
    localStorage.removeItem(KEY);
    updateBadge();
  }

  return { get, save, add, remove, updateQty, total, count, updateBadge, clear };
})();

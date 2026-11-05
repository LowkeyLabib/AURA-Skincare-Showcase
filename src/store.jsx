import { createContext, useContext, useEffect, useState } from 'react';
import { products } from './data';
const StoreContext = createContext(null);
function read(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } }
const findProduct = id => products.find(p => p.id === id);
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = read('aura-cart', []);
    return Array.isArray(saved) ? saved.filter(item => item && findProduct(item.id)?.variants.some(v => v.label === item.variant) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 99).filter((item, i, all) => all.findIndex(x => x.id === item.id && x.variant === item.variant) === i) : [];
  });
  const [wishlist, setWishlist] = useState(() => { const saved = read('aura-wishlist', []); return Array.isArray(saved) ? [...new Set(saved.filter(id => findProduct(id)))] : []; });
  const [toast, setToast] = useState('');
  const [storageWarning, setStorageWarning] = useState(false);
  useEffect(() => { try { localStorage.setItem('aura-cart', JSON.stringify(cart)); localStorage.setItem('aura-wishlist', JSON.stringify(wishlist)); } catch { setStorageWarning(true); } }, [cart, wishlist]);
  useEffect(() => { if (toast) { const timer = setTimeout(() => setToast(''), 3500); return () => clearTimeout(timer); } }, [toast]);
  function addToCart(product, variant = product.variants[0], quantity = 1) {
    setCart(previous => {
      const existing = previous.find(item => item.id === product.id && item.variant === variant.label);
      return existing ? previous.map(item => item === existing ? { ...item, quantity: Math.min(99, item.quantity + quantity) } : item) : [...previous, { id: product.id, variant: variant.label, quantity: Math.min(99, quantity) }];
    });
    setToast(`${product.name} added to your bag.`);
  }
  function toggleWishlist(id) { setWishlist(previous => previous.includes(id) ? previous.filter(x => x !== id) : [...previous, id]); }
  function updateQuantity(id, variant, quantity) { setCart(previous => quantity <= 0 ? previous.filter(x => x.id !== id || x.variant !== variant) : previous.map(x => x.id === id && x.variant === variant ? { ...x, quantity: Math.min(99, quantity) } : x)); }
  return <StoreContext.Provider value={{ cart, wishlist, addToCart, toggleWishlist, updateQuantity, toast, setToast, storageWarning }}>{children}</StoreContext.Provider>;
}
export const useStore = () => useContext(StoreContext);

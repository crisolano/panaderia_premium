import { useCallback, useEffect, useState } from 'react';
import { products, type Product } from '@/data/site';

export interface CartItem extends Product {
  quantity: number;
}

const STORAGE_KEY = 'bakery-cart-v2';
export const MAX_QTY = 99;

const clampQty = (n: number) => Math.min(MAX_QTY, Math.max(0, Math.floor(n)));

// Solo se guarda { id, quantity }; nombre y precio se leen siempre del catálogo
// actual, así un precio viejo o un dato alterado en localStorage no llega al pedido.
function loadCart(): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    const items: CartItem[] = [];
    for (const entry of parsed) {
      const product = products.find((p) => p.id === entry?.id);
      const quantity = clampQty(Number(entry?.quantity));
      // Los pedidos personalizados se cotizan por WhatsApp, no van al carrito.
      if (product && product.category !== 'pedidos-personalizados' && quantity > 0) {
        items.push({ ...product, quantity });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items.map(({ id, quantity }) => ({ id, quantity })))
      );
    } catch {
      /* storage lleno o no disponible */
    }
  }, [items]);

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: clampQty(i.quantity + qty) } : i
        );
      }
      return [...prev, { ...product, quantity: clampQty(qty) }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: clampQty(quantity) } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  // El total solo existe si todos los productos tienen precio confirmado.
  const totalPrice = items.every((i) => i.price !== undefined)
    ? items.reduce((sum, i) => sum + (i.price ?? 0) * i.quantity, 0)
    : null;

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clear,
    totalItems,
    totalPrice,
  };
}

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

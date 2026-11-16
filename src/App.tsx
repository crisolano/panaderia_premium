import { useCallback } from 'react';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/data/site';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Products } from '@/components/Products';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CustomOrder } from '@/components/CustomOrder';

export default function App() {
  const cart = useCart();

  const handleAdd = useCallback(
    (product: Product) => {
      cart.addItem(product);
    },
    [cart]
  );

  const handleExplore = useCallback(() => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-cream-100">
      <Header cartCount={cart.totalItems} onCartClick={() => cart.setIsOpen(true)} />

      <main>
        <Hero onExplore={handleExplore} />
        <About />
        <Products onAdd={handleAdd} />
        <CustomOrder />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <CartDrawer
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        totalItems={cart.totalItems}
        totalPrice={cart.totalPrice}
        onUpdateQty={cart.updateQuantity}
        onRemove={cart.removeItem}
        onClear={cart.clear}
      />
    </div>
  );
}

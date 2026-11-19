import { useCallback, useEffect } from 'react';
import { scrollToSection, startSmoothScroll } from '@/lib/smoothScroll';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/data/site';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { ScrollStory } from '@/components/ScrollStory';
import { Products } from '@/components/Products';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CustomOrder } from '@/components/CustomOrder';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';

export default function App() {
  const cart = useCart();

  useEffect(startSmoothScroll, []);

  const handleAdd = useCallback(
    (product: Product) => {
      cart.addItem(product);
    },
    [cart]
  );

  const handleExplore = useCallback(() => {
    scrollToSection('productos');
  }, []);

  const handleQuote = useCallback(() => {
    scrollToSection('personalizar');
  }, []);

  return (
    <div className="min-h-screen bg-cream-100">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-crema-50 focus:px-4 focus:py-2 focus:text-cafe-500 focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Header cartCount={cart.totalItems} onCartClick={() => cart.setIsOpen(true)} />

      <main id="contenido" tabIndex={-1} className="focus:outline-none">
        <Hero onExplore={handleExplore} />
        <ScrollStory />
        <About />
        <Products onAdd={handleAdd} onQuote={handleQuote} />
        <CustomOrder />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />

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

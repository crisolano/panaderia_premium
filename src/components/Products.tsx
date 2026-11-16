import { useMemo, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import AnimatedContent from '@/components/reactbits/AnimatedContent';
import { products, categories, siteConfig, waLink, type Category, type Product } from '@/data/site';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  onAdd: (product: Product) => void;
  onQuote: () => void;
}

export function Products({ onAdd, onQuote }: ProductsProps) {
  const [active, setActive] = useState<Category | 'todos'>('todos');

  const filtered = useMemo(
    () => (active === 'todos' ? products : products.filter((p) => p.category === active)),
    [active]
  );

  const filters: { id: Category | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    ...categories.map((c) => ({ id: c.id, label: c.label })),
  ];

  return (
    <section id="productos" className="py-24 sm:py-32 bg-crema-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <AnimatedContent className="text-center max-w-2xl mx-auto" distance={32}>
          <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
            Nuestro catálogo
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-cafe-500 leading-tight text-balance">
            Algunos de nuestros productos
          </h2>
          <p className="mt-5 text-cafe-300/80 text-lg">
            Esta es una muestra. Agrega lo que quieras al carrito o escríbenos por WhatsApp y pide lo que necesites, aunque no esté aquí. Allí confirmamos precio y disponibilidad.
          </p>
        </AnimatedContent>

        {/* Filtros */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-[background-color,color,box-shadow] ${
                active === f.id
                  ? 'bg-maiz-300 text-cafe-900 shadow-md'
                  : 'bg-crema-200 text-cafe-300 hover:bg-maiz-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatedContent className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" distance={32} stagger={0.08}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} onQuote={onQuote} />
          ))}
        </AnimatedContent>

        <div className="mt-12 rounded-3xl bg-verde-50 border border-verde-100 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="font-serif text-2xl text-cafe-500">¿Quieres algo que no ves aquí?</h3>
            <p className="mt-1.5 text-cafe-300">Escríbenos por WhatsApp y cuéntanos qué necesitas.</p>
          </div>
          <a
            href={waLink(`¡Hola ${siteConfig.name}! Quiero hacer un pedido.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2.5 bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-md"
          >
            <MessageCircle size={20} />
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

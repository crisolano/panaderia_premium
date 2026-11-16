import { useMemo, useState } from 'react';
import { products, categories, type Category, type Product } from '@/data/site';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  onAdd: (product: Product) => void;
}

export function Products({ onAdd }: ProductsProps) {
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
    <section id="productos" className="py-24 sm:py-32 bg-cream-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
            Nuestro catálogo
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-brown-500 leading-tight text-balance">
            Productos horneados cada mañana
          </h2>
          <p className="mt-5 text-brown-300/80 text-lg">
            Selecciona tu favorito y agrégalo al carrito. Al finalizar, tu pedido se envía directamente por WhatsApp.
          </p>
        </div>

        {/* Filtros */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${
                active === f.id
                  ? 'bg-terracota-400 text-cream-100 shadow-md'
                  : 'bg-cream-200 text-brown-300 hover:bg-beige-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

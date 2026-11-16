import { Plus } from 'lucide-react';
import type { Product } from '@/data/site';
import { formatCOP } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="group bg-cream-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-cream-200/60 transition-all duration-300 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 bg-terracota-400 text-cream-100 text-xs font-semibold px-3 py-1 rounded-full shadow">
            Destacado
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-brown-500 leading-snug">{product.name}</h3>
        <p className="mt-2 text-brown-300/80 text-sm leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-serif text-2xl text-terracota-400 font-semibold">
            {formatCOP(product.price)}
          </span>
          <button
            onClick={() => onAdd(product)}
            className="inline-flex items-center gap-1.5 bg-brown-500 hover:bg-brown-700 text-cream-100 font-medium text-sm px-4 py-2.5 rounded-full transition-colors"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <Plus size={16} />
            Añadir
          </button>
        </div>
      </div>
    </article>
  );
}

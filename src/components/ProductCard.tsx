import { Plus, MessageCircle } from 'lucide-react';
import type { Product } from '@/data/site';
import { formatCOP } from '@/hooks/useCart';
import { LoopVideo } from '@/components/LoopVideo';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  onQuote: () => void;
}

export function ProductCard({ product, onAdd, onQuote }: ProductCardProps) {
  const isCustom = product.category === 'pedidos-personalizados';
  return (
    <article className="group bg-crema-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-crema-200/60 transition-shadow duration-300 flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-crema-200">
        <img
          src={product.image}
          alt={product.name}
          width={640}
          height={480}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.video && (
          <LoopVideo
            src={product.video}
            poster={product.image}
            className="group-hover:scale-105 transition-transform duration-500"
          />
        )}
        {product.featured && (
          <span className="absolute top-3 left-3 bg-verde-400 text-crema-100 text-xs font-semibold px-3 py-1 rounded-full shadow">
            Destacado
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-cafe-500 leading-snug">{product.name}</h3>
        <p className="mt-2 text-cafe-300/80 text-sm leading-relaxed flex-1">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {product.price !== undefined && !isCustom ? (
            <span className="font-serif text-2xl text-terracota-400 font-semibold">
              {formatCOP(product.price)}
            </span>
          ) : (
            <span className="text-sm text-cafe-300 leading-snug">
              {isCustom ? 'Se cotiza por WhatsApp' : 'Precio por confirmar por WhatsApp'}
            </span>
          )}
          {isCustom ? (
            <button
              onClick={onQuote}
              className="inline-flex flex-shrink-0 items-center gap-1.5 bg-verde-400 hover:bg-verde-500 text-crema-100 font-medium text-sm px-4 py-2.5 rounded-full transition-colors"
              aria-label={`Cotizar ${product.name}`}
            >
              <MessageCircle size={16} />
              Cotizar
            </button>
          ) : (
            <button
              onClick={() => onAdd(product)}
              className="inline-flex flex-shrink-0 items-center gap-1.5 bg-cafe-500 hover:bg-cafe-700 text-crema-100 font-medium text-sm px-4 py-2.5 rounded-full transition-colors"
              aria-label={`Añadir ${product.name} al carrito`}
            >
              <Plus size={16} />
              Añadir
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle } from 'lucide-react';
import type { CartItem } from '@/hooks/useCart';
import { formatCOP } from '@/hooks/useCart';
import { siteConfig } from '@/data/site';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  totalItems,
  totalPrice,
  onUpdateQty,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const handleWhatsApp = () => {
    if (items.length === 0) return;

    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} — ${i.quantity} × ${formatCOP(i.price)} = ${formatCOP(i.price * i.quantity)}`
    );
    const message =
      `¡Hola ${siteConfig.name}! Quiero hacer el siguiente pedido:\n\n` +
      lines.join('\n') +
      `\n\n*Total: ${formatCOP(totalPrice)}*\n\n¡Gracias!`;

    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-brown-900/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-cream-100 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-cream-300">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={22} className="text-terracota-400" />
            <h2 className="font-serif text-xl text-brown-500">
              Tu carrito {totalItems > 0 && <span className="text-brown-300/60 text-base">({totalItems})</span>}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-cream-200 hover:bg-cream-300 text-brown-500 flex items-center justify-center transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <span className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-brown-300/50">
              <ShoppingBag size={36} />
            </span>
            <p className="font-serif text-xl text-brown-500">Tu carrito está vacío</p>
            <p className="text-brown-300/70 text-sm">
              Explora nuestro catálogo y añade tus favoritos.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-3 rounded-full bg-terracota-400 text-cream-100 font-medium hover:bg-terracota-500 transition-colors"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-cream-50 rounded-xl p-3 border border-cream-200/60 animate-slide-in-right"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-brown-500 leading-snug truncate">
                      {item.name}
                    </h3>
                    <p className="text-terracota-400 font-semibold text-sm mt-0.5">
                      {formatCOP(item.price)}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Cantidad */}
                      <div className="flex items-center gap-1 bg-cream-200 rounded-full p-1">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-cream-100 hover:bg-cream-300 text-brown-500 flex items-center justify-center transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center font-medium text-brown-500 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-cream-100 hover:bg-cream-300 text-brown-500 flex items-center justify-center transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-brown-300/50 hover:text-terracota-400 transition-colors p-1"
                        aria-label={`Eliminar ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={onClear}
                className="text-sm text-brown-300/60 hover:text-terracota-400 transition-colors mt-2"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Footer con total */}
            <div className="border-t border-cream-300 px-5 py-5 bg-cream-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-brown-300 font-medium">Total</span>
                <span className="font-serif text-2xl text-brown-500 font-semibold">
                  {formatCOP(totalPrice)}
                </span>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold py-4 rounded-full transition-colors shadow-lg"
              >
                <MessageCircle size={20} />
                Pedir por WhatsApp
              </button>
              <p className="text-center text-xs text-brown-300/60 mt-3">
                Se abrirá WhatsApp con tu pedido listo para enviar.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

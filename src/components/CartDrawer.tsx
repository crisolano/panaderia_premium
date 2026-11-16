import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowLeft, Truck, Store, User, Phone, MapPin, Clock } from 'lucide-react';
import type { CartItem } from '@/hooks/useCart';
import { formatCOP } from '@/hooks/useCart';
import { siteConfig, whatsappOptions, pickupTimeSlots } from '@/data/site';

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

type DeliveryMethod = 'domicilio' | 'recogida';
type Step = 'cart' | 'checkout';

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
  const [step, setStep] = useState<Step>('cart');
  const [delivery, setDelivery] = useState<DeliveryMethod>('domicilio');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [reference, setReference] = useState('');
  const [pickupTime, setPickupTime] = useState(pickupTimeSlots[0]);
  const [observations, setObservations] = useState('');
  const [waChoice, setWaChoice] = useState<'primary' | 'secondary'>('primary');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Ingresa tu nombre';
    if (!phone.trim()) e.phone = 'Ingresa tu teléfono';
    if (delivery === 'domicilio') {
      if (!address.trim()) e.address = 'Ingresa la dirección';
      if (!neighborhood.trim()) e.neighborhood = 'Ingresa el barrio';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendWhatsApp = () => {
    if (!validate()) return;

    const wa = whatsappOptions.find((o) => o.id === waChoice)!;
    const lines = items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} — ${i.quantity} × ${formatCOP(i.price)} = ${formatCOP(i.price * i.quantity)}`
    );

    let deliveryInfo: string;
    if (delivery === 'domicilio') {
      deliveryInfo =
        `*Tipo:* Domicilio\n` +
        `*Dirección:* ${address}\n` +
        `*Barrio:* ${neighborhood}\n` +
        `*Referencias:* ${reference || 'N/A'}`;
    } else {
      deliveryInfo =
        `*Tipo:* Recogida en tienda\n` +
        `*Hora preferida:* ${pickupTime}\n` +
        `*Dirección de tienda:* ${siteConfig.address}`;
    }

    const message =
      `¡Hola ${siteConfig.name}! Quiero hacer el siguiente pedido:\n\n` +
      `*Productos:*\n` + lines.join('\n') +
      `\n\n*Total referencial: ${formatCOP(totalPrice)}*\n\n` +
      `*Datos del cliente:*\n` +
      `*Nombre:* ${name}\n` +
      `*Teléfono:* ${phone}\n\n` +
      `*Entrega:*\n` + deliveryInfo +
      (observations.trim() ? `\n\n*Observaciones:* ${observations}` : '') +
      `\n\n¡Gracias!`;

    const url = `https://wa.me/${wa.number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const goCheckout = () => {
    if (items.length === 0) return;
    setErrors({});
    setStep('checkout');
  };

  const backToCart = () => {
    setErrors({});
    setStep('cart');
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-cafe-900/50 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-crema-100 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-crema-300 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                onClick={backToCart}
                className="w-9 h-9 rounded-full bg-crema-200 hover:bg-crema-300 text-cafe-500 flex items-center justify-center transition-colors mr-1"
                aria-label="Volver al carrito"
              >
                <ArrowLeft size={18} />
              </button>
            )}
            <ShoppingBag size={22} className="text-terracota-400" />
            <h2 className="font-serif text-xl text-cafe-500">
              {step === 'cart' ? (
                <>Tu carrito {totalItems > 0 && <span className="text-cafe-300/60 text-base">({totalItems})</span>}</>
              ) : (
                'Datos del pedido'
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-crema-200 hover:bg-crema-300 text-cafe-500 flex items-center justify-center transition-colors"
            aria-label="Cerrar carrito"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
            <span className="w-20 h-20 rounded-full bg-crema-200 flex items-center justify-center text-cafe-300/50">
              <ShoppingBag size={36} />
            </span>
            <p className="font-serif text-xl text-cafe-500">Tu carrito está vacío</p>
            <p className="text-cafe-300/70 text-sm">
              Explora nuestro catálogo y añade tus favoritos.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-3 rounded-full bg-terracota-400 text-crema-100 font-medium hover:bg-terracota-500 transition-colors"
            >
              Ver productos
            </button>
          </div>
        ) : step === 'cart' ? (
          <>
            {/* Lista de items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-crema-50 rounded-xl p-3 border border-crema-200/60 animate-slide-in-right"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-cafe-500 leading-snug">{item.name}</h3>
                    <p className="text-terracota-400 font-semibold text-sm mt-0.5">
                      {formatCOP(item.price)}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1 bg-crema-200 rounded-full p-1">
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                          className="w-7 h-7 rounded-full bg-crema-100 hover:bg-crema-300 text-cafe-500 flex items-center justify-center transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-7 text-center font-medium text-cafe-500 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-crema-100 hover:bg-crema-300 text-cafe-500 flex items-center justify-center transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-cafe-300/50 hover:text-terracota-400 transition-colors p-1"
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
                className="text-sm text-cafe-300/60 hover:text-terracota-400 transition-colors mt-2"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Footer con total y botón checkout */}
            <div className="border-t border-crema-300 px-5 py-5 bg-crema-50 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-cafe-300 font-medium">Total</span>
                <span className="font-serif text-2xl text-cafe-500 font-semibold">
                  {formatCOP(totalPrice)}
                </span>
              </div>
              <button
                onClick={goCheckout}
                className="w-full flex items-center justify-center gap-2.5 bg-terracota-400 hover:bg-terracota-500 text-crema-100 font-semibold py-4 rounded-full transition-colors shadow-lg"
              >
                Continuar con el pedido
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Checkout form */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
              {/* Tipo de entrega */}
              <div>
                <label className="block text-cafe-500 font-medium text-sm mb-2.5">Tipo de entrega</label>
                <div className="grid grid-cols-2 gap-3">
                  <DeliveryCard
                    active={delivery === 'domicilio'}
                    onClick={() => setDelivery('domicilio')}
                    icon={Truck}
                    label="Domicilio"
                    sub="Entrega en tu casa"
                  />
                  <DeliveryCard
                    active={delivery === 'recogida'}
                    onClick={() => setDelivery('recogida')}
                    icon={Store}
                    label="Recogida"
                    sub="Recoges en tienda"
                  />
                </div>
              </div>

              {/* Datos del cliente */}
              <div>
                <p className="text-cafe-500 font-medium text-sm mb-3 flex items-center gap-2">
                  <User size={16} /> Datos del cliente
                </p>
                <div className="space-y-3">
                  <Field
                    label="Nombre completo"
                    value={name}
                    onChange={setName}
                    placeholder="Ej. María González"
                    error={errors.name}
                    icon={User}
                  />
                  <Field
                    label="Teléfono"
                    value={phone}
                    onChange={setPhone}
                    placeholder="Ej. 300 123 4567"
                    error={errors.phone}
                    icon={Phone}
                  />
                </div>
              </div>

              {/* Datos de entrega */}
              {delivery === 'domicilio' ? (
                <div>
                  <p className="text-cafe-500 font-medium text-sm mb-3 flex items-center gap-2">
                    <MapPin size={16} /> Datos del domicilio
                  </p>
                  <div className="space-y-3">
                    <Field
                      label="Dirección"
                      value={address}
                      onChange={setAddress}
                      placeholder="Ej. Calle 5 #34-56"
                      error={errors.address}
                      icon={MapPin}
                    />
                    <Field
                      label="Barrio"
                      value={neighborhood}
                      onChange={setNeighborhood}
                      placeholder="Ej. Villanueva"
                      error={errors.neighborhood}
                    />
                    <Field
                      label="Referencias (opcional)"
                      value={reference}
                      onChange={setReference}
                      placeholder="Ej. Casa verde, portón negro"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-cafe-500 font-medium text-sm mb-3 flex items-center gap-2">
                    <Clock size={16} /> Hora de recogida
                  </p>
                  <p className="text-cafe-300/70 text-xs mb-3">
                    Tienda: {siteConfig.address}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {pickupTimeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setPickupTime(slot)}
                        className={`px-2 py-2 rounded-lg text-sm font-medium transition-colors ${
                          pickupTime === slot
                            ? 'bg-terracota-400 text-crema-100'
                            : 'bg-crema-200 text-cafe-500 hover:bg-crema-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selección de WhatsApp */}
              <div>
                <p className="text-cafe-500 font-medium text-sm mb-3">Enviar pedido a</p>
                <div className="space-y-2">
                  {whatsappOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                        waChoice === opt.id
                          ? 'border-terracota-400 bg-terracota-50'
                          : 'border-crema-200 bg-crema-50 hover:border-crema-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="whatsapp"
                        checked={waChoice === opt.id}
                        onChange={() => setWaChoice(opt.id)}
                        className="accent-terracota-400"
                      />
                      <div>
                        <p className="text-cafe-500 font-medium text-sm">{opt.label}</p>
                        <p className="text-cafe-300/70 text-xs">{opt.display}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-cafe-300 text-xs font-medium mb-1.5">
                  Observaciones del pedido (opcional)
                </label>
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={2}
                  placeholder="Ej. Sin azúcar, para 15 personas, mensaje en la torta..."
                  className="w-full rounded-lg border-2 border-crema-200 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm placeholder:text-cafe-300/40 focus:outline-none focus:border-terracota-400 transition-colors"
                />
              </div>

              {/* Resumen del pedido */}
              <div className="bg-crema-200/60 rounded-xl p-4">
                <p className="text-cafe-500 font-medium text-sm mb-3">Resumen del pedido</p>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm text-cafe-300">
                      <span className="truncate pr-2">{item.name} × {item.quantity}</span>
                      <span className="font-medium text-cafe-500 whitespace-nowrap">
                        {formatCOP(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-crema-300/60 flex justify-between items-center">
                  <span className="text-cafe-500 font-medium">Total</span>
                  <span className="font-serif text-xl text-cafe-500 font-semibold">
                    {formatCOP(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-crema-300 px-5 py-5 bg-crema-50 flex-shrink-0">
              <button
                onClick={handleSendWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold py-4 rounded-full transition-colors shadow-lg"
              >
                <MessageCircle size={20} />
                Finalizar pedido por WhatsApp
              </button>
              <p className="text-center text-xs text-cafe-300/60 mt-3">
                Se abrirá WhatsApp con todos los datos del pedido. El precio y la disponibilidad se confirman en el chat.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// ---- Subcomponentes ----

function DeliveryCard({
  active,
  onClick,
  icon: Icon,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Truck;
  label: string;
  sub: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 p-4 rounded-xl border-2 transition-colors ${
        active
          ? 'border-terracota-400 bg-terracota-50 text-cafe-500'
          : 'border-crema-200 bg-crema-50 text-cafe-300 hover:border-crema-300'
      }`}
    >
      <Icon size={24} className={active ? 'text-terracota-400' : 'text-cafe-300'} />
      <span className="font-medium text-sm">{label}</span>
      <span className="text-xs text-cafe-300/70">{sub}</span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  icon: Icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  icon?: typeof User;
}) {
  return (
    <div>
      <label className="block text-cafe-300 text-xs font-medium mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-cafe-300/50" />
        )}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-lg border-2 bg-crema-50 py-2.5 ${Icon ? 'pl-9 pr-3' : 'px-3'} text-cafe-500 text-sm placeholder:text-cafe-300/40 focus:outline-none transition-colors ${
            error ? 'border-red-400 focus:border-red-500' : 'border-crema-200 focus:border-terracota-400'
          }`}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

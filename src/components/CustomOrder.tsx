import { useState } from 'react';
import { MessageCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { siteConfig, customOrderTypes, whatsappOptions } from '@/data/site';

// Fecha local de hoy (YYYY-MM-DD), para no aceptar fechas pasadas.
const todayISO = () => new Date().toLocaleDateString('sv-SE');

export function CustomOrder() {
  const [productType, setProductType] = useState(customOrderTypes[0]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [observations, setObservations] = useState('');
  const [waChoice, setWaChoice] = useState<'primary' | 'secondary'>('primary');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!description.trim()) e.description = 'Describe el diseño o características deseadas';
    if (!/^\d+$/.test(quantity.trim()) || Number(quantity) < 1 || Number(quantity) > 999)
      e.quantity = 'Indica una cantidad entera entre 1 y 999';
    if (!date) e.date = 'Indica la fecha en que lo necesitas';
    else if (date < todayISO()) e.date = 'La fecha no puede ser anterior a hoy';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSend = () => {
    if (!validate()) return;

    const wa = whatsappOptions.find((o) => o.id === waChoice)!;

    const message =
      `¡Hola ${siteConfig.name}! Quisiera solicitar una cotización para un pedido personalizado.\n\n` +
      `*Tipo de producto:* ${productType}\n` +
      `*Descripción del diseño:* ${description}\n` +
      `*Cantidad:* ${quantity.trim()}\n` +
      `*Fecha necesaria:* ${date}\n` +
      (budget.trim() ? `*Presupuesto aproximado:* ${budget}\n` : '') +
      (observations.trim() ? `*Observaciones:* ${observations}\n` : '') +
      `\n_Nota:_ Puedo enviar imágenes de referencia por este chat.`;

    const url = `https://wa.me/${wa.number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="personalizar" className="py-24 sm:py-32 bg-verde-50">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-verde-400 font-semibold tracking-wider text-sm uppercase">
            <Sparkles size={16} /> Pedidos personalizados
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-cafe-500 leading-tight text-balance">
            Personaliza tu pedido
          </h2>
          <p className="mt-5 text-cafe-300/80 text-lg">
            Cuéntanos qué tienes en mente y te enviamos una cotización por WhatsApp. Para diseños especiales, puedes enviar fotos de referencia directamente en el chat.
          </p>
        </div>

        <div className="bg-crema-50 rounded-3xl shadow-xl border border-crema-200/60 p-6 sm:p-10">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Tipo de producto */}
            <div>
              <label htmlFor="co-type" className="block text-cafe-300 text-xs font-medium mb-1.5">
                Tipo de producto
              </label>
              <select
                id="co-type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full rounded-lg border-2 border-crema-200 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm focus:outline-none focus:border-verde-300 transition-colors"
              >
                {customOrderTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label htmlFor="co-qty" className="block text-cafe-300 text-xs font-medium mb-1.5">
                Cantidad
              </label>
              <input
                id="co-qty"
                type="number"
                inputMode="numeric"
                min="1"
                max="999"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? 'co-qty-error' : undefined}
                className={`w-full rounded-lg border-2 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm focus:outline-none transition-colors ${
                  errors.quantity ? 'border-red-400 focus:border-red-500' : 'border-crema-200 focus:border-verde-300'
                }`}
              />
              {errors.quantity && <p id="co-qty-error" role="alert" className="text-red-600 text-xs mt-1">{errors.quantity}</p>}
            </div>
          </div>

          {/* Descripción del diseño */}
          <div className="mt-5">
            <label htmlFor="co-desc" className="block text-cafe-300 text-xs font-medium mb-1.5">
              Descripción del diseño <span className="text-terracota-500">*</span>
            </label>
            <textarea
              id="co-desc"
              aria-invalid={Boolean(errors.description)}
              aria-describedby={errors.description ? 'co-desc-error' : undefined}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Ej. Torta de dos pisos, sabor chocolate, decoración floral en tonos rosados, mensaje 'Feliz Cumpleaños María'"
              className={`w-full rounded-lg border-2 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm placeholder:text-cafe-300/40 focus:outline-none transition-colors ${
                errors.description ? 'border-red-400 focus:border-red-500' : 'border-crema-200 focus:border-verde-300'
              }`}
            />
            {errors.description && <p id="co-desc-error" role="alert" className="text-red-600 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            {/* Fecha */}
            <div>
              <label htmlFor="co-date" className="block text-cafe-300 text-xs font-medium mb-1.5">
                Fecha en que lo necesitas <span className="text-terracota-500">*</span>
              </label>
              <input
                id="co-date"
                type="date"
                min={todayISO()}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'co-date-error' : undefined}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full rounded-lg border-2 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm focus:outline-none transition-colors ${
                  errors.date ? 'border-red-400 focus:border-red-500' : 'border-crema-200 focus:border-verde-300'
                }`}
              />
              {errors.date && <p id="co-date-error" role="alert" className="text-red-600 text-xs mt-1">{errors.date}</p>}
            </div>

            {/* Presupuesto opcional */}
            <div>
              <label htmlFor="co-budget" className="block text-cafe-300 text-xs font-medium mb-1.5">
                Presupuesto aproximado (opcional)
              </label>
              <input
                id="co-budget"
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Ej. $80.000"
                className="w-full rounded-lg border-2 border-crema-200 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm placeholder:text-cafe-300/40 focus:outline-none focus:border-verde-300 transition-colors"
              />
            </div>
          </div>

          {/* Observaciones */}
          <div className="mt-5">
            <label htmlFor="co-obs" className="block text-cafe-300 text-xs font-medium mb-1.5">
              Observaciones adicionales (opcional)
            </label>
            <textarea
              id="co-obs"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={2}
              placeholder="Ej. Sin azúcar, para 15 personas, necesita refrigeración..."
              className="w-full rounded-lg border-2 border-crema-200 bg-crema-50 px-3 py-2.5 text-cafe-500 text-sm placeholder:text-cafe-300/40 focus:outline-none focus:border-verde-300 transition-colors"
            />
          </div>

          {/* Nota sobre imágenes */}
          <div className="mt-5 flex items-start gap-3 p-4 rounded-xl bg-maiz-50 border border-maiz-100">
            <ImageIcon size={20} className="text-maiz-400 flex-shrink-0 mt-0.5" />
            <p className="text-cafe-300 text-sm leading-relaxed">
              Si tienes imágenes de referencia, puedes enviarlas directamente en la conversación de WhatsApp después de presionar el botón. La web no adjunta imágenes automáticamente.
            </p>
          </div>

          {/* Selección de WhatsApp */}
          <fieldset className="mt-5">
            <legend className="text-cafe-500 font-medium text-sm mb-3">Enviar cotización a</legend>
            <div className="grid sm:grid-cols-2 gap-3">
              {whatsappOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors ${
                    waChoice === opt.id
                      ? 'border-verde-300 bg-verde-50'
                      : 'border-crema-200 bg-crema-50 hover:border-crema-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="whatsapp-custom"
                    checked={waChoice === opt.id}
                    onChange={() => setWaChoice(opt.id)}
                    className="accent-verde-400"
                  />
                  <div>
                    <p className="text-cafe-500 font-medium text-sm">{opt.label}</p>
                    <p className="text-cafe-300/90 text-xs">{opt.display}</p>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Botón */}
          <button
            onClick={handleSend}
            className="mt-7 w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold py-4 rounded-full transition-colors shadow-lg"
          >
            <MessageCircle size={20} />
            Solicitar cotización por WhatsApp
          </button>
          <p className="text-center text-xs text-cafe-300/90 mt-3">
            La cotización no confirma precio ni disponibilidad. El negocio confirmará los detalles por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
}

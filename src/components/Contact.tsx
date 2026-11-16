import { MapPin, Clock, Mail, Instagram, Facebook, MessageCircle, Navigation, MapPinned } from 'lucide-react';
import { siteConfig, whatsappOptions, googleMaps } from '@/data/site';

export function Contact() {
  // Construir la URL de embed del mapa
  const mapEmbedSrc = (() => {
    if (googleMaps.embedUrl) return googleMaps.embedUrl;
    if (googleMaps.apiKey && googleMaps.placeId) {
      return `https://www.google.com/maps/embed/v1/place?key=${googleMaps.apiKey}&q=place_id:${googleMaps.placeId}`;
    }
    if (googleMaps.apiKey) {
      // Sin Place ID, usar búsqueda por nombre + dirección
      const query = encodeURIComponent(`${siteConfig.name}, ${siteConfig.address}, ${siteConfig.city}`);
      return `https://www.google.com/maps/embed/v1/search?key=${googleMaps.apiKey}&q=${query}`;
    }
    return ''; // Sin API key ni embed URL, mostrar marcador
  })();

  const hasMap = Boolean(mapEmbedSrc);

  return (
    <section id="contacto" className="py-24 sm:py-32 bg-crema-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Información */}
          <div>
            <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
              Contacto
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-cafe-500 leading-tight text-balance">
              Ven a visitarnos o escríbenos
            </h2>
            <p className="mt-5 text-cafe-300/80 text-lg leading-relaxed">
              Estaremos encantados de atenderte. Haz tu pedido por WhatsApp y lo preparamos fresco para ti.
            </p>

            <div className="mt-10 space-y-6">
              <ContactRow icon={MapPin} label="Dirección" value={siteConfig.address} />
              <ContactRow icon={MapPin} label="Ciudad" value={siteConfig.city} />
              <ContactRow icon={Clock} label="Horario" value={siteConfig.hours} />
              <ContactRow icon={Mail} label="Correo" value={siteConfig.email} />
            </div>

            {/* Números de WhatsApp */}
            <div className="mt-8 space-y-3">
              {whatsappOptions.map((opt) => (
                <a
                  key={opt.id}
                  href={`https://wa.me/${opt.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-crema-50 border border-crema-200/60 hover:border-verde-300 transition-colors group"
                >
                  <span className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} />
                  </span>
                  <div>
                    <p className="text-cafe-300/60 text-xs">{opt.label}</p>
                    <p className="text-cafe-500 font-medium group-hover:text-verde-400 transition-colors">{opt.display}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href={siteConfig.social.facebook} label="Facebook">
                <Facebook size={20} />
              </SocialLink>
            </div>
          </div>

          {/* Mapa */}
          <div className="flex flex-col gap-4">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto min-h-[380px] bg-crema-200 relative">
              {hasMap ? (
                <iframe
                  title="Ubicación de Ricuras del Maíz"
                  src={mapEmbedSrc}
                  className="w-full h-full border-0 grayscale-[0.15]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <MapPlaceholder />
              )}
            </div>

            {/* Botón Cómo llegar */}
            <a
              href={googleMaps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-cafe-500 hover:bg-cafe-700 text-crema-100 font-semibold transition-colors shadow-md self-start"
            >
              <Navigation size={18} />
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapPlaceholder() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-6 gap-3 bg-crema-200">
      <span className="w-16 h-16 rounded-full bg-crema-300 flex items-center justify-center text-cafe-300">
        <MapPinned size={32} />
      </span>
      <p className="font-serif text-lg text-cafe-500">Mapa en configuración</p>
      <p className="text-cafe-300/70 text-sm max-w-xs">
        El mapa interactivo de Google se activará cuando se configure la API key y el Place ID del negocio.
      </p>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-maiz-100 text-verde-400 flex items-center justify-center">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-cafe-300/60 text-sm">{label}</p>
        <p className="text-cafe-500 font-medium text-lg mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-12 h-12 rounded-full bg-cafe-500 text-crema-100 flex items-center justify-center hover:bg-terracota-400 transition-colors"
    >
      {children}
    </a>
  );
}

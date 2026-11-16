import { MapPin, Clock, Mail, Phone, Instagram, Facebook, MessageCircle } from 'lucide-react';
import { siteConfig, whatsappOptions } from '@/data/site';

export function Contact() {
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
          <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto min-h-[420px] bg-crema-200">
            <iframe
              title="Ubicación de Ricuras del Maíz en Piedecuesta"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-73.0%2C6.98%2C-72.96%2C7.02&layer=mapnik&marker=7.0%2C-72.98"
              className="w-full h-full border-0 grayscale-[0.2]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
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

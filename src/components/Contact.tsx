import { MapPin, Clock, Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { siteConfig } from '@/data/site';

export function Contact() {
  return (
    <section id="contacto" className="py-24 sm:py-32 bg-cream-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Información */}
          <div>
            <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
              Contacto
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-brown-500 leading-tight text-balance">
              Ven a visitarnos o escríbenos
            </h2>
            <p className="mt-5 text-brown-300/80 text-lg leading-relaxed">
              Estaremos encantados de atenderte. Haz tu pedido por WhatsApp y lo preparamos fresco para que lo recojas.
            </p>

            <div className="mt-10 space-y-6">
              <ContactRow icon={MapPin} label="Dirección" value={siteConfig.address} />
              <ContactRow icon={Phone} label="Teléfono / WhatsApp" value={siteConfig.phoneDisplay} />
              <ContactRow icon={Mail} label="Correo" value={siteConfig.email} />
              <ContactRow icon={Clock} label="Horario" value={siteConfig.hours} />
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

          {/* Mapa / imagen */}
          <div className="rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto min-h-[420px] bg-cream-200">
            <iframe
              title="Ubicación de la panadería"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0837%2C4.6480%2C-74.0637%2C4.6680&layer=mapnik&marker=4.6580%2C-74.0737"
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
      <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-beige-200/60 text-terracota-400 flex items-center justify-center">
        <Icon size={22} />
      </span>
      <div>
        <p className="text-brown-300/60 text-sm">{label}</p>
        <p className="text-brown-500 font-medium text-lg mt-0.5">{value}</p>
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
      className="w-12 h-12 rounded-full bg-brown-500 text-cream-100 flex items-center justify-center hover:bg-terracota-400 transition-colors"
    >
      {children}
    </a>
  );
}

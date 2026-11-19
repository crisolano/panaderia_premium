import { ArrowRight, MapPin, MessageCircle } from 'lucide-react';
import { images, siteConfig, waLink } from '@/data/site';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-crema-100 pb-12 pt-24 sm:pt-28 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 hidden h-96 w-96 rounded-full bg-maiz-100/70 blur-3xl lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 px-5 sm:grid-cols-[1.05fr_0.95fr] sm:gap-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-terracota-500 sm:text-sm">
            <span aria-hidden="true" className="h-px w-6 bg-terracota-400" />
            Panadería de tradición
          </span>

          <p className="mt-4 text-sm font-medium text-cafe-300 sm:text-base">
            Desde {siteConfig.founded}
          </p>

          <h1 className="mt-5 text-balance font-serif text-5xl font-normal leading-[1.04] tracking-[-0.035em] text-cafe-500 md:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-cafe-300 sm:text-lg">
            Tortas, genovesas, mantecadas, buñuelos y panes especiales. Pide por WhatsApp, con domicilio o recogida en tienda.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={waLink(`¡Hola ${siteConfig.name}! Quiero hacer un pedido.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1FB855] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#168947]"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Pedir por WhatsApp
            </a>
            <button
              onClick={onExplore}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-cafe-500/20 px-7 py-4 text-base font-medium text-cafe-500 transition-colors hover:border-cafe-500/40 hover:bg-crema-50"
            >
              Ver productos
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>

        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-3 translate-x-2 translate-y-2 rounded-[2rem] bg-maiz-200/55"
          />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-crema-200 ring-1 ring-cafe-500/10">
            <img
              src={images.hero.src}
              srcSet={images.hero.srcSet}
              sizes="(min-width: 1024px) 55vw, (min-width: 640px) 45vw, 92vw"
              width={images.hero.width}
              height={images.hero.height}
              alt={images.hero.alt}
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            <video
              src={`${import.meta.env.BASE_URL}video/hero-vitrina.mp4`}
              poster={images.hero.src}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 h-full w-full object-cover object-center motion-reduce:hidden"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cafe-900/45 to-transparent"
            />
            <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/50 bg-crema-50/95 px-4 py-2.5 text-sm font-medium text-cafe-500 shadow-sm backdrop-blur-sm">
              <MapPin size={16} className="text-terracota-500" aria-hidden="true" />
              {siteConfig.city.replace(', Colombia', '')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

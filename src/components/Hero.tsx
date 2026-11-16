import { ArrowRight, MessageCircle } from 'lucide-react';
import { images, siteConfig, waLink } from '@/data/site';
import SplitText from '@/components/reactbits/SplitText';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex items-center overflow-hidden pt-20"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={images.hero.src}
          srcSet={images.hero.srcSet}
          sizes="100vw"
          width={images.hero.width}
          height={images.hero.height}
          alt={images.hero.alt}
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cafe-900/95 via-cafe-900/80 to-cafe-900/45" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-maiz-300/20 backdrop-blur-sm border border-maiz-300/30 text-maiz-100 text-sm font-medium tracking-wide mb-6 animate-slide-up">
            Desde {siteConfig.founded} · {siteConfig.city}
          </span>
          <SplitText
            tag="h1"
            text={siteConfig.tagline}
            trigger="load"
            textAlign="left"
            delay={35}
            duration={0.9}
            className="text-crema-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1]"
          />
          <p className="mt-6 text-crema-200 text-lg sm:text-xl max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Tortas, genovesas, mantecadas, buñuelos y panes especiales. Pide por WhatsApp, con domicilio o recogida en tienda.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <a
              href={waLink(`¡Hola ${siteConfig.name}! Quiero hacer un pedido.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold text-base transition-colors shadow-lg"
            >
              <MessageCircle size={20} />
              Pedir por WhatsApp
            </a>
            <button
              onClick={onExplore}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full border border-crema-100/40 text-crema-100 hover:bg-crema-100/10 font-medium transition-colors"
            >
              Ver productos
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

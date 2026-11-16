import { ArrowRight } from 'lucide-react';
import { images, siteConfig } from '@/data/site';

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
          src={images.hero}
          alt="Pan artesanal recién horneado"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brown-900/85 via-brown-900/60 to-brown-900/30" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cream-100/15 backdrop-blur-sm border border-cream-100/20 text-cream-100 text-sm font-medium tracking-wide mb-6 animate-slide-up">
            Panadería artesanal premium
          </span>
          <h1 className="text-cream-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] text-balance animate-slide-up">
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 text-cream-200 text-lg sm:text-xl max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Masa madre, fermentación lenta y mantequilla de origen. Cada pieza se amasa a mano y se hornea cada madrugada para llegar fresca a tu mesa.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={onExplore}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-terracota-400 hover:bg-terracota-500 text-cream-100 font-semibold text-base transition-all hover:gap-3.5 shadow-lg hover:shadow-xl"
            >
              Explorar productos
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-7 py-4 rounded-full border border-cream-100/40 text-cream-100 hover:bg-cream-100/10 font-medium transition-colors"
            >
              Conoce nuestra historia
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

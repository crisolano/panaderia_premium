import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/site';

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-brown-500 relative overflow-hidden">
      {/* patrón decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -top-10 -right-10 w-80 h-80 rounded-full bg-terracota-400 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-beige-200 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-terracota-100 font-semibold tracking-wider text-sm uppercase">
            Testimonios
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-cream-100 leading-tight text-balance">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="bg-brown-700/50 backdrop-blur-sm border border-cream-100/10 rounded-2xl p-7 flex flex-col"
            >
              <Quote size={32} className="text-terracota-100/60 mb-4" />
              <blockquote className="text-cream-200/90 leading-relaxed flex-1">
                "{t.text}"
              </blockquote>
              <div className="mt-5 flex items-center gap-1 text-terracota-100">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <figcaption className="mt-4 pt-4 border-t border-cream-100/10">
                <p className="font-serif text-cream-100 text-lg">{t.name}</p>
                <p className="text-cream-200/60 text-sm">{t.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

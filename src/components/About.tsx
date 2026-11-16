import { Wheat, Clock, HeartHandshake } from 'lucide-react';
import { images } from '@/data/site';

const values = [
  {
    icon: Wheat,
    title: 'Masa de maíz',
    text: 'El maíz es el corazón de nuestra cocina. Lo molemos y lo transformamos en cada producto con recetas tradicionales.',
  },
  {
    icon: Clock,
    title: 'Hecho cada día',
    text: 'Cada madrugada preparamos todo desde cero. Nada industrial, nada congelado. Solo ingredientes frescos.',
  },
  {
    icon: HeartHandshake,
    title: 'Receta familiar',
    text: 'Nuestras recetas pasan de generación en generación. El sabor de la tradición santandereana en cada bocado.',
  },
];

export function About() {
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-crema-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Imagen */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src={images.about}
                alt="Preparación artesanal de arepas de maíz"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-[1.5rem] overflow-hidden shadow-xl border-8 border-crema-100">
              <img
                src={images.breadOven}
                alt="Panes especiales artesanales"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-5 -left-3 bg-verde-400 text-crema-100 rounded-2xl px-5 py-4 shadow-lg">
              <p className="font-serif text-3xl leading-none">100%</p>
              <p className="text-xs mt-1 opacity-90">Artesanal</p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
              Nosotros
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-cafe-500 leading-tight text-balance">
              Tradición santandereana hecha con maíz y amor
            </h2>
            <p className="mt-6 text-cafe-300 text-lg leading-relaxed">
              Ricuras del Maíz nació en Piedecuesta con una idea simple: rescatar el sabor de la repostería tradicional colombiana usando el maíz como ingrediente principal. Desde las tortas hasta los buñuelos, todo se prepara a mano, cada día.
            </p>
            <p className="mt-4 text-cafe-300/80 leading-relaxed">
              Nuestra cocina es un homenaje a las recetas de nuestras abuelas, adaptadas con creatividad y mucho cariño para que cada bocado te lleve a casa.
            </p>

            <div className="mt-10 space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-maiz-100 text-verde-400 flex items-center justify-center">
                    <v.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cafe-500">{v.title}</h3>
                    <p className="text-cafe-300/85 text-[0.95rem] mt-1">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Leaf, Clock, HeartHandshake } from 'lucide-react';
import { images } from '@/data/site';

const values = [
  {
    icon: Leaf,
    title: 'Ingredientes de origen',
    text: 'Harinas sin aditivos, mantequilla europea y café de fincas colombianas. Nada artificial.',
  },
  {
    icon: Clock,
    title: 'Fermentación lenta',
    text: 'Nuestra masa madre reposa 24 horas. El tiempo es el ingrediente más importante.',
  },
  {
    icon: HeartHandshake,
    title: 'Hecho a mano',
    text: 'Cada pieza se amasa, se forma y se hornea por nuestros maestros panaderos cada día.',
  },
];

export function About() {
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-cream-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Imagen */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src={images.about}
                alt="Interior de la panadería"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-[1.5rem] overflow-hidden shadow-xl border-8 border-cream-100">
              <img
                src={images.breadOven}
                alt="Pan en el horno"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-5 -left-3 bg-terracota-400 text-cream-100 rounded-2xl px-5 py-4 shadow-lg">
              <p className="font-serif text-3xl leading-none">100%</p>
              <p className="text-xs mt-1 opacity-90">Artesanal</p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
              Nosotros
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-brown-500 leading-tight text-balance">
              Una panadería que nació de la pasión por el pan verdadero
            </h2>
            <p className="mt-6 text-brown-300 text-lg leading-relaxed">
              Empezamos en un pequeño horno de barro con una sola receta de masa madre. Hoy seguimos fieles a esa misma idea: hacer pan como se hacía antes, sin atajos, sin mejorantes, con paciencia y con amor.
            </p>
            <p className="mt-4 text-brown-300/80 leading-relaxed">
              Cada madrugada encendemos el horno antes del amanecer para que cuando abras la puerta de tu casa, el pan todavía esté tibio.
            </p>

            <div className="mt-10 space-y-5">
              {values.map((v) => (
                <div key={v.title} className="flex gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-beige-200/60 text-terracota-400 flex items-center justify-center">
                    <v.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-brown-500">{v.title}</h3>
                    <p className="text-brown-300/85 text-[0.95rem] mt-1">{v.text}</p>
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

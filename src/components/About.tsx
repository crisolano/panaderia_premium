import { MessageCircle, Truck, Sparkles } from 'lucide-react';
import { images, siteConfig } from '@/data/site';
import AnimatedContent from '@/components/reactbits/AnimatedContent';

const values = [
  {
    icon: MessageCircle,
    title: 'Pedidos por WhatsApp',
    text: 'Armas tu pedido en la web y lo enviamos por WhatsApp. Allí confirmamos precio y disponibilidad.',
  },
  {
    icon: Truck,
    title: 'Domicilio o recogida',
    text: 'Recibe tu pedido en casa o pásalo a recoger en nuestra tienda de Piedecuesta.',
  },
  {
    icon: Sparkles,
    title: 'Pedidos personalizados',
    text: 'Cuéntanos qué necesitas, envía fotos de referencia por el chat y te cotizamos.',
  },
];

export function About() {
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-crema-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <AnimatedContent className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center" distance={32} stagger={0.15}>
          {/* Imagen */}
          <div className="relative">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5]">
              <img
                src={images.about.src}
                srcSet={images.about.srcSet}
                sizes="(min-width: 1024px) 560px, 90vw"
                width={images.about.width}
                height={images.about.height}
                alt={images.about.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-56 h-56 rounded-[1.5rem] overflow-hidden shadow-xl border-8 border-crema-100">
              <img
                src={images.local.src}
                srcSet={images.local.srcSet}
                sizes="224px"
                width={images.local.width}
                height={images.local.height}
                alt={images.local.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-5 -left-3 bg-verde-400 text-crema-100 rounded-2xl px-5 py-4 shadow-lg">
              <p className="text-xs opacity-90">Desde</p>
              <p className="font-serif text-3xl leading-none mt-0.5">{siteConfig.founded}</p>
            </div>
          </div>

          {/* Texto */}
          <div>
            <span className="text-terracota-400 font-semibold tracking-wider text-sm uppercase">
              Nosotros
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-serif text-cafe-500 leading-tight text-balance">
              Nuestra panadería en Piedecuesta
            </h2>
            <p className="mt-6 text-cafe-300 text-lg leading-relaxed">
              Somos {siteConfig.name}, en Piedecuesta, Santander, desde {siteConfig.founded}. Atendemos pedidos con domicilio y recogida en tienda, y hacemos pedidos personalizados para tus celebraciones.
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
        </AnimatedContent>
      </div>
    </section>
  );
}

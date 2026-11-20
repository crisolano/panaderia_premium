import AnimatedContent from '@/components/reactbits/AnimatedContent';
import { LoopVideo } from '@/components/LoopVideo';
import { gallery } from '@/data/site';

export function Gallery() {
  if (gallery.length === 0) return null;
  return (
    <section id="galeria" aria-labelledby="galeria-titulo" className="bg-crema-100 pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AnimatedContent className="mx-auto max-w-2xl text-center" distance={32}>
          <span className="text-sm font-semibold uppercase tracking-wider text-terracota-400">Galería</span>
          <h2
            id="galeria-titulo"
            className="mt-3 text-balance font-serif text-3xl leading-tight text-cafe-500 sm:text-4xl lg:text-5xl"
          >
            Así se ve nuestra panadería
          </h2>
          <p className="mt-5 text-lg text-cafe-300/80">
            Vitrinas llenas, tortas para toda ocasión y un salón para tomarte el café con calma.
          </p>
        </AnimatedContent>

        <AnimatedContent
          className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3"
          distance={32}
          stagger={0.08}
        >
          {gallery.map((item) => (
            <figure
              key={item.id}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-crema-200 shadow-sm ring-1 ring-cafe-500/10"
            >
              <img
                src={item.src}
                srcSet={item.srcSet}
                sizes="(min-width: 1024px) 400px, 50vw"
                width={800}
                height={1066}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {item.video && (
                <LoopVideo
                  src={item.video}
                  poster={item.src}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </figure>
          ))}
        </AnimatedContent>
      </div>
    </section>
  );
}

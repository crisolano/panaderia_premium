import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

// Recorrido de cámara (generado con Higgsfield a partir de fotos reales del local)
// que avanza y retrocede con el scroll. Los cuadros están en public/<folder>/hd|sd/f-001.webp…
// Dos juegos de cuadros: "hd" (1280 px) para pantallas grandes y "sd" (854 px) para celulares.
type FrameSet = 'hd' | 'sd';
const pickSet = (): FrameSet =>
  typeof window !== 'undefined' && window.innerWidth * Math.min(window.devicePixelRatio || 1, 2) >= 1100
    ? 'hd'
    : 'sd';
const frameUrl = (folder: string, i: number, set: FrameSet = 'sd') =>
  `${import.meta.env.BASE_URL}${folder}/${set}/f-${String(i + 1).padStart(3, '0')}.webp`;

export interface StoryCaption {
  eyebrow: string;
  title: string;
}

interface ScrollStoryProps {
  /** Carpeta dentro de public/ con los cuadros (subcarpetas hd y sd). */
  folder?: string;
  frameCount?: number;
  captions?: StoryCaption[];
  label?: string;
  /** Encuadre vertical según el avance (0 = arriba, 0.5 = centro, 1 = abajo). */
  anchorAt?: (t: number) => number;
  /** Cuadro que se muestra fijo con "reducir movimiento". */
  reducedFrame?: 'first' | 'last';
}

const defaultCaptions: StoryCaption[] = [
  { eyebrow: 'Panadería de tradición', title: siteConfig.tagline },
  { eyebrow: 'En nuestra vitrina', title: 'Hojaldres, pastelitos, tortas y postres' },
  { eyebrow: siteConfig.city.replace(', Colombia', ''), title: `Desde ${siteConfig.founded}` },
];

// Por defecto: centrado al inicio (la mesa) y arriba al final (el letrero).
const defaultAnchor = (t: number) => 0.5 - 0.5 * t;

export function ScrollStory({
  folder = 'scroll',
  frameCount: FRAME_COUNT = 96,
  captions = defaultCaptions,
  label = 'Recorrido por la panadería',
  anchorAt = defaultAnchor,
  reducedFrame = 'last',
}: ScrollStoryProps = {}) {
  const frameSrc = (i: number, set: FrameSet = 'sd') => frameUrl(folder, i, set);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frames: HTMLImageElement[] = [];
    const set = pickSet();
    let current = 0;
    let loaded = false;
    const anchorFor = (index: number) => anchorAt(index / (FRAME_COUNT - 1));

    const draw = (index: number) => {
      // Usa el cuadro cargado más cercano (hasta 10 de distancia); si no hay, queda la foto de fondo.
      let img: HTMLImageElement | undefined;
      for (let d = 0; d <= 10; d++) {
        const a = frames[index - d];
        const b = frames[index + d];
        if (a?.complete && a.naturalWidth) { img = a; break; }
        if (b?.complete && b.naturalWidth) { img = b; break; }
      }
      if (!img) return;
      const { width: cw, height: ch } = canvas;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, (cw - w) / 2, (ch - h) * anchorFor(index), w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      draw(current);
    };

    const load = () => {
      if (loaded) return;
      loaded = true;
      // Primero el cuadro inicial, el final y uno de cada 8; luego el resto.
      const order: number[] = [0, FRAME_COUNT - 1];
      for (let i = 8; i < FRAME_COUNT; i += 8) order.push(i);
      for (let i = 0; i < FRAME_COUNT; i++) if (!order.includes(i)) order.push(i);
      order.forEach((i) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = frameSrc(i, set);
        img.onload = () => {
          if (Math.abs(i - current) <= 8) draw(current);
        };
        frames[i] = img;
      });
    };

    // Empieza a descargar los cuadros cuando la sección se acerca a la pantalla.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: '1200px 0px' },
    );
    io.observe(section);

    window.addEventListener('resize', resize);
    resize();

    if (reduced) {
      // Sin movimiento: muestra un cuadro fijo y todos los textos.
      current = reducedFrame === 'last' ? FRAME_COUNT - 1 : 0;
      load();
      return () => {
        io.disconnect();
        window.removeEventListener('resize', resize);
      };
    }

    const setCaptions = (p: number) => {
      const n = captions.length;
      captionRefs.current.forEach((el, i) => {
        if (!el) return;
        const center = (i + 0.5) / n;
        const dist = Math.abs(p - center) * n; // 0 en el centro de su tramo, 0.5 en el borde
        // El primero ya se ve al entrar y el último se queda al salir; en los cambios nunca se superponen.
        const edge = (i === 0 && p < center) || (i === n - 1 && p > center);
        const opacity = edge ? 1 : Math.max(0, Math.min(1, (0.5 - dist) / 0.2));
        el.style.opacity = String(opacity);
        el.style.transform = `translateY(${(p - center) * -60}px)`;
      });
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const index = Math.min(FRAME_COUNT - 1, Math.round(self.progress * (FRAME_COUNT - 1)));
        if (index !== current) {
          current = index;
          draw(index);
        }
        setCaptions(self.progress);
      },
    });
    setCaptions(0);

    return () => {
      st.kill();
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder, FRAME_COUNT]);

  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className="relative h-[100svh] bg-cafe-900 motion-safe:h-[320vh]"
    >
      <div
        className="sticky top-0 h-[100svh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${frameSrc(0)})` }}
      >
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cafe-900/75 via-cafe-900/10 to-cafe-900/30"
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="relative min-h-[9rem] motion-reduce:flex motion-reduce:min-h-0 motion-reduce:flex-col motion-reduce:gap-6">
            {captions.map((c, i) => (
              <div
                key={c.title}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute bottom-0 left-0 max-w-2xl opacity-0 will-change-transform motion-reduce:static motion-reduce:opacity-100"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-maiz-200 sm:text-sm">
                  {c.eyebrow}
                </p>
                <p className="mt-3 font-serif text-4xl leading-[1.05] tracking-[-0.03em] text-crema-50 sm:text-6xl">
                  {c.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

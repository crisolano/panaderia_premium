import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

// Scroll suave con Lenis, sincronizado con GSAP/ScrollTrigger (según el README de Lenis).
// En táctil y con "reducir movimiento" Lenis deja el scroll nativo.
export function startSmoothScroll() {
  lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

// Lenis y scrollIntoView respetan el scroll-padding-top de index.css (alto del header fijo).
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: 'smooth' });
}

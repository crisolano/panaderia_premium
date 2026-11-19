import { useEffect, useRef, useState } from 'react';

interface LoopVideoProps {
  /** Ruta dentro de public/, sin barra inicial (p. ej. "video/p-hojaldres.mp4"). */
  src: string;
  /** Imagen que se ve mientras el video carga. */
  poster?: string;
  className?: string;
}

// Video decorativo en bucle que se superpone a una foto.
// - Solo se descarga y reproduce cuando entra en pantalla, y se pausa al salir.
// - Si el archivo falta o falla, desaparece y queda la foto de abajo.
// - Con "reducir movimiento" activado no se muestra.
export function LoopVideo({ src, poster, className = '' }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || failed) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [failed]);

  if (failed) return null;

  return (
    <video
      ref={ref}
      src={`${import.meta.env.BASE_URL}${src}`}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onError={() => setFailed(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover motion-reduce:hidden ${className}`}
    />
  );
}

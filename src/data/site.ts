import hero800 from '@/img/web/hero-800.webp';
import hero1280 from '@/img/web/hero-1280.webp';
import hero1600 from '@/img/web/hero-1600.webp';
import about480 from '@/img/web/about-480.webp';
import about800 from '@/img/web/about-800.webp';
import local240 from '@/img/web/local-240.webp';
import local480 from '@/img/web/local-480.webp';
import pHojaldres from '@/img/web/p-hojaldres.webp';
import pPastelitos from '@/img/web/p-pastelitos.webp';
import pTorta from '@/img/web/p-torta.webp';
import pPostre from '@/img/web/p-postre.webp';
import pCoco from '@/img/web/p-coco.webp';
import logoWordmark from '@/img/web/logo.webp';
import logoEmblem from '@/img/web/emblem.webp';

// ============================================================
// CONFIGURACIÓN DEL SITIO — Ricuras del Maíz
// Un valor vacío ('') o un arreglo vacío oculta esa sección del sitio.
// Solo llena lo que el negocio haya confirmado.
// ============================================================

export const siteConfig = {
  name: 'Panadería Ricuras del Maíz',
  tagline: 'Naturalmente delicioso',
  founded: 2002, // confirmado por el negocio (también está en el letrero del local)
  city: 'Piedecuesta, Santander, Colombia',
  address: 'Calle 3 #12-07, Barrio Villanueva',
  // Dos números de WhatsApp independientes. Formato internacional sin "+" ni espacios.
  whatsappPrimary: '573133447620',
  whatsappSecondary: '573208133071',
  whatsappDisplayPrimary: '+57 313 344 7620',
  whatsappDisplaySecondary: '+57 320 813 3071',
  // Pendientes de confirmar con el negocio. Mientras estén vacíos no se muestran.
  email: '',
  // Confirmado por el negocio. Si cambia, actualizar también openingHoursSpecification en index.html.
  hours: 'Todos los días: 6:00 a.m. – 9:00 p.m.',
  social: {
    instagram: '',
    facebook: '',
  },
};

// Enlace de WhatsApp con un mensaje inicial opcional. Sin número usa el principal.
export const waLink = (text?: string, number = siteConfig.whatsappPrimary): string =>
  `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export interface WhatsAppOption {
  id: 'primary' | 'secondary';
  label: string;
  number: string;
  display: string;
}

export const whatsappOptions: WhatsAppOption[] = [
  { id: 'primary', label: 'WhatsApp principal', number: siteConfig.whatsappPrimary, display: siteConfig.whatsappDisplayPrimary },
  { id: 'secondary', label: 'WhatsApp alternativo', number: siteConfig.whatsappSecondary, display: siteConfig.whatsappDisplaySecondary },
];

// ============================================================
// CATEGORÍAS DE PRODUCTOS
// ============================================================

export type Category =
  | 'panaderia'
  | 'pasteleria'
  | 'postres'
  | 'pedidos-personalizados'; // se cotiza por WhatsApp; no tiene tarjetas de producto por ahora

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
}

// Las categorías que se muestran como filtro. Se irán ampliando con más productos.
export const categories: CategoryInfo[] = [
  { id: 'panaderia', label: 'Panadería', description: 'Hojaldres y más' },
  { id: 'pasteleria', label: 'Pastelería', description: 'Pastelitos, tortas y dulces' },
  { id: 'postres', label: 'Postres', description: 'Postres individuales' },
];

// ============================================================
// PRODUCTOS — CATÁLOGO PENDIENTE DE CONFIRMAR CON EL NEGOCIO
// Sin "price" el sitio muestra "Precio por confirmar por WhatsApp".
// Los productos de "pedidos-personalizados" nunca llevan precio: se cotizan.
// ============================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price?: number; // pesos colombianos (COP); omitir si no está confirmado
  category: Category;
  image: string;
  featured?: boolean;
}

// MUESTRA DE DEMOSTRACIÓN: fotos reales del local. Los nombres y descripciones son
// tentativos (salen de las fotos) y el negocio debe corregirlos o completarlos.
export const products: Product[] = [
  {
    id: 'hojaldres',
    name: 'Hojaldres rellenos',
    description: 'Hojaldre relleno. Pregunta por los sabores disponibles.',
    category: 'panaderia',
    image: pHojaldres,
    featured: true,
  },
  {
    id: 'pastelitos',
    name: 'Pastelitos',
    description: 'Pastelitos con y sin chocolate.',
    category: 'pasteleria',
    image: pPastelitos,
  },
  {
    id: 'torta-porciones',
    name: 'Torta en porciones',
    description: 'Porciones de torta. Pregunta por tamaños y sabores.',
    category: 'pasteleria',
    image: pTorta,
  },
  {
    id: 'dulces-coco',
    name: 'Dulces de coco',
    description: 'Dulces cubiertos de coco.',
    category: 'pasteleria',
    image: pCoco,
  },
  {
    id: 'postre-fresa',
    name: 'Postre de fresa con crema',
    description: 'Postre individual con fresa y crema.',
    category: 'postres',
    image: pPostre,
  },
];

// ============================================================
// TESTIMONIOS — solo reseñas reales y autorizadas por el cliente.
// Mientras el arreglo esté vacío la sección no se muestra.
// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [];

// ============================================================
// IMÁGENES DEL SITIO — Editables
// ============================================================

// Fotos reales del local (src/img/web, WebP comprimido sin metadatos).
// srcSet permite que el navegador descargue solo el tamaño que necesita.
export interface SiteImage {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
}

// Marca: el nombre (para fondos claros) y el emblema de la espiga (sirve en claros y oscuros).
export const brand = {
  logo: { src: logoWordmark, width: 387, height: 168 },
  emblem: { src: logoEmblem, width: 160, height: 160 },
};

export const images: Record<'hero' | 'about' | 'local', SiteImage> = {
  hero: {
    src: hero1280,
    srcSet: `${hero800} 800w, ${hero1280} 1280w, ${hero1600} 1600w`,
    width: 1600,
    height: 1200,
    alt: 'Mesa con productos de Ricuras del Maíz: hojaldres, pastelitos, torta y café',
  },
  about: {
    src: about800,
    srcSet: `${about480} 480w, ${about800} 800w`,
    width: 800,
    height: 1067,
    alt: 'Letrero de la panadería Ricuras del Maíz, desde el 2002',
  },
  local: {
    src: local480,
    srcSet: `${local240} 240w, ${local480} 480w`,
    width: 480,
    height: 640,
    alt: 'Letrero de neón dentro del local: dónde el café, el pan y un dulce postre alegran tu vida',
  },
};

// ============================================================
// GOOGLE MAPS — Configuración centralizada
// ============================================================
//
// Para activar el mapa interactivo necesitas:
// 1. Obtener una API key de Google Cloud Console:
//    - Habilita la "Maps Embed API" (no Places API ni Directions API).
//    - Crea una clave de API (API key).
//    - Restringe la clave: HTTP referrer (dominio de producción) + API = Maps Embed API.
// 2. Copia la clave en el archivo .env del proyecto:
//    VITE_GOOGLE_MAPS_EMBED_API_KEY=tu_clave_aqui
// 3. Obtén el Place ID de tu ficha de Google Maps:
//    - Abre tu ficha de Google Maps Business.
//    - El Place ID se puede obtener desde la URL compartida o usando
//      https://developers.google.com/maps/documentation/places/web-service/place-id
//    - Pega el Place ID en googleMaps.placeId abajo.
// 4. Como alternativa puedes usar directamente la URL de embed (googleMaps.embedUrl).
//
// Sin API key el mapa se muestra igual, buscando por la dirección
// (embed sin clave). Confirma que el pin quede en el local antes de publicar.

export const googleMaps = {
  // Place ID de la ficha comercial de Ricuras del Maíz en Google Maps.
  // Sustituir por el real cuando esté disponible.
  placeId: '',
  // URL de embed directa (opcional). Si se usa, reemplaza al Place ID.
  embedUrl: '',
  // Clave API leída desde .env (VITE_GOOGLE_MAPS_EMBED_API_KEY)
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_EMBED_API_KEY ?? '',
  // Coordenadas tomadas de las fotos del local (GPS de 15 fotos, coinciden entre sí).
  // Google ubica la dirección escrita unos 200 m más al suroeste, por eso se prefiere esto.
  coordinates: { lat: 6.99336, lng: -73.04861 },
  // Dirección usada si no hubiera coordenadas. Se busca por dirección
  // (no por nombre) para no depender de que exista una ficha del negocio.
  query: `${siteConfig.address}, ${siteConfig.city}`,
  // Sustituir por el enlace exacto de la ficha de Google Maps cuando exista.
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=6.99336,-73.04861`,
};

// ============================================================
// TIPOS DE PRODUCTO PARA PEDIDOS PERSONALIZADOS
// ============================================================

export const customOrderTypes: string[] = [
  'Torta personalizada',
  'Mesa dulce',
  'Genovesa personalizada',
  'Pan especial',
  'Otro',
];


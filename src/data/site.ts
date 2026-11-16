// ============================================================
// CONFIGURACIÓN DEL SITIO — Ricuras del Maíz
// Un valor vacío ('') o un arreglo vacío oculta esa sección del sitio.
// Solo llena lo que el negocio haya confirmado.
// ============================================================

export const siteConfig = {
  name: 'Ricuras del Maíz',
  tagline: 'Naturalmente delicioso',
  city: 'Piedecuesta, Santander, Colombia',
  address: 'Calle 3 #12-07, Barrio Villanueva',
  // Dos números de WhatsApp independientes. Formato internacional sin "+" ni espacios.
  whatsappPrimary: '573133447620',
  whatsappSecondary: '573208133071',
  whatsappDisplayPrimary: '+57 313 344 7620',
  whatsappDisplaySecondary: '+57 320 813 3071',
  // Pendientes de confirmar con el negocio. Mientras estén vacíos no se muestran.
  email: '',
  hours: '',
  social: {
    instagram: '',
    facebook: '',
  },
};

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
  | 'tortas'
  | 'genovesas'
  | 'mantecadas'
  | 'bunuelos'
  | 'panes-especiales'
  | 'pedidos-personalizados';

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  { id: 'tortas', label: 'Tortas', description: 'Tortas artesanales para toda ocasión' },
  { id: 'genovesas', label: 'Genovesas', description: 'Bizcocho esponjoso con rellenos cremosos' },
  { id: 'mantecadas', label: 'Mantecadas', description: 'Suaves, dulces y tradicionales' },
  { id: 'bunuelos', label: 'Buñuelos', description: 'Crujientes por fuera, suaves por dentro' },
  { id: 'panes-especiales', label: 'Panes especiales', description: 'Elaborados con masa de maíz' },
  { id: 'pedidos-personalizados', label: 'Pedidos personalizados', description: 'Diseños únicos para tu celebración' },
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

export const products: Product[] = [
  // ---- TORTAS ----
  {
    id: 'torta-chocolate',
    name: 'Torta de Chocolate',
    description: 'Torta de chocolate.',
    category: 'tortas',
    image: 'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'torta-fresas',
    name: 'Torta de Fresas y Crema',
    description: 'Torta de fresas y crema.',
    category: 'tortas',
    image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'torta-cumpleanos',
    name: 'Torta de Cumpleaños',
    description: 'Torta de cumpleaños. Pregunta por temas y decoración.',
    category: 'tortas',
    image: 'https://images.pexels.com/photos/27176374/pexels-photo-27176374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'torta-frutos-rojos',
    name: 'Torta de Frutos Rojos',
    description: 'Torta de frutos rojos.',
    category: 'tortas',
    image: 'https://images.pexels.com/photos/28042335/pexels-photo-28042335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- GENOVESAS ----
  {
    id: 'genovesa-clasica',
    name: 'Genovesa Clásica',
    description: 'Genovesa clásica.',
    category: 'genovesas',
    image: 'https://images.pexels.com/photos/1359322/pexels-photo-1359322.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'genovesa-chocolate',
    name: 'Genovesa de Chocolate',
    description: 'Genovesa de chocolate.',
    category: 'genovesas',
    image: 'https://images.pexels.com/photos/12035746/pexels-photo-12035746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'genovesa-fresa',
    name: 'Genovesa de Fresa',
    description: 'Genovesa de fresa.',
    category: 'genovesas',
    image: 'https://images.pexels.com/photos/39646568/pexels-photo-39646568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- MANTECADAS ----
  {
    id: 'mantecada-clasica',
    name: 'Mantecada Clásica',
    description: 'Mantecada clásica.',
    category: 'mantecadas',
    image: 'https://images.pexels.com/photos/5847185/pexels-photo-5847185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'mantecada-chocolate',
    name: 'Mantecada de Chocolate',
    description: 'Mantecada de chocolate.',
    category: 'mantecadas',
    image: 'https://images.pexels.com/photos/20768168/pexels-photo-20768168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'mantecada-pack-12',
    name: 'Pack Mantecadas (12 unidades)',
    description: 'Paquete de doce mantecadas.',
    category: 'mantecadas',
    image: 'https://images.pexels.com/photos/37049121/pexels-photo-37049121.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- BUÑUELOS ----
  {
    id: 'bunuelos-docena',
    name: 'Buñuelos (docena)',
    description: 'Una docena de buñuelos.',
    category: 'bunuelos',
    image: 'https://images.pexels.com/photos/37178844/pexels-photo-37178844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'bunuelos-media',
    name: 'Buñuelos (media docena)',
    description: 'Media docena de buñuelos.',
    category: 'bunuelos',
    image: 'https://images.pexels.com/photos/36038590/pexels-photo-36038590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- PANES ESPECIALES ----
  {
    id: 'pan-maiz',
    name: 'Pan de Maíz',
    description: 'Pan de maíz.',
    category: 'panes-especiales',
    image: 'https://images.pexels.com/photos/30890566/pexels-photo-30890566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'pan-rustico',
    name: 'Pan Rústico Especial',
    description: 'Pan rústico especial.',
    category: 'panes-especiales',
    image: 'https://images.pexels.com/photos/35815220/pexels-photo-35815220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pan-canasta',
    name: 'Canasta de Panes Especiales',
    description: 'Canasta de panes especiales.',
    category: 'panes-especiales',
    image: 'https://images.pexels.com/photos/10202985/pexels-photo-10202985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- PEDIDOS PERSONALIZADOS ----
  {
    id: 'pedido-torta-evento',
    name: 'Torta Personalizada para Evento',
    description: 'Torta con diseño a tu medida. Cuéntanos tamaño, sabor y decoración y te cotizamos.',
    category: 'pedidos-personalizados',
    image: 'https://images.pexels.com/photos/10455239/pexels-photo-10455239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'pedido-mesa-dulce',
    name: 'Mesa Dulce Personalizada',
    description: 'Mesa dulce para tu evento. Cuéntanos qué necesitas y te cotizamos.',
    category: 'pedidos-personalizados',
    image: 'https://images.pexels.com/photos/40499996/pexels-photo-40499996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pedido-torta-boda',
    name: 'Torta para Boda',
    description: 'Torta para boda. Cuéntanos el diseño y te cotizamos.',
    category: 'pedidos-personalizados',
    image: 'https://images.pexels.com/photos/30233153/pexels-photo-30233153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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

export const images = {
  hero: 'https://images.pexels.com/photos/7877994/pexels-photo-7877994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  about: 'https://images.pexels.com/photos/30005123/pexels-photo-30005123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  breadOven: 'https://images.pexels.com/photos/35993723/pexels-photo-35993723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
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
  // Dirección usada para el mapa y el botón "Cómo llegar". Se busca por dirección
  // (no por nombre) para no depender de que exista una ficha del negocio.
  query: `${siteConfig.address}, ${siteConfig.city}`,
  // Sustituir por el enlace exacto de la ficha de Google Maps cuando exista.
  directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${siteConfig.address}, ${siteConfig.city}`
  )}`,
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


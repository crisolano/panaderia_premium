// ============================================================
// CONFIGURACIÓN DEL SITIO — Ricuras del Maíz
// Editar estos valores libremente. Todos los datos son demostrativos.
// ============================================================

export const siteConfig = {
  name: 'Ricuras del Maíz',
  tagline: 'Tradición y sabor en cada bocado',
  city: 'Piedecuesta, Santander, Colombia',
  address: 'Calle 3 #12-07, Barrio Villanueva',
  // Dos números de WhatsApp independientes. Formato internacional sin "+" ni espacios.
  whatsappPrimary: '573133447620',
  whatsappSecondary: '573208133071',
  whatsappDisplayPrimary: '+57 313 344 7620',
  whatsappDisplaySecondary: '+57 320 813 3071',
  email: 'contacto@ricurasdelmaiz.co',
  // Horario demostrativo — editable
  hours: 'Lun–Sáb: 7:00 a.m. – 7:00 p.m.',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
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
// PRODUCTOS — DATOS DEMOSTRATIVOS EDITABLES
// Los precios son de ejemplo. Sustitúyelos por los reales del negocio.
// ============================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // en pesos colombianos (COP)
  category: Category;
  image: string;
  featured?: boolean;
}

export const products: Product[] = [
  // ---- TORTAS ----
  {
    id: 'torta-chocolate',
    name: 'Torta de Chocolate',
    description: 'Bizcocho de chocolate con relleno cremoso y cobertura ganache. Ideal para celebraciones.',
    price: 45000,
    category: 'tortas',
    image: 'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'torta-fresas',
    name: 'Torta de Fresas y Crema',
    description: 'Bizcocho esponjoso con capas de crema y fresas frescas. Fresca y elegante.',
    price: 48000,
    category: 'tortas',
    image: 'https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'torta-cumpleanos',
    name: 'Torta de Cumpleaños',
    description: 'Torta decorada con temática personalizable. Incluye mensaje y velas.',
    price: 55000,
    category: 'tortas',
    image: 'https://images.pexels.com/photos/27176374/pexels-photo-27176374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'torta-frutos-rojos',
    name: 'Torta de Frutos Rojos',
    description: 'Bizcocho vanilla con crema de queso y frutos rojos frescos. Refrescante y sofisticada.',
    price: 52000,
    category: 'tortas',
    image: 'https://images.pexels.com/photos/28042335/pexels-photo-28042335.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- GENOVESAS ----
  {
    id: 'genovesa-clasica',
    name: 'Genovesa Clásica',
    description: 'Bizcocho esponjoso relleno de crema de vainilla. Suave como seda, un clásico de la casa.',
    price: 15000,
    category: 'genovesas',
    image: 'https://images.pexels.com/photos/1359322/pexels-photo-1359322.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'genovesa-chocolate',
    name: 'Genovesa de Chocolate',
    description: 'Bizcocho de chocolate relleno con crema de cacao. Para los amantes del chocolate intenso.',
    price: 16000,
    category: 'genovesas',
    image: 'https://images.pexels.com/photos/12035746/pexels-photo-12035746.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'genovesa-fresa',
    name: 'Genovesa de Fresa',
    description: 'Bizcocho suave con crema de fresa y trozos de fruta. Una delicia frutal.',
    price: 16000,
    category: 'genovesas',
    image: 'https://images.pexels.com/photos/39646568/pexels-photo-39646568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- MANTECADAS ----
  {
    id: 'mantecada-clasica',
    name: 'Mantecada Clásica',
    description: 'Mantecada tradicional colombiana, suave y dulce. Perfecta para acompañar el café.',
    price: 2000,
    category: 'mantecadas',
    image: 'https://images.pexels.com/photos/5847185/pexels-photo-5847185.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'mantecada-chocolate',
    name: 'Mantecada de Chocolate',
    description: 'Mantecada con chispas de chocolate. El toque dulce para tu merienda.',
    price: 2500,
    category: 'mantecadas',
    image: 'https://images.pexels.com/photos/20768168/pexels-photo-20768168.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'mantecada-pack-12',
    name: 'Pack Mantecadas (12 unidades)',
    description: 'Doce mantecadas mixtas: clásicas y de chocolate. Ideal para compartir.',
    price: 24000,
    category: 'mantecadas',
    image: 'https://images.pexels.com/photos/37049121/pexels-photo-37049121.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- BUÑUELOS ----
  {
    id: 'bunuelos-docena',
    name: 'Buñuelos (docena)',
    description: 'Doce buñuelos crujientes por fuera y suaves por dentro. Tradición santandereana.',
    price: 18000,
    category: 'bunuelos',
    image: 'https://images.pexels.com/photos/37178844/pexels-photo-37178844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'bunuelos-media',
    name: 'Buñuelos (media docena)',
    description: 'Seis buñuelos recién fritos. El antojito perfecto para la tarde.',
    price: 10000,
    category: 'bunuelos',
    image: 'https://images.pexels.com/photos/36038590/pexels-photo-36038590.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- PANES ESPECIALES ----
  {
    id: 'pan-maiz',
    name: 'Pan de Maíz',
    description: 'Pan elaborado con masa de maíz fresco. Corteza dorada y miga suave con sabor a maíz.',
    price: 12000,
    category: 'panes-especiales',
    image: 'https://images.pexels.com/photos/30890566/pexels-photo-30890566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'pan-rustico',
    name: 'Pan Rústico Especial',
    description: 'Pan artesanal con mezcla de harinas y fermentación lenta. Intenso y aromático.',
    price: 14000,
    category: 'panes-especiales',
    image: 'https://images.pexels.com/photos/35815220/pexels-photo-35815220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pan-canasta',
    name: 'Canasta de Panes Especiales',
    description: 'Selección de panes de maíz y rústicos. Cuatro piezas variadas en canasta de regalo.',
    price: 32000,
    category: 'panes-especiales',
    image: 'https://images.pexels.com/photos/10202985/pexels-photo-10202985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },

  // ---- PEDIDOS PERSONALIZADOS ----
  {
    id: 'pedido-torta-evento',
    name: 'Torta Personalizada para Evento',
    description: 'Torta con diseño temático para tu celebración. Tamaño, sabor y decoración a tu elección. Consulta disponibilidad.',
    price: 80000,
    category: 'pedidos-personalizados',
    image: 'https://images.pexels.com/photos/10455239/pexels-photo-10455239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'pedido-mesa-dulce',
    name: 'Mesa Dulce Personalizada',
    description: 'Selección de tortas, genovesas y mantecadas para tu evento. Cantidad y variedad según tu necesidad.',
    price: 150000,
    category: 'pedidos-personalizados',
    image: 'https://images.pexels.com/photos/40499996/pexels-photo-40499996.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pedido-torta-boda',
    name: 'Torta para Boda',
    description: 'Torta multinivel con decoración floral y elegante. Diseño exclusivo para tu día especial.',
    price: 250000,
    category: 'pedidos-personalizados',
    image: 'https://images.pexels.com/photos/30233153/pexels-photo-30233153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

// ============================================================
// TESTIMONIOS — DATOS DEMOSTRATIVOS EDITABLES
// ============================================================

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Laura Gómez',
    location: 'Piedecuesta',
    text: 'La torta de fresas y crema que pedí para el cumpleaños de mi hija fue espectacular. Súper fresca y el pedido por WhatsApp fue rapidísimo. ¡Las volveré a pedir!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Carlos Mendoza',
    location: 'Floridablanca',
    text: 'Los buñuelos son los mejores de la zona. Crispantes por fuera y suaves por dentro. El domicilio llegó a tiempo y bien caliente. Excelente servicio.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Andrea Rueda',
    location: 'Bucaramanga',
    text: 'Pedí una torta personalizada para mi boda y superó mis expectativas. El diseño era hermoso y el sabor delicioso. Muchísimas gracias por hacer nuestro día especial.',
    rating: 5,
  },
];

// ============================================================
// IMÁGENES DEL SITIO — Editables
// ============================================================

export const images = {
  hero: 'https://images.pexels.com/photos/7877994/pexels-photo-7877994.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  about: 'https://images.pexels.com/photos/30005123/pexels-photo-30005123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  breadOven: 'https://images.pexels.com/photos/35993723/pexels-photo-35993723.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

// ============================================================
// HORARIOS DE RECOGIDA — Demostrativos, editables
// ============================================================

export const pickupTimeSlots: string[] = [
  '7:00 a.m.',
  '8:00 a.m.',
  '9:00 a.m.',
  '10:00 a.m.',
  '11:00 a.m.',
  '12:00 p.m.',
  '1:00 p.m.',
  '2:00 p.m.',
  '3:00 p.m.',
  '4:00 p.m.',
  '5:00 p.m.',
  '6:00 p.m.',
];

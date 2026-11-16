// ============================================================
// CONFIGURACIÓN DEL SITIO — Editar estos valores libremente
// ============================================================

export const siteConfig = {
  name: 'Panadería Artesanal',
  tagline: 'El sabor de lo hecho con amor',
  // Número de WhatsApp en formato internacional, sin "+", espacios ni guiones.
  // Ej: Colombia 57 300 123 4567 => 573001234567
  whatsappNumber: '573001234567',
  email: 'contacto@panaderiaartesanal.co',
  address: 'Calle 123 #45-67, Bogotá, Colombia',
  hours: 'Lun–Sáb: 6:00 a.m. – 8:00 p.m.',
  phoneDisplay: '+57 300 123 4567',
  social: {
    instagram: 'https://instagram.com',
    facebook: 'https://facebook.com',
  },
};

export type Category = 'panes' | 'croissants' | 'pasteles' | 'cafe';

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  { id: 'panes', label: 'Panes', description: 'Masa madre y fermentación natural' },
  { id: 'croissants', label: 'Croissants', description: 'Hojaldre francés mantequilla' },
  { id: 'pasteles', label: 'Pasteles', description: 'Repostería artesanal dulce' },
  { id: 'cafe', label: 'Café', description: 'Café de origen colombiano' },
];

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // en pesos colombianos (COP)
  category: Category;
  image: string;
  featured?: boolean;
}

// ============================================================
// DATOS DE PRODUCTOS — Editables. Imágenes reales de Pexels.
// ============================================================

export const products: Product[] = [
  {
    id: 'pan-masa-madre',
    name: 'Pan de Masa Madre',
    description: 'Fermentación natural de 24 horas, corteza crujiente y miga húmeda con notas ligeramente ácidas.',
    price: 18000,
    category: 'panes',
    image: 'https://images.pexels.com/photos/30890566/pexels-photo-30890566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'pan-campestre',
    name: 'Pan Campestre de Trigo',
    description: 'Pan rústico con harina de trigo entero, ideal para acompañar quesos y mermeladas.',
    price: 14500,
    category: 'panes',
    image: 'https://images.pexels.com/photos/28354523/pexels-photo-28354523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pan-avena-miel',
    name: 'Pan de Avena y Miel',
    description: 'Pan suave con copos de avena y un toque de miel de abejas. Perfecto para el desayuno.',
    price: 16000,
    category: 'panes',
    image: 'https://images.pexels.com/photos/28984953/pexels-photo-28984953.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pan-rustico-mixto',
    name: 'Pan Rústico Mixto',
    description: 'Selección de panes artesanales: masa madre, multicereal y de centeno. Una caja surtida.',
    price: 32000,
    category: 'panes',
    image: 'https://images.pexels.com/photos/30826792/pexels-photo-30826792.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'croissant-mantequilla',
    name: 'Croissant de Mantequilla',
    description: 'Hojaldre francés con 81 capas de mantequilla europea. Crujiente por fuera, aireado por dentro.',
    price: 6500,
    category: 'croissants',
    image: 'https://images.pexels.com/photos/20002837/pexels-photo-20002837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'croissant-chocolate',
    name: 'Croissant de Chocolate',
    description: 'Croissant relleno de chocolate belga 70%. La combinación perfecta de mantequilla y cacao.',
    price: 7500,
    category: 'croissants',
    image: 'https://images.pexels.com/photos/6202224/pexels-photo-6202224.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'croissant-almendras',
    name: 'Croissant de Almendras',
    description: 'Relleno de crema frangipane de almendras tostadas y espolvoreado con azúcar glas.',
    price: 8000,
    category: 'croissants',
    image: 'https://images.pexels.com/photos/30853716/pexels-photo-30853716.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'croissant-canasta',
    name: 'Canasta de Croissants (6 uds)',
    description: 'Seis croissants mixtos: 2 de mantequilla, 2 de chocolate y 2 de almendra. Ideal para compartir.',
    price: 36000,
    category: 'croissants',
    image: 'https://images.pexels.com/photos/16192282/pexels-photo-16192282.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pastel-chocolate',
    name: 'Pastel de Chocolate',
    description: 'Bizcocho de chocolate con ganache cremoso y frutos rojos. Una porción de indulgencia pura.',
    price: 12000,
    category: 'pasteles',
    image: 'https://images.pexels.com/photos/10249461/pexels-photo-10249461.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'pastel-mousse',
    name: 'Mousse de Chocolate',
    description: 'Mouse de chocolate con crema batida y nueces caramelizadas. Suave como seda.',
    price: 11000,
    category: 'pasteles',
    image: 'https://images.pexels.com/photos/8601851/pexels-photo-8601851.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pastel-berry',
    name: 'Pastel de Frutos Rojos',
    description: 'Capas de bizcocho vanilla, crema de queso y frutos rojos frescos. Refrescante y elegante.',
    price: 13500,
    category: 'pasteles',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'pastel-naranja-choco',
    name: 'Pastel de Naranja y Chocolate',
    description: 'Bizcocho aromatizado con naranja y cobertura de chocolate amargo. Cítrico y profundo.',
    price: 12500,
    category: 'pasteles',
    image: 'https://images.pexels.com/photos/30427454/pexels-photo-30427454.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'cafe-latte',
    name: 'Café Latte',
    description: 'Espresso de café colombiano con leche vaporizada y arte latte. Una obra en cada taza.',
    price: 9000,
    category: 'cafe',
    image: 'https://images.pexels.com/photos/2226091/pexels-photo-2226091.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    featured: true,
  },
  {
    id: 'cafe-cappuccino',
    name: 'Cappuccino Clásico',
    description: 'Espresso, leche vaporizada y espuma sedosa. La proporción italiana tradicional.',
    price: 8500,
    category: 'cafe',
    image: 'https://images.pexels.com/photos/19252265/pexels-photo-19252265.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'cafe-arte-latte',
    name: 'Latte Art Especial',
    description: 'Café preparado por nuestro barista con diseño personalizado en la espuma. Un detalle único.',
    price: 10000,
    category: 'cafe',
    image: 'https://images.pexels.com/photos/765162/pexels-photo-765162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

// ============================================================
// TESTIMONIOS — Editables
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
    name: 'María Camila Restrepo',
    location: 'Bogotá',
    text: 'El pan de masa madre es el mejor que he probado en la ciudad. Se nota el amor y la paciencia en cada mordida. Ya es parte de nuestro desayuno de los domingos.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Juan Sebastián López',
    location: 'Medellín',
    text: 'Pedí los croissants de chocolate para una reunión y desaparecieron en minutos. La textura hojaldrada es perfecta, como en París. Súper recomendados.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Daniela Ortega',
    location: 'Cali',
    text: 'El pastel de frutos rojos fue el centro de atención en el cumpleaños de mi mamá. Fresco, elegante y delicioso. Pedir por WhatsApp fue rapidísimo.',
    rating: 5,
  },
];

// Imágenes del sitio
export const images = {
  hero: 'https://images.pexels.com/photos/30890566/pexels-photo-30890566.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  about: 'https://images.pexels.com/photos/2253636/pexels-photo-2253636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  breadOven: 'https://images.pexels.com/photos/36891446/pexels-photo-36891446.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

import { MessageCircle } from 'lucide-react';
import { siteConfig, waLink } from '@/data/site';

// Acceso directo a WhatsApp visible en toda la página: el pedido se hace por ahí.
export function WhatsAppFloat() {
  return (
    <a
      href={waLink(`¡Hola ${siteConfig.name}! Quiero hacer un pedido.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1FB855] text-white font-semibold shadow-xl transition-colors w-14 h-14 justify-center sm:w-auto sm:h-auto sm:px-5 sm:py-3.5"
    >
      <MessageCircle size={24} />
      <span className="hidden sm:inline">Pedir por WhatsApp</span>
    </a>
  );
}

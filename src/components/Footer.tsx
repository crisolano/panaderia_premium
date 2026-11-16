import { Wheat, Instagram, Facebook } from 'lucide-react';
import { siteConfig, whatsappOptions } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-cafe-900 text-crema-200/70 py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Marca */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-full bg-maiz-300 flex items-center justify-center text-cafe-900">
                <Wheat size={22} />
              </span>
              <span className="font-serif text-xl text-crema-100">{siteConfig.name}</span>
            </div>
            <p className="mt-4 max-w-sm leading-relaxed">
              {siteConfig.tagline}. Panadería artesanal de maíz en {siteConfig.city}. Tortas, genovesas, mantecadas, buñuelos y panes especiales.
            </p>
            <div className="mt-5 flex gap-3">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-crema-100/10 hover:bg-maiz-300 hover:text-cafe-900 flex items-center justify-center text-crema-100 transition-colors">
                <Instagram size={18} />
              </a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-crema-100/10 hover:bg-maiz-300 hover:text-cafe-900 flex items-center justify-center text-crema-100 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-serif text-crema-100 text-lg mb-4">Navegación</h4>
            <ul className="space-y-2.5">
              {[
                { id: 'inicio', label: 'Inicio' },
                { id: 'nosotros', label: 'Nosotros' },
                { id: 'productos', label: 'Productos' },
                { id: 'contacto', label: 'Contacto' },
              ].map((l) => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="hover:text-maiz-200 transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-serif text-crema-100 text-lg mb-4">Contacto</h4>
            <ul className="space-y-2.5 text-sm">
              <li>{siteConfig.address}</li>
              <li>{siteConfig.city}</li>
              {whatsappOptions.map((opt) => (
                <li key={opt.id}>{opt.display}</li>
              ))}
              <li>{siteConfig.email}</li>
              <li>{siteConfig.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-crema-100/10 text-sm flex flex-col sm:flex-row justify-between items-center gap-3">
          <p>© {year} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>Hecho con maíz y amor en Santander.</p>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { brand, siteConfig } from '@/data/site';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const navLinks = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'productos', label: 'Productos' },
  { id: 'personalizar', label: 'Personalizar' },
  { id: 'contacto', label: 'Contacto' },
];

export function Header({ cartCount, onCartClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-crema-100/95 backdrop-blur-md shadow-[0_2px_20px_rgba(73,51,38,0.08)]'
          : 'bg-crema-100/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <button
          onClick={() => handleNav('inicio')}
          className="flex items-center group"
          aria-label={`${siteConfig.name}: ir al inicio`}
        >
          <img
            src={brand.logo.src}
            width={brand.logo.width}
            height={brand.logo.height}
            alt=""
            className="h-14 sm:h-16 w-auto group-hover:scale-[1.03] transition-transform"
          />
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className="text-cafe-300 hover:text-terracota-400 font-medium text-[0.95rem] transition-colors relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-terracota-400 hover:after:w-full after:transition-all"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCartClick}
            className="relative w-11 h-11 rounded-full bg-cafe-500 text-crema-100 flex items-center justify-center hover:bg-cafe-700 transition-colors"
            aria-label="Abrir carrito"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-maiz-300 text-cafe-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-fade-in">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden w-11 h-11 rounded-full bg-crema-200 text-cafe-500 flex items-center justify-center"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-crema-100 border-t border-crema-300 animate-fade-in">
          <ul className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNav(link.id)}
                  className="w-full text-left py-3 px-3 rounded-lg text-cafe-500 hover:bg-crema-200 font-medium transition-colors"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

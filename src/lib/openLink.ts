// Abre un enlace en pestaña nueva con un clic de ancla (window.open puede devolver null
// o ser bloqueado en algunos navegadores y vistas incrustadas; un ancla no).
export function openLink(url: string): void {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

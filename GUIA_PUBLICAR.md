# Guía para publicar Panadería Ricuras del Maíz

Revisión de privacidad y seguridad hecha el 16 de noviembre de 2026. No es asesoría legal: conviene que un abogado revise la política de privacidad antes de publicar.

## 1. Qué se revisó y qué quedó resuelto

| Tema | Resultado |
|---|---|
| Dependencias | `npm audit`: 0 vulnerabilidades (había 13, todas de desarrollo; ninguna llegaba a producción). |
| Secretos en el código y el historial | No se encontraron claves ni tokens. |
| Datos personales | El sitio no tiene servidor ni base de datos. Lo que escribe el cliente solo sale hacia WhatsApp cuando él pulsa el botón. |
| Almacenamiento local | Solo guarda producto y cantidad del carrito, nunca datos personales. |
| Google Fonts | Eliminado. Las fuentes ahora se sirven desde el propio sitio, así que la IP del visitante ya no va a Google por eso. |
| Google Maps | Sigue siendo un tercero: al cargar el mapa Google recibe datos técnicos del visitante. Está declarado en la política. |
| Política de privacidad | Nueva página `/privacidad.html`, enlazada en el pie, en el carrito y en el formulario de cotización. |
| Consentimiento | El carrito exige marcar la autorización antes de enviar el pedido (probado: sin marcar no abre WhatsApp). |
| Encabezados de seguridad | `public/_headers`: CSP estricta, `nosniff`, Referrer-Policy, Permissions-Policy, HSTS, caché larga en `/assets`. |
| Mapa con clave de API | Corregido: usa las coordenadas exactas, no la dirección escrita (que cae unos 200 m más allá). |
| Favicon | Añadido provisional (letra R sobre fondo dorado). Cámbialo por el logo real cuando lo tengas. |

## 2. Qué se probó y qué no

Probado de verdad: typecheck, lint y build; sitio servido con los encabezados reales de `_headers`, sin errores de consola ni violaciones de CSP; fuentes propias cargadas; las 8 imágenes cargan; el iframe del mapa se crea sin violaciones de CSP (no comprobé visualmente que el mapa dibuje); carrito con y sin consentimiento; la página de privacidad se muestra bien.

No probado: el diseño en celular (el emulador dio anchos inconsistentes), la apertura real de WhatsApp (se interceptó el enlace y se revisó el mensaje), y el comportamiento de los encabezados en el hosting real. Revisa esto último con la URL pública (ver paso 4).

## 3. Datos que debes confirmar antes de publicar

- **Dirección:** el sitio dice "Calle 3 #12-07, Barrio Villanueva", pero la ficha de Google muestra "Cra. 12 #2a-69". Define cuál es la correcta y úsala igual en el sitio, la política y Google.
- **Razón social y NIT:** no están en la política porque no los tengo. Si los tienes, agrégalos en el punto 1 de `public/privacidad.html`.
- **Precios:** hoy el sitio dice "Precio por confirmar por WhatsApp". La Ley 1480 de 2011 pide informar precio al consumidor en ventas a distancia. Conviene publicar precios reales de los productos que muestres.
- **Nombres de productos:** son tentativos, salen de las fotos. Corrígelos.
- **Correo y redes sociales:** están ocultos hasta que los confirmes (`src/data/site.ts`).
- **Horario:** el sitio dice todos los días, 6:00 a.m. a 9:00 p.m. Ponlo igual en Google.
- **Fotos originales (HEIC):** `src/img/` contiene los originales con la ubicación GPS de las fotos y el repositorio es público. Las versiones web ya no llevan GPS. Si quieres, puedo sacar los HEIC del repositorio (queda en el historial salvo que se reescriba).

## 4. Cómo publicar (recomendado: Cloudflare Pages, gratis)

1. Entra a Cloudflare, crea una cuenta y ve a Workers & Pages > Create > Pages > Connect to Git.
2. Elige el repositorio `crisolano/panaderia_premium` y la rama que vayas a publicar (idealmente `main`, después de revisar y fusionar `fix/auditoria-ricuras`).
3. Configuración de compilación: comando `npm run build`, carpeta de salida `dist`.
4. Cloudflare publica en una dirección `*.pages.dev` con HTTPS. Cloudflare lee `_headers` solo.
5. Comprueba la CSP en la URL real: abre el sitio, mira la consola del navegador (no debe haber errores de "Content Security Policy") y comprueba que se ven fuentes, fotos y mapa. Puedes revisar los encabezados en <https://securityheaders.com>.
6. Dominio: compra uno (por ejemplo `ricurasdelmaiz.com`) y asócialo en Pages > Custom domains. Detalles y precios en `GUIA_GOOGLE_Y_DOMINIO.md`.

Alternativas: Netlify también lee `_headers`. GitHub Pages no admite encabezados personalizados, así que perderías la CSP. Vercel (plan gratuito) no permite uso comercial.

## 5. Después de tener dominio

Ya hecho en el código: la dirección oficial es `https://ricurasdelmaiz.com` (sin `www`), con `canonical`, `og:url`, imagen de vista previa (`og-image.jpg`), datos estructurados con `url`, `image` y `logo`, `sitemap.xml` y `robots.txt` apuntando a él. Cloudflare ya redirige `http` a `https`.

Pendiente en el panel de Cloudflare (no se puede hacer desde el código):
1. En Workers & Pages > panaderia-premium > Custom domains, agrega también `www.ricurasdelmaiz.com`.
2. Para que `www` lleve al dominio oficial, en el dominio ve a Rules > Redirect Rules y crea una regla: si el host es `www.ricurasdelmaiz.com`, redirigir (301, conservando la ruta) a `https://ricurasdelmaiz.com`.
3. Añade el sitio a Google Search Console y envía `https://ricurasdelmaiz.com/sitemap.xml`.
4. En la ficha de Google Business Profile pon la web, el nombre "Panadería Ricuras del Maíz", el horario y la dirección correctos.
5. Si activas la clave de API de Google Maps, crea `.env` con `VITE_GOOGLE_MAPS_EMBED_API_KEY` y restríngela por dominio en Google Cloud. Sin clave el mapa ya funciona.

## 6. Si cambias algo de los encabezados

La CSP solo permite recursos del propio sitio y el mapa de `www.google.com`. Si añades analítica, un chat, otro tipo de letra externo o un video, habrá que ampliar `public/_headers` o el recurso quedará bloqueado.

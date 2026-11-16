# Informe de auditoría — Ricuras del Maíz

Rama: `fix/auditoria-ricuras` (la rama `main` no se tocó).

## Pendientes antes de publicar (los llena el negocio)

Todo esto vive en `src/data/site.ts`. Un valor vacío oculta la sección.

| Dato | Estado actual |
|---|---|
| Precios | Sin precio: se muestra "Precio por confirmar por WhatsApp". Para activarlos, añadir `price` al producto. |
| Catálogo (nombres y variantes) | **Sin confirmar.** Se conservaron los 18 productos y las 6 categorías como estructura, con descripciones neutras. El negocio debe validar qué vende realmente. |
| Fotos | Son fotos de stock de Pexels, no productos reales. Hay fotos del negocio (HEIC) en `src/img/`: hay que convertirlas a JPG/WebP y enlazarlas. |
| Horario | Vacío (`hours`). |
| Correo | Vacío (`email`). |
| Instagram / Facebook | Vacíos (`social`). |
| Testimonios | Arreglo vacío; la sección no se muestra. Usar solo reseñas reales y autorizadas. |
| Google Maps | Busca por dirección sin API key. **Verificar que el pin caiga en el local.** Mejor: pegar el enlace/Place ID de la ficha en `googleMaps.embedUrl` o `placeId`. |
| API key de Maps (opcional) | En Google Cloud: restringir por referente HTTP (dominio) y solo a "Maps Embed API". Va en `.env`. |
| Costo y cobertura de domicilio | No definidos; el sitio indica que se confirman por WhatsApp. |
| Favicon | Se quitó el enlace a `/vite.svg` (no existía). Falta un favicon propio. |

## Problemas encontrados y correcciones

Crítico (información inventada):
- 18 precios de demostración mostrados como reales y sumados en carrito y mensaje → eliminados.
- 3 testimonios inventados → eliminados; la sección se oculta si no hay datos.
- Horario, correo y redes sociales genéricos → ocultos hasta confirmarlos.
- Historia inventada en "Nosotros" (generaciones, abuelas, "100% Artesanal", "nada congelado") y detalles inventados en descripciones de producto → reescritos solo con hechos confirmados.
- Eslogan incorrecto → ahora "Naturalmente delicioso" (página, meta descripción y pie de página).

Alto (reglas funcionales):
- Productos personalizados se podían añadir al carrito con precio fijo → ahora tienen botón "Cotizar" que lleva al formulario de cotización por WhatsApp.
- Mensaje de cotización con formato roto (`_*Nota:_`) → corregido.
- `window.open` sin `noopener` → corregido en ambos formularios.
- Mapa: buscaba por nombre del negocio (pin posiblemente erróneo) y no mostraba nada sin API key → busca por dirección y funciona sin clave. "Cómo llegar" también usa solo la dirección.
- Faltaba "Personalizar" en el menú → añadido (cabecera y pie).

Medio:
- Carrito guardaba el producto completo (precio incluido) en `localStorage` sin validar → ahora guarda solo `{id, quantity}`, lee nombre y precio del catálogo vigente, descarta datos inválidos y limita la cantidad a 99.
- Cantidad del pedido personalizado aceptaba 0, negativos y decimales; la fecha aceptaba días pasados → validados.
- Teléfono del carrito solo se validaba como "no vacío" → mínimo 7 dígitos.
- Horarios de recogida (7 a.m.–6 p.m.) derivados del horario no confirmado → reemplazados por un campo libre opcional.
- Dependencia `@supabase/supabase-js` sin uso → eliminada. Paquete renombrado a `ricuras-del-maiz`.
- `index.html`: título "Artisanal Bakery Online Store" y favicon roto → corregidos.
- Error de lint (`Send` sin usar) → corregido.

Accesibilidad:
- Carrito cerrado seguía en el orden de tabulación; sin `role="dialog"` ni cierre con Escape → corregido.
- Etiquetas sin asociar a sus campos; errores no anunciados → `htmlFor`/`id`, `aria-invalid`, `aria-describedby`, `role="alert"`.
- Botones de selección sin estado → `aria-pressed` (tipo de entrega, filtros) y `aria-expanded` (menú móvil).
- Contraste insuficiente en textos secundarios (`text-cafe-300/60` y `/70`) → subidos.
- Header fijo tapaba los títulos al saltar a una sección; sin soporte de movimiento reducido → `scroll-padding-top` y `prefers-reduced-motion`.

## Archivos modificados

`index.html`, `package.json`, `package-lock.json`, `.env.example`, `src/index.css`, `src/App.tsx`, `src/data/site.ts`, `src/hooks/useCart.ts`, y en `src/components/`: `About`, `CartDrawer`, `Contact`, `CustomOrder`, `Footer`, `Header`, `Hero`, `ProductCard`, `Products`, `Testimonials`.

No se eliminó ninguna función: carrito, filtros, formulario de cotización, selección entre los dos WhatsApp y mapa siguen operando. Solo cambiaron el selector de horarios de recogida (por campo libre) y el marcador "Mapa en configuración" (ya no hace falta).

## Pruebas ejecutadas

Proyecto sin pruebas automatizadas; no se agregó framework de pruebas.

- `npm run typecheck`: sin errores (antes y después).
- `npm run lint`: antes 1 error; después sin errores.
- `npm run build`: compila (antes y después).
- Verificación manual en navegador (servidor de desarrollo, escritorio), con `window.open` interceptado para leer el enlace generado:
  - Carrito: añadir productos, cantidades, persistencia (`[{id, quantity}]`).
  - Validaciones del checkout: campos vacíos, teléfono corto.
  - Mensaje de WhatsApp por domicilio y por recogida: texto correcto, número `573133447620` y alterno `573208133071`, sin precios inventados.
  - Cotización personalizada: validación de cantidad (0, decimal) y fecha pasada; mensaje correcto; botones "Cotizar" (3) y ninguno "Añadir" en personalizados.
  - Búsqueda de datos eliminados en la página: sin precios, testimonios, horario ni correo.
  - Carrito cerrado: `visibility: hidden`; `role="dialog"` presente.

## No verificado

- Diseño responsive en móvil: el emulador de viewport dio resultados poco fiables (ancho inconsistente); no lo doy por probado. Revisar en un teléfono real.
- Que el mapa muestre el pin exacto del local.
- Apertura real de WhatsApp (solo se comprobó el enlace generado).
- Lectores de pantalla y navegación por teclado completa (solo se revisó el código y atributos).
- Contraste: se subió la opacidad, pero no se midió con herramienta.
- Rendimiento con imágenes: siguen siendo enlaces externos a Pexels.

## Recomendaciones antes de publicar

1. Confirmar con el negocio catálogo, precios, horario, correo y redes, y llenarlos en `src/data/site.ts`.
2. Reemplazar las fotos de stock por fotos reales (convertir los HEIC de `src/img/`).
3. Verificar el mapa (o usar el enlace/Place ID de la ficha) y, si se usa API key, restringirla.
4. Probar el flujo completo desde un teléfono con WhatsApp.
5. Añadir favicon y metadatos para compartir (Open Graph).
6. Definir con el negocio costo y cobertura de domicilio.

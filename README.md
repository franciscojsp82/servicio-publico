# Servicio Público · Indicadores de gestión

Sitio estático para publicar con **GitHub Pages**. Muestra el seguimiento de 3 indicadores de gestión comunes a 19 unidades del Servicio (nivel central y direcciones regionales).

## Páginas

- `index.html` — Portada: presentación, indicadores comprometidos y acceso a las unidades.
- `resumen.html` — Resumen de Unidades: tabla consolidada con valor efectivo y cumplimiento.
- `unidad.html?id=...` — Detalle de cada unidad (una dirección por unidad, por ejemplo `unidad.html?id=dr-maule`).

## Actualizar las cifras

Edita solo **`assets/datos.js`**. Cada unidad tiene una línea como esta:

```js
{ id: "dr-maule", nombre: "Dirección Regional del Maule", nivel: "regional", valores: [93.8, 72.7, 5.1] },
```

`valores` corresponde a los indicadores 1, 2 y 3, en porcentaje. Las metas están en la sección `indicadores`. El cumplimiento y el estado (Cumplido, En riesgo, No cumplido) se calculan solos:

- Indicadores 1 y 2: efectivo / meta.
- Indicador 3 (ausentismo, menor es mejor): meta / efectivo.
- Tope de 100%. Cumplido: 100%; En riesgo: 90% a 99,9%; No cumplido: bajo 90%.

> Las cifras incluidas son **valores de ejemplo**.

## Publicar en GitHub Pages

1. Crea un repositorio público, por ejemplo `servicio-publico`.
2. Sube todos los archivos manteniendo la carpeta `assets/`.
3. En **Settings → Pages**, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. El sitio queda en `https://<tu-usuario>.github.io/servicio-publico/`.

Para verlo en tu computador, abre `index.html` con doble clic: funciona sin servidor.

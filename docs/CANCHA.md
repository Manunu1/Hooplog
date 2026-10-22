# Geometría de la cancha

Referencia: `Background+Border.png` adjuntada para esta corrección. Sin valores ni porcentajes dentro de las regiones.

`src/components/hooplog/court-geometry.ts` define 14 regiones cerradas, con IDs estables. Conserva los 12 IDs anteriores y agrega `mid-band-left` y `mid-band-right`, las regiones de media distancia inferiores que faltaban. Las bandas son tramos exactos de tres curvas cuadráticas compartidas; el lado derecho es un reflejo geométrico del izquierdo. Los interiores no se superponen: únicamente comparten sus bordes. El fondo debajo del arco exterior es decoración, no una zona de tiro adicional.

`src/data/demo-court.ts` contiene los colores ilustrativos, separados de los paths. `Court` conserva `heatmap` y acepta `zoneColors: Partial<Record<CourtZoneId, string>>` para personalizar cada región. Todos los consumidores existentes reciben la nueva geometría automáticamente.

La pintura es una región independiente (`paint`). Su relleno naranja se representa también como una capa visual translúcida sobre esa misma geometría; el aro y las marcas se agrupan con `pointerEvents="none"`. En una etapa interactiva, los eventos se agregarán a los paths de las zonas: tocar la pintura corresponderá a `paint`, nunca al aro ni a la capa decorativa. La capa naranja mezcla el color asignado a `paint` para conservar esta referencia visual.

El SVG usa un `viewBox` fijo, `preserveAspectRatio` y la misma relación de aspecto en su contenedor. No agrega dependencias ni APIs nativas; continúa utilizando `react-native-svg`, ya instalado y compatible con Expo Go.

Para comprobar colores individuales: `<Court zoneColors={{ 'mid-band-left': '#FF6B58', 'arc-left': '#B9EF91' }} />`. Esas dos regiones comparten un borde, pero sus interiores son independientes. El mapa de ejemplo no representa datos reales ni introduce selección o persistencia.

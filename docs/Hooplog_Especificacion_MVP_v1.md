# Hooplog — Especificación del MVP (v1.1)

**Estado:** decisiones principales aprobadas; listo para iniciar desarrollo. **Fecha:** 19 de octubre de 2026.  
**Propósito:** servir de fuente de referencia al continuar el proyecto en otra cuenta.

## 1. Visión del producto [CONFIRMADO]

Hooplog es una aplicación móvil de básquet, con el lema «By hoopers, for hoopers», para que jugadores registren sus entrenamientos de tiro y comprendan desde qué zonas de la cancha tienen mejor y peor rendimiento. El usuario crea una cuenta, inicia una sesión y registra sus tiros por zonas; la app conserva y analiza los datos.

## 2. Decisiones funcionales [CONFIRMADO]

- **Plataforma:** aplicación móvil.
- **Cancha:** zonas predefinidas; usar como referencia la distribución del diseño de Figma. La delimitación exacta y los identificadores de zonas se definirán durante la implementación.
- **Registro:** por tandas, no tiro por tiro. El jugador elige una zona y registra cantidad de intentos y aciertos.
- **Cantidades de intentos:** accesos rápidos para 5, 10, 15 y 20, además de cantidad personalizada. Los aciertos pueden ser **0** y nunca superar los intentos.
- **Tipo de tiro:** no se pregunta ni registra como campo adicional; el usuario reconoce el tipo a partir de la zona.
- **Al finalizar:** guardar la sesión y presentar un resumen general; ese resumen debe poder consultarse desde el historial.
- **Nombre de sesión:** opcional, con nombre automático si se deja vacío.
- **Hot Zones:** porcentajes calculados a partir de los intentos y aciertos registrados **durante los últimos 90 días**. No promediar porcentajes de sesiones: sumar aciertos y dividir por la suma de intentos.
- **Historial:** conservar sesiones individuales **365 días**. Las sesiones entre 91 y 365 días siguen visibles en el historial pero no afectan las Hot Zones actuales.

## 3. Pantallas de referencia [DISEÑO EXISTENTE, NO TODAS LAS FUNCIONES APROBADAS]

Archivo fuente: `Hooplog.zip` (exportaciones de Figma).

1. **Empezar.png:** bienvenida y entrada al flujo de cuenta.
2. **Home.png:** inicio, acceso a entrenar y resumen reciente.
3. **Sesi#U00f3n en curso.png:** cancha, indicadores y fin de sesión.
4. **Hot zones.png:** mapa de rendimiento y estadísticas/historial.
5. **Perfil.png:** información personal, métricas y opciones de cuenta.

Los diseños son referencia de estética y navegación, no un contrato exacto de funcionalidades. El «coach» o análisis personalizado mostrado en Perfil **no está aprobado para el MVP**.

## 4. Flujo mínimo sugerido [PROPUESTO]

1. El jugador entra a su cuenta.
2. Desde Home inicia una sesión.
3. Selecciona una zona de la cancha.
4. Elige intentos (5/10/15/20 o personalizado), introduce aciertos y confirma la tanda.
5. Repite tandas en la misma zona o en otras. Puede corregir la última tanda.
6. Finaliza la sesión, agrega un nombre opcional y ve un resumen con fecha, intentos, aciertos, porcentaje y desglose por zona.
7. Consulta el resumen nuevamente desde el historial; consulta el rendimiento de los últimos 90 días en Hot Zones.

**Nota:** la corrección de la última tanda, la ubicación exacta del campo de nombre y el comportamiento de sesiones interrumpidas son propuestas, no decisiones confirmadas.

## 5. Estadísticas y visualización [PARCIALMENTE PROPUESTO]

**Confirmado:** Hot Zones con ventana móvil de 90 días y resumen de sesión guardado.

**Propuesta para MVP:**
- En cada sesión: fecha, nombre, tiros intentados, tiros encestados, porcentaje global y desglose por zona.
- En Hot Zones: aciertos/intentos y porcentaje por zona; un color que ayude a interpretar los resultados.
- En el historial: lista de sesiones de los últimos 365 días y acceso a sus resúmenes.
- Zonas sin tiros: indicar «sin datos», no 0 %.

**Por decidir durante el desarrollo:** colores/umbrales definitivos, mínimo de intentos para considerar una zona representativa, si la duración de sesión se registra y si se incluyen estadísticas históricas acumuladas.

**Fórmula:** porcentaje = 100 × suma de aciertos / suma de intentos (si los intentos son mayores que 0).

## 6. Arquitectura y autenticación [CONFIRMADO]

- **App:** React Native + Expo + TypeScript, para una base móvil mantenible y un desarrollo inicial ágil.
- **Backend, base de datos y autenticación:** Supabase (PostgreSQL + Auth), con políticas de acceso para que cada usuario consulte solo sus datos.
- **Inicio de sesión:** email y contraseña para la primera versión.
- **Datos mínimos:** usuario; sesión (usuario, nombre, fecha, estado); tanda (sesión, zona, intentos, aciertos).
- **Consultas:** estadísticas por zona filtradas por fecha de sesión dentro de los últimos 90 días.
- **Retención:** proceso automático para eliminar sesiones y tandas al superar 365 días, sujeto a informar al usuario de esta política. Si se conservan totales históricos, diseñar agregados separados antes de eliminar datos.

**Decisión aprobada:** React Native + Expo + TypeScript + Supabase (PostgreSQL y Auth), con acceso inicial mediante email y contraseña. Las decisiones de configuración, despliegue y estructura concreta se tomarán durante el desarrollo.

## 7. Alcance del MVP [CONFIRMADO]

**Incluir:** cuenta de usuario, Home, inicio/fin de sesión, registro de tandas por zona, resumen al terminar, historial de 365 días, Hot Zones de 90 días, perfil básico, navegación y persistencia segura.

**Dejar para después:** coach con IA, recomendaciones automáticas, comparaciones sociales, rankings, gamificación, reconocimiento de tiros por cámara, registro tiro por tiro, múltiples tipos de entrenamiento y análisis estadístico avanzado.

## 8. Criterios mínimos de funcionamiento [PROPUESTO]

- No aceptar intentos menores o iguales a cero ni aciertos negativos o mayores que los intentos.
- Una tanda de 10 intentos y 0 aciertos debe guardarse correctamente.
- Varias tandas de una misma zona deben agregarse correctamente.
- El resumen de una sesión debe coincidir con la suma de sus tandas.
- Las Hot Zones deben excluir sesiones anteriores a 90 días sin borrar su historial vigente.
- Una sesión de más de 365 días debe dejar de aparecer tras ejecutarse el proceso de retención.
- Un usuario no debe poder acceder a los entrenamientos privados de otro.

## 9. Pendientes no bloqueantes [RESOLVER DURANTE EL DESARROLLO]

**No quedan decisiones de producto imprescindibles antes de empezar a programar.** Los siguientes detalles se decidirán cuando se implementen sus respectivas pantallas o funciones, sin abrir otra fase extensa de planificación:

- Delimitación técnica e identificadores de las zonas ya diseñadas en Figma.
- Comportamiento de sesiones interrumpidas y edición/deshacer de tandas.
- Umbrales y colores definitivos del mapa; tratamiento de muestras pequeñas.
- Si se registra la duración de una sesión y si se mantienen contadores históricos agregados después del borrado.
- Implementación y comunicación al usuario de la eliminación automática de sesiones al superar 365 días.
- Detalles de interfaz, validaciones y manejo de errores.

**Reglas ya aprobadas que no deben reabrirse sin motivo:** registro por tandas con intentos 5/10/15/20 o personalizados; cero aciertos permitido; nombre de sesión opcional; Hot Zones de 90 días; historial de 365 días; tipo de tiro no registrado como campo separado.

**Próximo paso:** trasladar los archivos a la nueva cuenta, preparar el entorno de Expo y Supabase, y comenzar por el flujo de autenticación y las pantallas básicas, utilizando los diseños como referencia.

## 10. Fuentes que deben migrarse

- `Que-es-Hooplog.txt` — descripción original del concepto.
- `Hooplog.zip` — cinco pantallas de Figma.
- Este documento actualizado (v1.1) — decisiones confirmadas y pendientes no bloqueantes.

**Regla para el próximo agente:** no tratar una propuesta como una decisión confirmada sin aprobación del usuario.

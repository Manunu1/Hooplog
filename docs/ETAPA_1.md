# Hooplog · Etapa 1

Base visual inspirada en las cinco referencias de `docs/figma/` y en la especificación del MVP. La bienvenida utiliza una pelota vectorial propia en lugar de la ilustración del jugador. No incluye coach ni autenticación.

## Ejecutar en Android

```sh
npm install
npx expo start
```

Abrir Expo Go compatible con el SDK 57 del proyecto y escanear el QR. El celular y la computadora deben estar en la misma red. No se requieren credenciales ni variables de entorno.

## Recorrido manual

1. Abrir la bienvenida; probar tanto Empezar como Ya tengo una cuenta: ambos llevan a Inicio.
2. Alternar Inicio, Hot Zones y Perfil usando la barra inferior.
3. Desde Inicio, iniciar un entrenamiento y terminarlo: vuelve a Inicio sin guardar datos.
4. En Perfil, revisar las opciones informativas y volver a la bienvenida.
5. Comprobar desplazamiento en celulares pequeños y tamaño de texto ampliado.

## Estructura

- `src/app/_layout.tsx`: Stack raíz; `index.tsx`: bienvenida; `session.tsx`: sesión fuera de las pestañas.
- `src/app/(tabs)/`: navegación inferior y pantallas Inicio, Hot Zones y Perfil.
- `src/screens/welcome.tsx`: composición de bienvenida.
- `src/components/hooplog/`: botones, tarjetas de métricas, contenedor seguro, cancha y pelota reutilizables.
- `src/constants/hooplog.ts`: paleta y estilos compartidos.
- `src/data/demo.ts`: todas las métricas e historial simulados. Los colores de la cancha son ilustrativos y están definidos por zona en `court.tsx`, sin cálculo estadístico.

`react-native-svg` se instaló con `expo install` para la cancha vectorial. Está incluido en Expo Go. Las zonas tienen identificadores estables; todavía no son seleccionables.

## Validaciones

```sh
npx tsc --noEmit
npx expo lint
npx expo export --platform android --output-dir .expo/preview-android
```

## Próxima etapa

Incorporar Auth y PostgreSQL de Supabase, políticas de acceso, registro y validación de tandas, persistencia y resumen de sesiones. Luego calcular Hot Zones agregando aciertos e intentos de los últimos 90 días e implementar el historial y la retención de 365 días.

En esta entrega no se guardan entrenamientos, no hay temporizador ni registro de tiros. Las opciones del perfil muestran información de disponibilidad futura. Reiniciar la aplicación vuelve a la bienvenida.

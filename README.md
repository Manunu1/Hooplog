# Hooplog

**By hoopers, for hoopers.** Registrá cada tiro. Mejorá tu juego.

Aplicación móvil con bienvenida, registro, login, Inicio, sesión de entrenamiento, Hot Zones y Perfil. React Native, Expo SDK 57, TypeScript, Expo Router y Supabase Auth.

## Ejecutar

```sh
npm install
npx expo start
```

Antes de iniciar, configurar en `.env` las variables públicas indicadas en `.env.example`. Usar la URL y la clave **publishable** del proyecto Supabase, nunca una clave secreta. Reiniciar Expo si se modifican las variables.

En Android, abrir Expo Go compatible con SDK 57 y escanear el QR. Usar la misma red Wi-Fi en el teléfono y la computadora.

## Verificar

```sh
npx tsc --noEmit
npx expo lint
```

La autenticación y la persistencia de la sesión de usuario utilizan Supabase Auth y AsyncStorage. Las estadísticas y entrenamientos siguen siendo ejemplos estáticos separados en `src/data/demo.ts`; todavía no se guardan tandas ni entrenamientos.

Consultar [la entrega de etapa 2](docs/ETAPA_2.md) para configurar Supabase y probar registro, login, restauración y cierre de sesión.

Consultar [la entrega de etapa 1](docs/ETAPA_1.md) para la estructura, el recorrido de prueba y los próximos pasos. Referencias visuales en `docs/figma/` y decisiones del MVP en `docs/Hooplog_Especificacion_MVP_v1.md`.

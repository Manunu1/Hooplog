# Hooplog

**By hoopers, for hoopers.** Registrá cada tiro. Mejorá tu juego.

Primera etapa visual de la aplicación móvil: bienvenida, Inicio, sesión en curso, Hot Zones y Perfil. React Native, Expo SDK 57, TypeScript y Expo Router.

## Ejecutar

```sh
npm install
npx expo start
```

En Android, abrir Expo Go compatible con SDK 57 y escanear el QR. Usar la misma red Wi-Fi en el teléfono y la computadora.

## Verificar

```sh
npx tsc --noEmit
npx expo lint
```

Los datos son ejemplos estáticos separados en `src/data/demo.ts`. No hay autenticación, Supabase, persistencia ni registro funcional de tandas. Las zonas de la cancha son ilustrativas.

Consultar [la entrega de etapa 1](docs/ETAPA_1.md) para la estructura, el recorrido de prueba y los próximos pasos. Referencias visuales en `docs/figma/` y decisiones del MVP en `docs/Hooplog_Especificacion_MVP_v1.md`.

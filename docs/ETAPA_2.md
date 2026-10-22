# Hooplog · Etapa 2: autenticación

## Implementación

Registro e inicio de sesión con correo y contraseña mediante Supabase Auth. Los formularios comparten el diseño de Hooplog, validan campos obligatorios y correo, y exigen al menos 8 caracteres para crear una contraseña. El login no impone ese mínimo a cuentas existentes. Supabase valida además la política de contraseñas del proyecto.

Cada formulario bloquea solicitudes duplicadas, muestra carga y traduce errores sin imprimir credenciales, tokens ni detalles crudos del servidor. Si el registro no devuelve una sesión, se solicita revisar el correo; no se crea una sesión ficticia. El mensaje contempla que Supabase puede ocultar si un correo ya está registrado.

El proveedor restaura la sesión mediante `getSession`, escucha `onAuthStateChange` y mantiene una pantalla de carga hasta resolver la lectura inicial. Un fallo de restauración permite reintentar sin borrar las credenciales almacenadas. Ignora resultados de lecturas iniciales si ya llegó un cambio de autenticación más reciente. El listener se desuscribe al desmontarse.

En Android/iOS, el cliente persiste la sesión con AsyncStorage y activa o detiene la renovación de tokens según AppState. En web utiliza el almacenamiento predeterminado del SDK. La sesión de autenticación es la única persistencia agregada: no se guardan entrenamientos.

`Stack.Protected` protege tanto `(tabs)` como `session`, y excluye bienvenida, login y registro cuando existe sesión. Los cambios de autenticación actualizan la navegación y descartan del historial las rutas que dejan de estar disponibles. No se navega de forma optimista al enviar un formulario. Al cerrar sesión, Supabase elimina el almacenamiento de autenticación de este dispositivo (`scope: local`); el proveedor limpia su estado y Router vuelve al login. No afecta las sesiones de otros dispositivos. Si el cierre falla, se informa y se puede reintentar.

Perfil muestra el correo real y un avatar derivado de su primera letra; se eliminaron el nombre y la fecha de membresía ficticios. Home utiliza un saludo neutro. Las métricas siguen claramente marcadas como ejemplos. No se modificó la geometría de las 14 zonas.

## Archivos

- `src/lib/supabase.ts`: cliente y validación de variables públicas, sin credenciales hardcodeadas.
- `src/auth/auth-provider.tsx`: restauración, estado de sesión, listeners y logout.
- `src/auth/errors.ts`: validaciones y mensajes en español.
- `src/screens/auth-form.tsx`: formulario compartido y estado de confirmación por correo.
- `src/app/login.tsx`, `src/app/register.tsx`: nuevas rutas públicas.
- `src/app/_layout.tsx`: proveedor, carga, errores iniciales y rutas protegidas.
- `src/screens/welcome.tsx`: accesos a registro/login.
- `src/app/(tabs)/home.tsx`, `profile.tsx`: identidad real y cierre de sesión.
- `src/components/hooplog/ui.tsx`: botones deshabilitados y manejo del teclado en formularios.
- `tests/auth.test.cjs`: pruebas de validaciones y mensajes sin llamadas reales.
- `package.json`, `package-lock.json`: dependencias instaladas mediante Expo.
- `README.md`, `docs/ETAPA_2.md`: instrucciones actualizadas. `ETAPA_1.md` conserva el alcance histórico de esa etapa.

No se leyó ni modificó el contenido del `.env` real, ni se copiaron sus valores al código. Expo carga sus variables al ejecutar las herramientas. Se conservaron `.env.example` y las reglas existentes de `.gitignore`.

## Dependencias

- `@supabase/supabase-js`: API de autenticación.
- `@react-native-async-storage/async-storage`: persistencia nativa; versión resuelta por Expo para SDK 57, disponible en Expo Go.
- `react-native-url-polyfill`: compatibilidad de URL en React Native.

## Configuración manual de Supabase

1. Completar localmente `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` en `.env`, siguiendo `.env.example`. Son las variables públicas del cliente. No utilizar `service_role` ni claves secretas. No versionar `.env`.
2. En Authentication, habilitar el proveedor Email y el registro de usuarios. Revisar el mínimo y los requisitos de contraseña; el formulario aplica un mínimo local de 8 caracteres y muestra los rechazos adicionales del servidor.
3. Si se habilita Confirm email, configurar un Site URL válido en URL Configuration para la redirección del enlace del correo. Usar una página de destino propia accesible en el navegador. Confirmar el enlace allí y luego volver a la app para iniciar sesión con contraseña. Esta entrega no procesa callbacks de confirmación ni deep links de tokens en Expo Go (`detectSessionInUrl: false`).
4. Revisar las limitaciones del servicio de correo y configurar SMTP propio cuando corresponda. El envío depende de la configuración y los límites del proyecto.

No hace falta crear tablas, triggers, perfiles de base de datos ni políticas SQL para esta etapa. Las protecciones del Router son controles del cliente; las futuras tablas requerirán RLS y permisos independientes.

## Pruebas manuales en Expo Go

```sh
npm install
npx expo start
```

Usar Expo Go compatible con SDK 57, conexión a Internet para Supabase y la misma red local que la computadora. Si se actualiza `.env`, reiniciar Expo, preferentemente con `npx expo start --clear`.

1. **Sin sesión:** abrir la app. Empezar lleva a registro; Ya tengo una cuenta lleva a login. Intentar acceder directamente a `/home`, `/hot-zones`, `/profile` o `/session`: no deben mostrarse sin autenticación.
2. **Validaciones:** enviar campos vacíos, correo mal formado y contraseña de registro de 7 caracteres. Debe aparecer un mensaje en español. Una contraseña incorrecta en login debe mostrar error sin entrar a Home.
3. **Registro:** utilizar un correo propio al que se tenga acceso. Con confirmación habilitada, debe mostrar Revisá tu correo y permanecer fuera de las rutas privadas. Confirmar el enlace desde el email, volver a la app e iniciar sesión. Con confirmación deshabilitada, solo debe entrar directamente si Supabase devuelve una sesión real.
4. **Login:** ingresar credenciales válidas. Comprobar Home, Hot Zones y Perfil; Perfil debe mostrar el correo correcto. Pulsar repetidamente el botón durante la carga no debe duplicar solicitudes.
5. **Persistencia:** cerrar completamente Hooplog/Expo Go y abrir otra vez el proyecto sin borrar el almacenamiento de Expo Go. Debe verse la carga de restauración y luego Home, sin pasar por login. Pasar a segundo plano y volver para comprobar la continuidad de la sesión.
6. **Logout:** pulsar Cerrar sesión. Debe volver a login. Retroceso no debe recuperar pantallas privadas. Cerrar y volver a abrir debe mantener el estado sin sesión. Iniciar con otra cuenta y verificar que el correo cambie.
7. **Errores:** desconectar Internet al enviar un formulario y comprobar el mensaje y la posibilidad de reintentar. Para probar variables faltantes, modificar únicamente el entorno local de prueba y reiniciar Expo: debe mostrar el error de configuración, sin exponer valores.

## Verificaciones realizadas y límites

Pasaron `npx tsc --noEmit`, `npx expo lint`, `node --test tests/auth.test.cjs` (3 pruebas) y la exportación Android con Hermes. Metro pudo iniciarse con `npx expo start --offline --port 8083`. En este entorno Windows, el sandbox bloqueó procesos de Hermes y del runner con EPERM: las pruebas y la exportación se completaron con permisos ampliados. El arranque dentro del sandbox mostró también una advertencia EPERM al instalar React Native DevTools; Metro inició igualmente.

No se ejecutaron registro/login/logout reales contra el proyecto Supabase ni se verificó la persistencia en un Android físico. No se crearon cuentas ni se enviaron correos de prueba. Las comprobaciones automáticas no sustituyen el recorrido manual anterior.

## Etapa 3

Persistencia de entrenamientos y tandas, validación de aciertos/intentos, tablas y RLS por usuario, resumen e historial. Después, Hot Zones de los últimos 90 días y retención de 365 días. Siguen fuera de esta entrega IA, rankings, funciones sociales, OAuth y recuperación de contraseña.

## Documentación consultada

- [Supabase Auth para React Native](https://supabase.com/docs/guides/auth/quickstarts/react-native)
- [Rutas protegidas de Expo Router](https://docs.expo.dev/router/advanced/protected/)
- [AsyncStorage en Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/)

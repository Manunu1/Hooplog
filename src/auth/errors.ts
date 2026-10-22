export function authErrorMessage(error: unknown): string {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? error.code
      : undefined;
  switch (code) {
    case "invalid_credentials":
      return "El correo o la contraseña son incorrectos.";
    case "email_not_confirmed":
      return "Confirmá tu correo antes de iniciar sesión. Revisá también la carpeta de spam.";
    case "user_already_exists":
    case "email_exists":
      return "No se pudo crear la cuenta. Si ya tenés una, intentá iniciar sesión.";
    case "weak_password":
      return "La contraseña no cumple los requisitos de seguridad del proyecto. Probá con una más larga que combine letras, números y símbolos.";
    case "email_address_invalid":
    case "validation_failed":
      return "Revisá el correo y los datos ingresados.";
    case "email_address_not_authorized":
      return "El servicio de correo de este proyecto aún no permite enviar a esa dirección. Contactá al administrador.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "Se hicieron demasiados intentos. Esperá unos minutos antes de volver a probar.";
    case "signup_disabled":
      return "El registro de cuentas está deshabilitado en este momento.";
    case "request_timeout":
      return "La solicitud tardó demasiado. Revisá tu conexión y volvé a intentar.";
    default: {
      const name = error instanceof Error ? error.name : "";
      if (name === "AuthRetryableFetchError" || name === "TypeError")
        return "No pudimos conectar con Supabase. Revisá tu conexión y volvé a intentar.";
      return "No pudimos completar la solicitud. Volvé a intentar. Si continúa, revisá la configuración de Supabase.";
    }
  }
}

export function validateCredentials(
  email: string,
  password: string,
  registering: boolean,
): string | null {
  if (!email.trim() || !password) return "Completá el correo y la contraseña.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return "Ingresá un correo electrónico válido.";
  if (registering && password.length < 8)
    return "La contraseña debe tener al menos 8 caracteres.";
  return null;
}

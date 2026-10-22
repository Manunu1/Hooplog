import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

function configurationError() {
  if (!url?.trim() || !key?.trim()) {
    return "Falta configurar EXPO_PUBLIC_SUPABASE_URL o EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY en .env. Completá las variables y reiniciá Expo.";
  }
  try {
    const parsed = new URL(url);
    if (!["https:", "http:"].includes(parsed.protocol)) throw new Error();
  } catch {
    return "EXPO_PUBLIC_SUPABASE_URL debe ser una URL HTTP o HTTPS válida. Corregí .env y reiniciá Expo.";
  }
  if (key.startsWith("sb_secret_")) {
    return "Usá la clave pública publishable de Supabase. Nunca configures una clave secreta en EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY.";
  }
  return null;
}

export const supabaseConfigError = configurationError();
export const supabase = supabaseConfigError
  ? null
  : createClient(url!, key!, {
      auth: {
        ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },
    });

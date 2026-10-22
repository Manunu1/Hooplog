import { useRef, useState } from "react";
import { router } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Button, Screen } from "@/components/hooplog/ui";
import { colors as c, ui } from "@/constants/hooplog";
import { supabase } from "@/lib/supabase";
import { authErrorMessage, validateCredentials } from "@/auth/errors";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const registering = mode === "register";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState(false);
  const requestPending = useRef(false);
  const passwordInput = useRef<TextInput>(null);

  async function submit() {
    if (requestPending.current) return;
    setError(null);
    const invalid = validateCredentials(email, password, registering);
    if (invalid) {
      setError(invalid);
      return;
    }
    if (!supabase) {
      setError(
        "Falta configurar Supabase. Reiniciá la aplicación después de completar .env.",
      );
      return;
    }
    requestPending.current = true;
    setBusy(true);
    try {
      const credentials = { email: email.trim(), password };
      if (registering) {
        const { data, error: signupError } =
          await supabase.auth.signUp(credentials);
        if (signupError) throw signupError;
        // A successful signup may require email verification; no fake session or redirect.
        if (!data.session) {
          setPassword("");
          setConfirmation(true);
        }
      } else {
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword(credentials);
        if (loginError) throw loginError;
        if (!data.session)
          setError("No se pudo iniciar la sesión. Volvé a intentar.");
      }
      // AuthProvider and Stack.Protected navigate only after the real session event.
    } catch (failure: unknown) {
      setError(authErrorMessage(failure));
    } finally {
      requestPending.current = false;
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Screen>
        <View style={{ gap: 8 }}>
          <Text style={ui.label}>BY HOOPERS, FOR HOOPERS</Text>
          <Text style={ui.title}>
            {registering ? "Creá tu cuenta" : "Volvé a la cancha"}
          </Text>
          <Text style={ui.text}>
            {registering
              ? "Tu juego, tu progreso. Empezá con tu correo."
              : "Iniciá sesión para entrar a Hooplog."}
          </Text>
        </View>
        {confirmation ? (
          <View style={ui.card}>
            <Text style={ui.title}>Revisá tu correo</Text>
            <Text accessibilityRole="alert" style={ui.text}>
              Si el registro es válido, recibirás un enlace para confirmar tu
              cuenta. Revisá tu bandeja de entrada y spam. Después de confirmar,
              volvé a Hooplog e iniciá sesión.
            </Text>
            <Text style={ui.text}>
              Si ya tenés una cuenta con este correo, podés iniciar sesión.
            </Text>
            <Button
              title="Ir a iniciar sesión"
              onPress={() => router.replace("/login")}
            />
          </View>
        ) : (
          <View style={ui.card}>
            <Text style={ui.label}>CORREO ELECTRÓNICO</Text>
            <TextInput
              accessibilityLabel="Correo electrónico"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              editable={!busy}
              placeholder="vos@ejemplo.com"
              placeholderTextColor={c.muted}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              returnKeyType="next"
              onSubmitEditing={() => passwordInput.current?.focus()}
            />
            <Text style={ui.label}>CONTRASEÑA</Text>
            <TextInput
              ref={passwordInput}
              accessibilityLabel="Contraseña"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              editable={!busy}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete={registering ? "new-password" : "current-password"}
              textContentType={registering ? "newPassword" : "password"}
              placeholder={
                registering ? "Al menos 8 caracteres" : "Tu contraseña"
              }
              placeholderTextColor={c.muted}
              returnKeyType="go"
              onSubmitEditing={() => void submit()}
            />
            {registering && (
              <Text style={ui.text}>
                Usá al menos 8 caracteres. El proyecto puede exigir requisitos
                adicionales de seguridad.
              </Text>
            )}
            {error && (
              <Text accessibilityRole="alert" style={styles.error}>
                {error}
              </Text>
            )}
            {busy && (
              <ActivityIndicator
                color={c.orange}
                accessibilityLabel="Procesando solicitud"
              />
            )}
            <Button
              title={
                busy
                  ? "Procesando…"
                  : registering
                    ? "Crear cuenta"
                    : "Iniciar sesión"
              }
              disabled={busy}
              onPress={() => void submit()}
            />
          </View>
        )}
        {!confirmation && (
          <Button
            secondary
            disabled={busy}
            title={registering ? "Ya tengo una cuenta" : "Crear una cuenta"}
            onPress={() => router.replace(registering ? "/login" : "/register")}
          />
        )}
        <Button
          secondary
          disabled={busy}
          title="Volver a la bienvenida"
          onPress={() => router.replace("/")}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 12,
    minHeight: 54,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: c.ink,
    backgroundColor: c.cream,
  },
  error: { color: c.rust, fontSize: 14, lineHeight: 21 },
});

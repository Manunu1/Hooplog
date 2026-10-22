import { useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { Button, Demo, Screen, Stats } from "@/components/hooplog/ui";
import { colors as c, ui } from "@/constants/hooplog";
import { player } from "@/data/demo";
import { useAuth } from "@/auth/auth-provider";
import { authErrorMessage } from "@/auth/errors";
export default function Profile() {
  const { session, signOut } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pending = useRef(false);
  const email = session?.user.email ?? "Correo no disponible";
  async function logout() {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError(null);
    try {
      await signOut();
    } catch (failure: unknown) {
      setError(authErrorMessage(failure));
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }
  return (
    <Screen>
      <View style={{ alignItems: "center", gap: 12, paddingVertical: 16 }}>
        <View
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            backgroundColor: c.peach,
            borderWidth: 2,
            borderColor: c.orange,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 30, color: c.rust, fontWeight: "900" }}>
            {session?.user.email?.charAt(0).toUpperCase() ?? "H"}
          </Text>
        </View>
        <Text style={[ui.title, { fontSize: 40 }]}>Tu perfil</Text>
        <Text selectable style={[ui.text, { textAlign: "center" }]}>
          {email}
        </Text>
      </View>
      <Demo>
        Cuenta real · Las estadísticas de abajo son datos de ejemplo, no
        corresponden a tu cuenta.
      </Demo>
      <View style={ui.card}>
        <Stats
          items={[
            { label: "SESIONES", value: player.sessions },
            { label: "TIROS TOTALES", value: player.attempts },
            { label: "MEJOR FG", value: player.best },
          ]}
        />
      </View>
      <Text style={ui.label}>AJUSTES DE CUENTA</Text>
      <View style={ui.card}>
        {[
          "Editar perfil",
          "Unidades: sistema métrico",
          "Acerca de Hooplog",
        ].map((label) => (
          <Pressable
            key={label}
            accessibilityRole="button"
            style={[ui.row, { minHeight: 48 }]}
            onPress={() =>
              Alert.alert(
                label,
                label === "Acerca de Hooplog"
                  ? "By hoopers, for hoopers. Registrá cada tiro. Mejorá tu juego.\n\nHooplog · Etapa 2."
                  : "Esta opción estará disponible en una próxima etapa. No se guardaron cambios.",
              )
            }
          >
            <Text style={ui.text}>{label}</Text>
            <Text style={{ color: c.rust }}>›</Text>
          </Pressable>
        ))}
      </View>
      {error && (
        <Text accessibilityRole="alert" style={{ color: c.rust }}>
          {error}
        </Text>
      )}
      <Button
        title={busy ? "Cerrando sesión…" : "Cerrar sesión"}
        secondary
        disabled={busy}
        onPress={() => void logout()}
      />
    </Screen>
  );
}

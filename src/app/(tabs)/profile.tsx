import { router } from "expo-router";
import { Alert, Pressable, Text, View } from "react-native";
import { Button, Demo, Screen, Stats } from "@/components/hooplog/ui";
import { colors as c, ui } from "@/constants/hooplog";
import { player } from "@/data/demo";
export default function Profile() {
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
            {player.initials}
          </Text>
        </View>
        <Text style={[ui.title, { fontSize: 40 }]}>{player.name}</Text>
        <Text style={ui.text}>Miembro desde mayo de 2024</Text>
      </View>
      <Demo>Perfil de ejemplo · No hay una cuenta iniciada</Demo>
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
                  ? "By hoopers, for hoopers. Registrá cada tiro. Mejorá tu juego.\n\nHooplog · Vista previa, etapa 1."
                  : "Esta opción estará disponible en una próxima etapa. No se guardaron cambios.",
              )
            }
          >
            <Text style={ui.text}>{label}</Text>
            <Text style={{ color: c.rust }}>›</Text>
          </Pressable>
        ))}
      </View>
      <Button
        title="Volver a la bienvenida"
        secondary
        onPress={() => router.replace("/")}
      />
    </Screen>
  );
}

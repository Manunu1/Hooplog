import { router } from "expo-router";
import { Text, View } from "react-native";
import { Ball } from "@/components/hooplog/ball";
import { Button, Demo, Screen } from "@/components/hooplog/ui";
import { colors as c, ui } from "@/constants/hooplog";
export default function Welcome() {
  const enter = () => router.replace("/home");
  return (
    <Screen header={false}>
      <View style={{ flex: 1, justifyContent: "center", gap: 28 }}>
        <Text style={[ui.label, { textAlign: "center" }]}>
          TU JUEGO EMPIEZA ACÁ
        </Text>
        <Ball />
        <View style={{ alignItems: "center", gap: 12 }}>
          <Text
            style={{
              fontSize: 48,
              fontWeight: "900",
              letterSpacing: -3,
              color: c.rust,
            }}
          >
            HOOPLOG
          </Text>
          <Text style={[ui.label, { color: c.rust }]}>
            By hoopers, for hoopers
          </Text>
          <Text style={[ui.text, { textAlign: "center" }]}>
            Registrá cada tiro. Mejorá tu juego
          </Text>
        </View>
      </View>
      <Button title="Empezar →" onPress={enter} />
      <Button title="Ya tengo una cuenta" secondary onPress={enter} />
      <Demo>Etapa 1 · Explorá Hooplog sin crear una cuenta</Demo>
    </Screen>
  );
}

import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Court } from "@/components/hooplog/court";
import { Button, Demo, Screen, Stats } from "@/components/hooplog/ui";
import { colors as c, ui } from "@/constants/hooplog";
import { activeSession as session } from "@/data/demo";
export default function Session() {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: c.cream }}
    >
      <Screen>
        <View style={{ gap: 8 }}>
          <Text style={ui.label}>A LA CANCHA</Text>
          <Text style={ui.title}>Sesión en curso</Text>
        </View>
        <Demo>Sesión de muestra · No se registran ni guardan tiros</Demo>
        <View style={ui.card}>
          <Stats
            items={[
              { label: "TIROS", value: session.attempts },
              { label: "ACIERTOS", value: session.makes },
              { label: "EFECTIVIDAD", value: session.percentage },
            ]}
          />
        </View>
        <Court />
        <Text style={[ui.text, { textAlign: "center" }]}>
          Tu cancha, zona por zona. Próximamente vas a poder seleccionar una
          zona y registrar tus tandas.
        </Text>
        <View style={{ flex: 1 }} />
        <Button
          title="Terminar sesión"
          onPress={() => router.dismissTo("/home")}
        />
        <Text style={[ui.text, { textAlign: "center", fontSize: 12 }]}>
          Volverás al inicio. Esta sesión no se guardará.
        </Text>
      </Screen>
    </SafeAreaView>
  );
}

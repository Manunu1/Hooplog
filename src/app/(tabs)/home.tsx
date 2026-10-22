import { router } from "expo-router";
import { Text, View } from "react-native";
import { Button, Demo, Screen, Stats } from "@/components/hooplog/ui";
import { Court } from "@/components/hooplog/court";
import { colors as c, ui } from "@/constants/hooplog";
import { lastSession as last, player } from "@/data/demo";
export default function Home() {
  return (
    <Screen>
      <Demo />
      <View style={{ gap: 6 }}>
        <Text style={ui.label}>CADA TIRO CUENTA</Text>
        <Text style={ui.title}>Buen día, {player.name}</Text>
        <Text style={ui.text}>¿Listo para entrenar?</Text>
      </View>
      <View style={[ui.card, { backgroundColor: c.peach }]}>
        <Text style={ui.title}>Tu próxima mejora empieza en la cancha.</Text>
        <Text style={ui.text}>Encontrá tu ritmo. Conocé tu tiro.</Text>
        <Button
          title="Iniciar entrenamiento →"
          onPress={() => router.push("/session")}
        />
      </View>
      <View style={ui.row}>
        <Text style={ui.label}>ÚLTIMA SESIÓN</Text>
        <Text style={ui.text}>{last.date}</Text>
      </View>
      <View style={[ui.card, { backgroundColor: c.court }]}>
        <Text style={[ui.text, { fontWeight: "700" }]}>{last.name}</Text>
        <Stats
          items={[
            { label: "TIROS", value: last.attempts },
            { label: "ACIERTOS", value: last.makes },
            { label: "EFECTIVIDAD", value: last.percentage },
          ]}
        />
        <Court heatmap />
      </View>
      <Button
        title="Explorar mis Hot Zones"
        secondary
        onPress={() => router.navigate("/hot-zones")}
      />
      <Text style={[ui.text, { textAlign: "center" }]}>
        By hoopers, for hoopers.
      </Text>
    </Screen>
  );
}

import { Text, View } from "react-native";
import { Court } from "@/components/hooplog/court";
import { Demo, Screen, Stats } from "@/components/hooplog/ui";
import { colors as c, ui } from "@/constants/hooplog";
import { history, totals } from "@/data/demo";
export default function HotZones() {
  return (
    <Screen>
      <View style={{ gap: 8 }}>
        <Text style={ui.title}>Tus Hot Zones</Text>
        <Text style={ui.label}>CONOCÉ TU CANCHA</Text>
      </View>
      <Demo>
        Mapa ilustrativo · El cálculo de los últimos 90 días estará disponible
        en una próxima etapa.
      </Demo>
      <View style={[ui.card, { backgroundColor: c.peach }]}>
        <Court heatmap />
      </View>
      <View style={ui.card}>
        <Stats
          items={[
            { label: "SESIONES", value: totals.sessions },
            { label: "TIROS TOTALES", value: totals.attempts },
            { label: "FG GLOBAL", value: totals.percentage },
          ]}
        />
        <Text style={ui.text}>Totales de ejemplo, sin filtro de fechas.</Text>
      </View>
      <Text style={[ui.title, { fontSize: 23 }]}>Historial de sesiones</Text>
      {history.map((session) => (
        <View key={session.id} style={ui.card}>
          <View style={ui.row}>
            <Text style={ui.label}>{session.date}</Text>
            <Text style={{ color: c.rust, fontSize: 22, fontWeight: "900" }}>
              {session.percentage}
            </Text>
          </View>
          <Text style={{ color: c.ink, fontSize: 17, fontWeight: "700" }}>
            {session.name}
          </Text>
          <Text style={ui.text}>
            {session.attempts} tiros · Sesión de ejemplo
          </Text>
        </View>
      ))}
    </Screen>
  );
}

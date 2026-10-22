import { Tabs } from "expo-router";
import { Text } from "react-native";
import { colors as c } from "@/constants/hooplog";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.rust,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: { backgroundColor: c.cream, borderTopColor: c.border },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700" },
        sceneStyle: { backgroundColor: c.cream },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>⌂</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="hot-zones"
        options={{
          title: "Hot Zones",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>◎</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 24 }}>●</Text>
          ),
        }}
      />
    </Tabs>
  );
}

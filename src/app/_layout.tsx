import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "@/constants/hooplog";
import { ActivityIndicator, Text, View } from "react-native";
import { AuthProvider, useAuth } from "@/auth/auth-provider";
import { Button } from "@/components/hooplog/ui";

function AuthRoutes() {
  const { session, loading, startupError, retry } = useAuth();
  if (startupError)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 28,
          gap: 20,
          backgroundColor: colors.cream,
        }}
      >
        <Text
          accessibilityRole="alert"
          style={{ color: colors.rust, fontSize: 16 }}
        >
          {startupError}
        </Text>
        <Button title="Reintentar" onPress={retry} />
      </View>
    );
  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 16,
          backgroundColor: colors.cream,
        }}
      >
        <ActivityIndicator color={colors.orange} size="large" />
        <Text style={{ color: colors.muted }}>Recuperando tu sesión…</Text>
      </View>
    );
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.cream },
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="session" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
      </Stack.Protected>
    </Stack>
  );
}
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AuthProvider>
        <AuthRoutes />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

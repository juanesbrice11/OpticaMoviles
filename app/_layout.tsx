import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >

        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(content)" />
      </Stack>
    </AuthProvider>
  );
}
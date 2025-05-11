import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/context/AuthContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Text, View } from "react-native";

export default function RootLayout() {
  const { expoPushToken, notification } = usePushNotifications(); 
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => { 
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean);
    });

    return () => {
      unsubscribe();
    };
  }, [expoPushToken, notification]);

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
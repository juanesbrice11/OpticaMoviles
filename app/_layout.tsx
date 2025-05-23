import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/context/AuthContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { db } from "@/db";
import { syncSales } from "@/services/localSalesService";
import TestSQLite from "@/components/Test";

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

  useEffect(() => {
    try {
      // La base de datos se inicializará automáticamente gracias a las migraciones
      console.log('Base de datos inicializada correctamente');
    } catch (error) {
      console.error('Error inicializando la base de datos:', error);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        syncSales().catch(console.error);
      }
    });
  
    return () => unsubscribe();
  }, []);

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
    // <TestSQLite />
  );
}
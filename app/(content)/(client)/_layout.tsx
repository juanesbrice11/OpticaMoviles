import React from "react";
import { Stack } from "expo-router";

export default function ClientLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="client" />
      <Stack.Screen name="crearCliente" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
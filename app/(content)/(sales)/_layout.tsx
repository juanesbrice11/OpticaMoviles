import React from "react";
import { Stack } from "expo-router";

export default function SalesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sales" />
      <Stack.Screen name="crearVenta" />
    </Stack>
  );
} 
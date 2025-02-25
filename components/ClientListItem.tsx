import React from "react";
import { View, Text } from "react-native";
import { ClientSchema } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";



export default function ClientListItem({ client }: { client: ClientSchema }) {
  return (
    <SafeAreaView className="p-4 border-b border-gray-200 items-center">
      <Text className="text-base">
        {client.cedula} <Text className="text-gray-500">cedula</Text>
      </Text>
      <Text className="text-base">
        {client.nombre} <Text className="text-gray-500">nombre</Text>
      </Text>
      <Text className="text-base">
        {client.apellido} <Text className="text-gray-500">apellido</Text>
      </Text>
      <Text className="text-base">
        {client.telefono} <Text className="text-gray-500">telefono</Text>
      </Text>
      <Text className="text-base">
        {client.historiaClinica} <Text className="text-gray-500">historia clinica</Text>
      </Text>
    </SafeAreaView>
  );
}

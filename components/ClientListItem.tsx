import React from "react";
import { View, Text } from "react-native";
import { ClientSchema } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { textblack, textgray500 } from "./tokens";



export default function ClientListItem({ client }: { client: ClientSchema }) {
  return (
    <SafeAreaView className="p-4 border-gray-300 bg-white shadow-md shadow-gray-200 mb-3">
      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-gray-700">Cédula:</Text>
        <Text className="text-base text-gray-900">{client.cedula}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-gray-700">Nombre:</Text>
        <Text className="text-base text-gray-900">{client.nombre}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-gray-700">Apellido:</Text>
        <Text className="text-base text-gray-900">{client.apellido}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-gray-700">Teléfono:</Text>
        <Text className="text-base text-gray-900">{client.telefono}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className="text-base font-semibold text-gray-700">Historia Clínica:</Text>
        <Text className="text-base text-gray-900">{client.historiaClinica}</Text>
      </View>
    </SafeAreaView>
  );
}

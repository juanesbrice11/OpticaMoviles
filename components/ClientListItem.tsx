import React from "react";
import { View, Text } from "react-native";
import { ClientSchema } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { columleft, columright } from "./tokens";



export default function ClientListItem({ client }: { client: ClientSchema }) {
  return (
    <SafeAreaView className="p-4 border-gray-300 bg-white shadow-md shadow-gray-200 mb-3">
      <View className="flex-row justify-between">
        <Text className={columleft}>Cédula:</Text>
        <Text className={columright}>{client.cedula}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Nombre:</Text>
        <Text className={columright}>{client.nombre}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Apellido:</Text>
        <Text className={columright}>{client.apellido}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Teléfono:</Text>
        <Text className={columright}>{client.telefono}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Historia Clínica:</Text>
        <Text className={columright}>{client.historiaClinica}</Text>
      </View>
    </SafeAreaView>
  );
}

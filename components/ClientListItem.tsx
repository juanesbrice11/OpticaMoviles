import React from "react";
import { View, Text } from "react-native";
import { ClientSchema } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { textblack, textgray500 } from "./tokens";



export default function ClientListItem({ client }: { client: ClientSchema }) {
  return (
    <SafeAreaView className="p-4 border-b border-gray-200 items-center">
      <Text className={`${textblack}`}>
        {client.cedula} <Text className={`${textgray500}`}>cedula</Text>
      </Text>
      <Text className={`${textblack}`}>
        {client.nombre} <Text className={`${textgray500}`}>nombre</Text>
      </Text>
      <Text className={`${textblack}`}>
        {client.apellido} <Text className={`${textgray500}`}>apellido</Text>
      </Text>
      <Text className={`${textblack}`}>
        {client.telefono} <Text className={`${textgray500}`}>telefono</Text>
      </Text>
      <Text className={`${textblack}`}>
        {client.historiaClinica} <Text className={`${textgray500}`}>historia clinica</Text>
      </Text>
    </SafeAreaView>
  );
}

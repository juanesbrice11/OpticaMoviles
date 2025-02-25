// Client.tsx
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ClientSchema } from "@/types/api";

import GenericSearchBar from "@/components/SearchBar";
import ClientListItem from "@/components/ClientListItem";
import FloatingMenu from "@/components/FloatingMenu";

export default function Client() {
  const [menuVisible, setMenuVisible] = useState(false);

  const clients: ClientSchema[] = [
    { id: "1", cedula: "123456789", nombre: "Juan Pérez", telefono: "555-1234", historiaClinica: "Historia 1" },
    { id: "2", cedula: "987654321", nombre: "Ana Gómez", telefono: "555-5678", historiaClinica: "Historia 2" },
    { id: "3", cedula: "456789123", nombre: "Carlos Ruiz", telefono: "555-9012", historiaClinica: "Historia 3" },
    { id: "4", cedula: "321654987", nombre: "María López", telefono: "555-3456", historiaClinica: "Historia 4" },
    { id: "5", cedula: "654987321", nombre: "Pedro Martínez", telefono: "555-7890", historiaClinica: "Historia 5" },
  ];

  const renderClient = ({ item }: { item: ClientSchema }) => (
    <ClientListItem client={item} />
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="items-center mt-4">
        <Image
          source={require("@/assets/images/iconOptica.png")}
          className="w-48 h-48"
        />
      </View>
      <Text className="text-2xl text-blue text-center mt-4">Clientes</Text>
      <GenericSearchBar<ClientSchema>
        data={clients}
        placeholder="Buscar clientes..."
        filterPredicate={(client, query) =>
          client.nombre.toLowerCase().includes(query.toLowerCase()) ||
          client.cedula.includes(query)
        }
        renderItem={renderClient}
      />
      <FloatingMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
      <View className="absolute bottom-0 right-0 mb-4 mr-4">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="add-circle" size={60} color="#1769AA" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import GenericSearchBar from "@/components/SearchBar";

interface ClientSchema {
  id: string;
  cedula: string;
  nombre: string;
  telefono: string;
  historiaClinica: string;
}


const Client = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const clients: ClientSchema[] = [
    { id: "1", cedula: "123456789", nombre: "Juan Pérez", telefono: "555-1234", historiaClinica: "Historia 1" },
    { id: "2", cedula: "987654321", nombre: "Ana Gómez", telefono: "555-5678", historiaClinica: "Historia 2" },
    { id: "3", cedula: "456789123", nombre: "Carlos Ruiz", telefono: "555-9012", historiaClinica: "Historia 3" },
    { id: "4", cedula: "321654987", nombre: "María López", telefono: "555-3456", historiaClinica: "Historia 4" },
    { id: "5", cedula: "654987321", nombre: "Pedro Martínez", telefono: "555-7890", historiaClinica: "Historia 5" },
  ];

  const renderClient = ({ item }: { item: ClientSchema }) => (
    <View className="flex-row py-2 border-b border-gray-200">
      <Text className="flex-1 text-center">{item.cedula}</Text>
      <Text className="flex-1 text-center">{item.nombre}</Text>
      <Text className="flex-1 text-center">{item.telefono}</Text>
      <Text className="flex-1 text-center">{item.historiaClinica}</Text>
    </View>
  );

  const headerComponent = (
    <View className="flex-row pb-2 border-b border-black mt-10">
      <Text className="flex-1 font-bold text-center">Cédula</Text>
      <Text className="flex-1 font-bold text-center">Nombre</Text>
      <Text className="flex-1 font-bold text-center">Teléfono</Text>
      <Text className="flex-1 font-bold text-center">Historia Clínica</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen options={{ title: "Clientes" }} />
      <View className="items-center mt-4">
        <Image source={require("@/assets/images/iconOptica.png")} className="w-48 h-48" />
      </View>

      <Text className="text-2xl font-bold text-center mt-4">Clientes</Text>
      <GenericSearchBar<ClientSchema>
        data={clients}
        placeholder="Buscar clientes..."
        filterPredicate={(client, query) =>
          client.nombre.toLowerCase().includes(query.toLowerCase()) ||
          client.cedula.includes(query)
        }
        renderItem={renderClient}
        headerComponent={headerComponent}
      />

      {menuVisible && (
        <View className="absolute bottom-20 right-4 bg-white shadow-lg rounded-lg p-2 w-40">
          <Link href="/crear" asChild>
            <TouchableOpacity className="p-2 border-b border-gray-300 " onPress={() => setMenuVisible(false)}>
              <Text className="text-gray-700 text-xl">Crear historia</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/crear" asChild>
            <TouchableOpacity className="p-2" onPress={() => setMenuVisible(false)}>
              <Text className="text-gray-700 text-xl">Crear cliente</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      <View className="absolute bottom-0 right-0 mb-4 mr-4">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="add-circle" size={60} color="#1769AA" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Client;

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ClientSchema } from "@/types/api";
import { texttitile } from "@/components/tokens";

import GenericSearchBar from "@/components/SearchBar";
import ClientListItem from "@/components/ClientListItem";
import FloatingMenu from "@/components/FloatingMenu";

export default function Client() {
  const [menuVisible, setMenuVisible] = useState(false);

  const clients: ClientSchema[] = [
    { id: "1", cedula: "123456789", nombre: "Juan", apellido: "Pérez", telefono: "555-1234", email: "juan.perez@example.com", historiaClinica: "Historia 1" },
    { id: "2", cedula: "987654321", nombre: "Ana", apellido: "Gómez", telefono: "555-5678", email: "ana.gomez@example.com", historiaClinica: "Historia 2" },
    { id: "3", cedula: "456789123", nombre: "Carlos", apellido: "Ruiz", telefono: "555-9012", email: "carlos.ruiz@example.com", historiaClinica: "Historia 3" },
    { id: "4", cedula: "321654987", nombre: "María", apellido: "López", telefono: "555-3456", email: "maria.lopez@example.com", historiaClinica: "Historia 4" },
    { id: "5", cedula: "654987321", nombre: "Pedro", apellido: "Martínez", telefono: "555-7890", email: "pedro.martinez@example.com", historiaClinica: "Historia 5" },
  ];

  const renderClient = ({ item }: { item: ClientSchema }) => (
    <ClientListItem client={item} />
  );

  return (
    <View className="flex-1 bg-white relative">
      <Image
        source={require("@/assets/images/top.png")}
        className="w-full h-44"
      />


        <Text className={`${texttitile}`}>
          Clientes
        </Text>


      <View className="px-4 mt-4">
        <GenericSearchBar<ClientSchema>
          data={clients}
          placeholder="Buscar clientes..."
          filterPredicate={(client, query) =>
            client.nombre.toLowerCase().includes(query.toLowerCase()) ||
            client.cedula.includes(query)
          }
          renderItem={renderClient}
        />
      </View>

      <ScrollView className="mt-4 px-4">
        {clients.map((client) => (
          <View
            key={client.id}
            className="bg-white rounded-xl border-2 border-primary shadow-lg shadow-gray-400 p-4 mb-4"
          >
            <Text className="text-lg font-bold text-gray-800">
              {client.nombre} {client.apellido}
            </Text>
            <Text className="text-sm text-gray-600">Cédula: {client.cedula}</Text>
            <Text className="text-sm text-gray-600">Teléfono: {client.telefono}</Text>
            <Text className="text-sm text-gray-600">Email: {client.email}</Text>
          </View>
        ))}
      </ScrollView>

      <FloatingMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        routes={[
          { url: "/crearHistoria", text: "Crear historia" },
          { url: "/crearCliente", text: "Crear cliente" },
        ]}
      />

      <TouchableOpacity
        className="absolute bottom-6 right-6"
        onPress={() => setMenuVisible(!menuVisible)}
      >
        <Ionicons name="add-circle" size={60} color="#1769AA" />
      </TouchableOpacity>
    </View>
  );
}

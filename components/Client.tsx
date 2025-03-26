import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Button, KeyboardAvoidingView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ClientBd } from "@/types/api";

import GenericSearchBar from "@/components/SearchBar";
import ClientListItem from "@/components/ClientListItem";
import FloatingMenu from "@/components/FloatingMenu";
import { getClients } from "@/services/clientsService";
import { useAuth } from "@/context/AuthContext";

export default function Client() {
  const { onLogout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [clients, setClients] = useState<ClientBd[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const apiClients = await getClients();
        const formattedClients: ClientBd[] = apiClients.map(client => ({
          id: client.id,
          name: client.name,
          lastname: client.lastname,
          phone: client.phone,
          email: client.email,
        }));
        setClients(formattedClients);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  const renderClient = ({ item }: { item: ClientBd }) => (
    <ClientListItem client={item} />
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 bg-white relative">
        <View className="items-center">
          <Image
            source={require("@/assets/images/top.png")}
            className="w-full h-44"
          />
        </View>

        <Text className="text-2xl font-bold text-center mb-2 mt-[8%] text-primary">
          Clientes
        </Text>
        <ScrollView>

          <GenericSearchBar<ClientBd>
            data={clients}
            placeholder="Buscar clientes..."
            filterPredicate={(client, query) =>
              client.name.toLowerCase().includes(query.toLowerCase()) ||
              client.lastname.toLowerCase().includes(query.toLowerCase()) ||
              client.email.toLowerCase().includes(query.toLowerCase()) ||
              client.id.includes(query)
            }
            renderItem={renderClient}
          />

        </ScrollView>
        <FloatingMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          routes={[
            { url: "/crearHistoria", text: "Crear historia" },
            { url: "/crearCliente", text: "Crear cliente" },
          ]}
        />
        <View className="absolute bottom-0 right-0 mb-4 mr-4">
          <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
            <Ionicons name="add-circle" size={60} color="#1769AA" />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>

  );
}

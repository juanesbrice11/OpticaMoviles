import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ClientBd } from "@/types/api";
import { useRouter } from "expo-router";

import GenericSearchBar from "@/components/SearchBar";
import ClientListItem from "@/components/ClientListItem";
import FloatingMenu from "@/components/molecules/FloatingMenu";
import { getClients } from "@/services/clientsService";
import { useAuth } from "@/context/AuthContext";
import CreateClientModal from "./molecules/CreateClientModal";

export default function Client() {
  const { onLogout } = useAuth();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [clients, setClients] = useState<ClientBd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const apiClients = await getClients();
      setClients(apiClients);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la lista de clientes");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
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
    <ClientListItem client={item} refreshClients={fetchClients} />
  );

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    fetchClients();
  };

  const handleMenuAction = (url: string) => {
    setMenuVisible(false);
    if (url === "/crearCliente") {
      setCreateModalVisible(true);
    } else {
      router.push(url as any);
    }
  };

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
          <GenericSearchBar
            data={clients}
            placeholder="Buscar clientes..."
            filterPredicate={(client, query) =>
              client.name.toLowerCase().includes(query.toLowerCase()) ||
              client.email?.toLowerCase().includes(query.toLowerCase()) ||
              client.id.includes(query)
            }
            renderItem={renderClient}
          />
        </ScrollView>

        <CreateClientModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onSuccess={handleCreateSuccess}
        />

        <FloatingMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          routes={[
            { url: "/crearHistoria", text: "Crear historia" },
            { url: "/crearCliente", text: "Crear cliente" },
          ]}
          onSelectRoute={handleMenuAction}
        />
        <View className="absolute bottom-0 right-0 mb-4 mr-4">
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="add-circle" size={60} color="#1769AA" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

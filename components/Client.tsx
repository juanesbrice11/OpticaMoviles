import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredClients = clients.filter((client) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      client.name.toLowerCase().includes(searchLower) ||
      client.lastname.toLowerCase().includes(searchLower) ||
      client.email?.toLowerCase().includes(searchLower) ||
      client.id.toLowerCase().includes(searchLower)
    );
  });

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

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-4 py-2">
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3">
              <Ionicons name="search" size={20} color="#888" className="mr-2" />
              <TextInput
                placeholder="Buscar clientes..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 text-base"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color="#888" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <ScrollView className="flex-1">
          {filteredClients.length === 0 ? (
            <View className="items-center justify-center p-4">
              <Ionicons name="people-outline" size={64} color="#1769AA" />
              <Text className="text-lg text-gray-600 text-center mt-4">
                No hay clientes para mostrar
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-2">
                Presiona el botón + para crear un nuevo cliente
              </Text>
            </View>
          ) : (
            <View className="px-4">
              {filteredClients.map((client) => (
                <ClientListItem 
                  key={client.id} 
                  client={client} 
                  refreshClients={fetchClients} 
                />
              ))}
            </View>
          )}
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
        <View className="absolute bottom-0 left-0 mb-4 ml-4">
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="add-circle" size={60} color="#1769AA" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

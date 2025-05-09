import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, Button, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import UsersListItem from "@/components/UsersListItem";
import GenericSearchBar from "@/components/SearchBar";
import { getUsers } from "@/services/usersService";
import { Ionicons } from "@expo/vector-icons";
import FloatingMenu from "./molecules/FloatingMenu";
import { User } from "@/types/api";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const apiUsers = await getUsers();
      setUsers(apiUsers);
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar la lista de usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  const renderUser = ({ item }: { item: any }) => (
    <UsersListItem user={item} refreshUsers={fetchUsers} />
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
          Usuarios
        </Text>
        <ScrollView>

          <GenericSearchBar
            data={users}
            placeholder="Buscar usuarios..."
            filterPredicate={(user, query) =>
              user.name.toLowerCase().includes(query.toLowerCase()) ||
              user.email.toLowerCase().includes(query.toLowerCase()) ||
              user.id.includes(query)
            }
            renderItem={renderUser}
          />
        </ScrollView>
        <FloatingMenu
          visible={menuVisible}
          onClose={() => setMenuVisible(false)}
          routes={[
            { url: "/crearUsuario", text: "Crear usuario" },
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
};

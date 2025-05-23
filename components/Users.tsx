import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { User } from "@/types/api";
import { useRouter } from "expo-router";
import { getUsers } from "@/services/usersService";
import CreateUserModal from "./molecules/CreateUserModal";
import UsersListItem from "@/components/UsersListItem";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.id.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  const handleCreateSuccess = () => {
    setCreateModalVisible(false);
    fetchUsers();
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
          Usuarios
        </Text>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-4 py-2">
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3">
              <Ionicons name="search" size={20} color="#888" className="mr-2" />
              <TextInput
                placeholder="Buscar usuarios..."
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
          {filteredUsers.length === 0 ? (
            <View className="items-center justify-center p-4">
              <Ionicons name="people-outline" size={64} color="#1769AA" />
              <Text className="text-lg text-gray-600 text-center mt-4">
                No hay usuarios para mostrar
              </Text>
              <Text className="text-sm text-gray-500 text-center mt-2">
                Presiona el botón + para crear un nuevo usuario
              </Text>
            </View>
          ) : (
            <View className="px-4">
              {filteredUsers.map((user) => (
                <UsersListItem 
                  key={user.id} 
                  user={user} 
                  refreshUsers={fetchUsers} 
                />
              ))}
            </View>
          )}
        </ScrollView>

        <CreateUserModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onSuccess={handleCreateSuccess}
        />

        <View className="absolute bottom-0 left-0 mb-4 ml-4">
          <TouchableOpacity onPress={() => setCreateModalVisible(true)}>
            <Ionicons name="add-circle" size={60} color="#1769AA" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

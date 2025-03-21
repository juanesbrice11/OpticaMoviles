import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, ScrollView, Button, Image, TouchableOpacity } from "react-native";
import UsersListItem from "@/components/UsersListItem";
import GenericSearchBar from "@/components/SearchBar";
import { getUsers } from "@/services/usersService"; // Asegúrate de tener este servicio
import { Ionicons } from "@expo/vector-icons";
import FloatingMenu from "./FloatingMenu";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUsers = await getUsers();
        setUsers(apiUsers);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setIsLoading(false);
      }
    };
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
    <UsersListItem user={item} />
  );

  return (
    <View className="flex-1 bg-white relative">
      <ScrollView>
        <View className="items-center">
          <Image
            source={require("@/assets/images/top.png")}
            className="w-full h-44"
          />
        </View>

        <Text className="text-2xl font-bold text-center mb-2 mt-[8%] text-primary">
          Usuarios
        </Text>

        <GenericSearchBar
          data={users}
          placeholder="Buscar usuarios..."
          filterPredicate={(user, query) =>
            user.name.toLowerCase().includes(query.toLowerCase()) ||
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
  );
};

export default Users;
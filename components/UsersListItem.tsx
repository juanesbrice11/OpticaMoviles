import React, { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { columleft, columright } from "./tokens";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import { deleteUser, getUsers, updateUser } from "@/services/usersService";
import EditUserModal from "./molecules/EditUserModal";

interface UsersListItemProps {
  user: { id: string; name: string; email: string; role: string };
  refreshUsers: () => void;
}

export default function UsersListItem({ user, refreshUsers }: UsersListItemProps) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  async function handleDelete() {
    try {
      await deleteUser(user.id);
      Alert.alert("Éxito", "Usuario eliminado correctamente");
      refreshUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "No se pudo eliminar el usuario");
    } finally {
      setShowConfirmModal(false);
    }
  }

  const handleSuccessEdit = () => {
    refreshUsers();
    setShowEditModal(false);
  }

  return (
    <SafeAreaView className="p-4 border-gray-300 bg-white shadow-md shadow-gray-200">
      <View className="flex-row justify-between">
        <Text className={columleft}>ID:</Text>
        <Text className={columright}>{user.id}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />
      <View className="flex-row justify-between">
        <Text className={columleft}>Nombre:</Text>
        <Text className={columright}>{user.name}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Email:</Text>
        <Text className={columright}>{user.email}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Rol:</Text>
        <Text className={columright}>{user.role}</Text>
      </View>

      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-end gap-2">
        <Pressable onPress={() => setShowEditModal(true)}>
          <Feather name="edit" color="#000" size={24} />
        </Pressable>
        <Pressable onPress={() => setShowConfirmModal(true)}>
          <MaterialCommunityIcons name="delete" color="#000" size={24} />
        </Pressable>
      </View>

      <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleDelete}
        onClose={() => setShowConfirmModal(false)}
        title="Eliminar usuario"
        description="¿Estás seguro de que deseas eliminar este usuario?"
      />

      <EditUserModal
        visible={showEditModal}
        userData={user}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleSuccessEdit}
      />
    </SafeAreaView>
  );
} 
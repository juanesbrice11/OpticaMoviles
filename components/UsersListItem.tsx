import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { columleft, columright } from "./tokens";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmModal from "@/components/molecules/ConfirmModal";
import { deleteUser } from "@/services/usersService";

export default function UsersListItem({ user }: { user: { id: string; name: string; email: string; role: string } }) {

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  async function handleDelete() {
    try {
      const result = await deleteUser(user.id);
      console.log(result);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    setShowConfirmModal(false);
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

      <View className="flex-row justify-end gap-2" >
        <Pressable onPress={() => console.log("Edit user")}>
          <Feather name="edit" color="#000" size={24} />
        </Pressable>
        <Pressable onPress={() => setShowConfirmModal(true)}>
          <MaterialCommunityIcons name="delete" color="#000" size={24} />
        </Pressable>
      </View>

      <ConfirmModal
        visible={showConfirmModal}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirmModal(false)}
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </SafeAreaView>
  );
} 
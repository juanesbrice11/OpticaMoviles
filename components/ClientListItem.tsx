import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { ClientBd } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { columleft, columright } from "./tokens";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmModal from "./molecules/ConfirmModal";
import { deleteClient } from "@/services/clientsService";
import { useState } from "react";

export default function ClientListItem({ client }: { client: ClientBd }) {
  const router = useRouter();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
  
    async function handleDelete() {
      try {
        const result = await deleteClient(client.id);
        console.log(result);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
      setShowConfirmModal(false);
    }
  return (
    <TouchableOpacity onPress={() => {
      console.log('Redirigiendo a /client/' + client.id);
      router.push(`/${client.id}`);
    }}>
      <SafeAreaView className="p-4 border-gray-300 bg-white shadow-md shadow-gray-200 mb-3">
        <View className="flex-row justify-between">
          <Text className={columleft}>Cédula:</Text>
          <Text className={columright}>{client.id}</Text>
        </View>
        <View className="border-b border-gray-200 my-2" />

        <View className="flex-row justify-between">
          <Text className={columleft}>Nombre:</Text>
          <Text className={columright}>{client.name}</Text>
        </View>
        <View className="border-b border-gray-200 my-2" />

        <View className="flex-row justify-between">
          <Text className={columleft}>Apellido:</Text>
          <Text className={columright}>{client.lastname}</Text>
        </View>
        <View className="border-b border-gray-200 my-2" />

        <View className="flex-row justify-between">
          <Text className={columleft}>Teléfono:</Text>
          <Text className={columright}>{client.phone}</Text>
        </View>
        <View className="border-b border-gray-200 my-2" />

        <View className="flex-row justify-between">
          <Text className={columleft}>Email:</Text>
          <Text className={columright}>{client.email}</Text> 
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
        onClose={() => setShowConfirmModal(false)}
        title="Eliminar cliente"
        description="¿Estás seguro de que deseas eliminar este cliente?"
      />
      </SafeAreaView>
    </TouchableOpacity>
  );
}

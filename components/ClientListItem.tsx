import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { ClientBd } from "@/types/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { columleft, columright } from "./tokens";

export default function ClientListItem({ client }: { client: ClientBd }) {
  const router = useRouter();

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
      </SafeAreaView>
    </TouchableOpacity>
  );
}

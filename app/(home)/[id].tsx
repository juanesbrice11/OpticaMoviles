import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { glassesData } from "./glassessData";


export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  console.log(id);

  const numericId = Number(id);

  const item = glassesData.find((g) => g.id === numericId);

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se encontró la gafa con id {id}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center p-4">
        <Image
          source={item.imageUri}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Text className="text-xl font-bold mt-4">{item.name}</Text>
        <Text>Material: {item.material}</Text>
        <Text>Precio: {item.price}</Text>
        <Text>Stock: {item.stock}</Text>
        <Text>ID: {item.id}</Text>
      </View>
    </ScrollView>
  );
}

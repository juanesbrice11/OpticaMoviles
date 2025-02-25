import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { glassesData } from "./glassessData";
import GlassesDetail from "@/components/glassesDetail";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  const numericId = Number(id);

  const item = glassesData.find((g) => g.id === numericId);

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se encontró la gafa con id {id}</Text>
      </View>
    );
  }

  return <GlassesDetail {...item} />;
}

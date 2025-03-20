import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import GlassesDetail from "@/components/glassesDetail";
import { getGlassesById } from "@/services/glassesService";
import type { Glasses } from "@/services/glassesService";

export default function DetailScreen() {
  const { id } = useLocalSearchParams();
  
  const numericId = Number(id);
  const [item, setItem] = useState<Glasses | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGlasses = async () => {
      try {
        
        const data = await getGlassesById(numericId);
        setItem(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchGlasses();
  }, [numericId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">Error: {error}</Text>
      </View>
    );
  }

  if (!item) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se encontró la gafa con id {id}</Text>
      </View>
    );
  }

  return (
    <GlassesDetail
      id={item.id}
      name={item.marca}
      imageUri={{ uri: item.imagen }}
      price={item.precio}
      material={item.material}
      stock={item.stock}
    />
  );
}

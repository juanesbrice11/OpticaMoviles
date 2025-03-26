import { useLocalSearchParams } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getClientById } from "@/services/clientsService";
import type { ClientBd } from "@/types/api";
import ClientDetail from "@/components/ClientDetail";

export default function ClientDetailScreen() {
  const { id } = useLocalSearchParams(); 
  const [client, setClient] = useState<ClientBd | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const data = await getClientById(id as string);
        setClient(data);
      } catch (err) {
        setError("Error al cargar el cliente");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (!client) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No se encontró el cliente con ID {id}</Text>
      </View>
    );
  }

  return (
    <ClientDetail />
  );
}

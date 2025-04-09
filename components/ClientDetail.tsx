import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, Image, Pressable, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ClientBd, ClinicalHistory } from "@/types/api";
import { getClients } from "@/services/clientsService";
import { getClinicalHistories, deleteClinicalHistory } from "@/services/clinicalHistory";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConfirmModal from "./molecules/ConfirmModal";
import { EditClinicalHistoryModal } from "./molecules/EditClinicalHistoryModal";

export default function ClientDetail() {
  const { id } = useLocalSearchParams();
  const [client, setClient] = useState<ClientBd | null>(null);
  const [histories, setHistories] = useState<ClinicalHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [selectedHistoryToEdit, setSelectedHistoryToEdit] = useState<ClinicalHistory | null>(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const clients = await getClients();
      const foundClient = clients.find(client => String(client.id) === String(id));

      const allHistories = await getClinicalHistories();
      const clientHistories = Array.isArray(allHistories)
        ? allHistories.filter(history => String(history.id_client) === String(id))
        : [];

      setClient(foundClient || null);
      setHistories(clientHistories);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No se pudieron cargar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHistory = async (historyId: string) => {
    try {
      await deleteClinicalHistory(historyId);
      Alert.alert("Eliminación exitosa", "La historia clínica fue eliminada correctamente.");
      setSelectedHistoryId(null);
      fetchData(); // Refrescar datos después de eliminar
    } catch (error) {
      console.error("Error deleting history:", error);
      Alert.alert("Error", "No se pudo eliminar la historia clínica.");
    }
  };

  const handleEditHistory = (history: ClinicalHistory) => {
    setSelectedHistoryToEdit(history);
  };

  const handleCloseEditModal = () => {
    setSelectedHistoryToEdit(null);
  };

  const handleSuccessEdit = () => {
    handleCloseEditModal();
    fetchData();
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 font-semibold">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="items-center">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>

      <ScrollView className="flex-1 mt-2 p-6">
        {client ? (
          <View>
            {/* Información del cliente */}
            <Text className="text-2xl font-bold text-center mb-4 text-primary">
              Información del Cliente
            </Text>
            <View className="bg-gray-100 p-4 rounded-lg border border-gray-300">
              <Text className="text-lg font-semibold">Cédula:</Text>
              <Text className="text-lg mb-2">{client.id}</Text>

              <Text className="text-lg font-semibold">Nombre:</Text>
              <Text className="text-lg mb-2">{client.name} {client.lastname}</Text>

              <Text className="text-lg font-semibold">Teléfono:</Text>
              <Text className="text-lg mb-2">{client.phone}</Text>

              <Text className="text-lg font-semibold">Email:</Text>
              <Text className="text-lg">{client.email}</Text>
            </View>

            {/* Historias clínicas */}
            <Text className="text-xl font-bold text-center mt-6 mb-2 text-primary">
              Historias Clínicas
            </Text>

            {histories.length > 0 ? (
              histories.map((history) => (
                <View key={history.id} className="p-4 border-b border-gray-300 relative">
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="text-lg font-bold text-primary">
                        Historia ID: {history.id}
                      </Text>
                      <Text className="text-lg">
                        <Text className="font-semibold">SC:</Text> {history.sc?.join(", ") || "N/A"}
                      </Text>
                      <Text className="text-lg">
                        <Text className="font-semibold">CC:</Text> {history.cc?.join(", ") || "N/A"}
                      </Text>
                      <Text className="text-lg">
                        <Text className="font-semibold">AE:</Text> {history.ae?.length > 0 ? history.ae.join(", ") : "N/A"}
                      </Text>
                    </View>

                    <View className="flex-row gap-2">
                      <Pressable onPress={() => handleEditHistory(history)}>
                        <Feather name="edit" color="#000" size={24} />
                      </Pressable>

                      <Pressable onPress={() => setSelectedHistoryId(String(history.id))}>
                        <MaterialCommunityIcons name="delete" color="#000" size={24} />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text className="text-center text-gray-500 mt-4">
                No hay historias clínicas registradas para este cliente.
              </Text>
            )}

          </View>
        ) : (
          <Text className="text-center text-red-500 font-semibold mt-6">
            Cliente no encontrado.
          </Text>
        )}
      </ScrollView>

      <ConfirmModal
        visible={!!selectedHistoryId}
        onClose={() => setSelectedHistoryId(null)}
        onConfirm={() => {
          if (selectedHistoryId) {
            handleDeleteHistory(selectedHistoryId);
          }
        }}
        title="Confirmar eliminación"
        description="¿Estás seguro que deseas eliminar esta historia clínica? Esta acción no se puede deshacer."
      />

      {selectedHistoryToEdit && (
        <EditClinicalHistoryModal
          visible={!!selectedHistoryToEdit}
          historyData={selectedHistoryToEdit}
          onClose={handleCloseEditModal}
          onSuccess={handleSuccessEdit}
        />
      )}
    </View>
  );
}

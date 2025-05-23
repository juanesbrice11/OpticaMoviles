import React, { useState, useEffect } from "react";
import SalesViewerComponent from "@/components/SalesViewer";
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { texttitle } from "./tokens";
import { getSales, Sale, deleteSale } from "@/services/salesService";
import { Ionicons } from "@expo/vector-icons";
import FloatingMenu from "./molecules/FloatingMenu";
import EditSaleModal from "../components/EditSaleModal";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "./molecules/ConfirmModal";

export default function Sales() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { authState } = useAuth();

  const fetchSales = async () => {
    try {
      const data = await getSales();
      if (params.salesIds) {
        const salesIds = (params.salesIds as string).split(',').map(Number);
        const filteredSales = data.filter(sale => salesIds.includes(sale.id));
        setSales(filteredSales);
        
        Alert.alert(
          "Ventas asociadas",
          `Estas son las ventas asociadas al cliente ${params.clientId}.\n\nIDs de ventas: ${params.salesIds}`
        );
      } else {
        setSales(data);
      }
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [params.salesIds, params.clientId]);

  const handleEdit = (sale: Sale) => {
    setSelectedSale(sale);
    setEditModalVisible(true);
  };

  const handleDelete = async () => {
    if (!selectedSale) return;
    
    try {
      await deleteSale(selectedSale.id);
      Alert.alert("Éxito", "Venta eliminada correctamente");
      await fetchSales();
      setShowDeleteModal(false);
      setSelectedSale(null);
    } catch (err) {
      Alert.alert("Error", "No se pudo eliminar la venta");
    }
  };

  const handleDeleteConfirm = (sale: Sale) => {
    setSelectedSale(sale);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center mt-4">Cargando...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <View className="flex-1 bg-white relative">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />

        <Text className={`${texttitle}`}>
          {params.salesIds ? "Ventas asociadas al cliente" : "Ventas"}
        </Text>
        <ScrollView className="w-full">
          {error ? (
            <Text className="text-center mt-4 text-red-500">Error: {error}</Text>
          ) : sales.length === 0 ? (
            <View className="items-center justify-center p-4">
              <Ionicons name="cart-outline" size={64} color="#1769AA" />
              <Text className="text-lg text-gray-600 text-center mt-4">
                No hay ventas para mostrar
              </Text>
              {!params.salesIds && (
                <Text className="text-sm text-gray-500 text-center mt-2">
                  Presiona el botón + para crear una nueva venta
                </Text>
              )}
            </View>
          ) : (
            <View className="items-center">
              {sales.map((sale) => (
                <SalesViewerComponent 
                  key={sale.id} 
                  id={sale.id}
                  client_id={`${sale.client.name} ${sale.client.lastname}`}
                  product_id={sale.glasses.marca}
                  total={sale.total.toString()}
                  date={sale.date}
                  product_image={{ uri: sale.glasses.imagen }}
                  onEdit={() => handleEdit(sale)}
                  onDelete={() => handleDeleteConfirm(sale)}
                />
              ))}
            </View>
          )}
        </ScrollView>

        {!params.salesIds && (
          <>
            <FloatingMenu
              visible={menuVisible}
              onClose={() => setMenuVisible(false)}
              routes={[
                { url: "/(content)/(sales)/crearVenta", text: "Crear Venta" },
              ]}
            />
            <View className="absolute bottom-0 right-0 mb-4 mr-4">
              <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
                <Ionicons name="add-circle" size={60} color="#1769AA" />
              </TouchableOpacity>
            </View>
          </>
        )}

        {selectedSale && (
          <EditSaleModal
            visible={editModalVisible}
            onClose={() => setEditModalVisible(false)}
            sale={{
              id: selectedSale.id,
              clientId: selectedSale.client.id,
              glassesId: selectedSale.glasses.id,
              total: selectedSale.total,
              date: selectedSale.date
            }}
            onSuccess={fetchSales}
          />
        )}

        <ConfirmModal
          visible={showDeleteModal}
          onConfirm={handleDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedSale(null);
          }}
          title="Eliminar venta"
          description="¿Estás seguro de que deseas eliminar esta venta?"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

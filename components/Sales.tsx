import React, { useState, useEffect } from "react";
import SalesViewerComponent from "@/components/SalesViewer";
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { texttitile } from "./tokens";
import { getSales, Sale } from "@/services/salesService";
import { Ionicons } from "@expo/vector-icons";
import FloatingMenu from "./molecules/FloatingMenu";

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await getSales();
        setSales(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error');
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const handleEdit = (sale: Sale) => {
    setSelectedSale(sale);
    setEditModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta venta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSale(id);
              // Actualizar la lista de ventas
              const data = await getSales();
              setSales(data);
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Error al eliminar la venta');
            }
          }
        }
      ]
    );
  };

  const handleUpdate = async () => {
    try {
      const data = await getSales();
      setSales(data);
      setEditModalVisible(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la lista de ventas');
    }
  };

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

        <Text className={`${texttitile}`}>Ventas</Text>
        <ScrollView className="w-full">
          {loading ? (
            <Text className="text-center mt-4">Cargando...</Text>
          ) : error ? (
            <Text className="text-center mt-4 text-red-500">Error: {error}</Text>
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
                  onDelete={() => handleDelete(sale.id)}
                />
              ))}
            </View>
          )}
        </ScrollView>

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
            onSuccess={handleUpdate}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

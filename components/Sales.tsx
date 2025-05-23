import React, { useState, useEffect } from "react";
import SalesViewerComponent from "@/components/SalesViewer";
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Pressable, ActivityIndicator, TextInput, TouchableWithoutFeedback, Keyboard } from "react-native";
import { texttitle } from "./tokens";
import { getSales, Sale, deleteSale } from "@/services/salesService";
import { Ionicons, Feather } from "@expo/vector-icons";
import FloatingMenu from "./molecules/FloatingMenu";
import EditSaleModal from "../components/EditSaleModal";
import CreateSaleModal from "./molecules/CreateSaleModal";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import ConfirmModal from "./molecules/ConfirmModal";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigation';
import { getLocalSales } from "@/services/localSalesService";

type SalesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Sales'>;

export default function Sales() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { authState } = useAuth();
  const navigation = useNavigation<SalesScreenNavigationProp>();

  const fetchSales = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSales();
      // const data = await getLocalSales();
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

  const filteredSales = sales.filter((sale) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      `${sale.client.name} ${sale.client.lastname}`.toLowerCase().includes(searchLower) ||
      sale.glasses.marca.toLowerCase().includes(searchLower) ||
      sale.id.toString().includes(searchLower) ||
      sale.total.toString().includes(searchLower) ||
      sale.date.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">{error}</Text>
        <Pressable 
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          onPress={fetchSales}
        >
          <Text className="text-white">Reintentar</Text>
        </Pressable>
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

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-4 py-2">
            <View className="flex-row items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3">
              <Ionicons name="search" size={20} color="#888" className="mr-2" />
              <TextInput
                placeholder="Buscar por cliente, producto, ID..."
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 text-base"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery("")}>
                  <Ionicons name="close-circle" size={20} color="#888" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

        <ScrollView className="w-full">
          {error ? (
            <Text className="text-center mt-4 text-red-500">Error: {error}</Text>
          ) : filteredSales.length === 0 ? (
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
              {filteredSales.map((sale) => (
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
            <TouchableOpacity 
              className="absolute bottom-0 left-0 mb-4 ml-4"
              onPress={() => setCreateModalVisible(true)}
            >
              <Ionicons name="add-circle" size={60} color="#1769AA" />
            </TouchableOpacity>
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

        <CreateSaleModal
          visible={createModalVisible}
          onClose={() => setCreateModalVisible(false)}
          onSuccess={fetchSales}
        />

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

import React, { useState, useEffect } from "react";
import SalesViewerComponent from "@/components/SalesViewer";
import { View, Text, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { texttitile } from "./tokens";
import { getSales, Sale } from "@/services/salesService";
import { Ionicons } from "@expo/vector-icons";
import FloatingMenu from "./FloatingMenu";
import { router } from "expo-router";

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

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
                  client_id={sale.client}
                  product_id={sale.glasses?.toString() ?? 'N/A'}
                  total={sale.total}
                  date={sale.date}
                  product_image={sale.product_image}
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
      </View>
    </KeyboardAvoidingView>
  );
}

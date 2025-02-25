import React from "react";
import SalesViewerComponent from "@/components/SalesViewer";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SalesScreen() {
  const sales = [
    {
      id: "1",
      client_id: "1",
      product_id: "1",
      total: 100,
      date: "2021-09-01",
      product_image: require("@/assets/images/image15.png"),
    },
    {
      id: "2",
      client_id: "2",
      product_id: "2",
      total: 200,
      date: "2021-09-02",
      product_image: require("@/assets/images/image9.png"),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-3">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>
      <Text className="text-2xl font-bold text-center text-blue mt-4">Sales</Text>
      <ScrollView className="w-full">
        {sales.map((sale) => (
          <SalesViewerComponent key={sale.id} {...sale} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

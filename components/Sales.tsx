import React from "react";
import SalesViewerComponent from "@/components/SalesViewer";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Sales() {
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

    <View className="flex-1 bg-white">

      <Image
        source={require("@/assets/images/top.png")}
        className="w-full h-44"
      />

      <View className="items-center">
      </View>
      <Text className="text-2xl font-bold text-center text-primary mt-[8%]">Sales</Text>
      <ScrollView className="w-full">
        {sales.map((sale) => (
          <SalesViewerComponent key={sale.id} {...sale} />
        ))}
      </ScrollView>
    </View>
  );
}

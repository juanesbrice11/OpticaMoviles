import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { columleft, columright } from "./tokens";

export default function UsersListItem({ user }: { user: { id: string; name: string; email: string; role: string } }) {
  return (
    <SafeAreaView className="p-4 border-gray-300 bg-white shadow-md shadow-gray-200 mb-3">
      <View className="flex-row justify-between">
        <Text className={columleft}>ID:</Text>
        <Text className={columright}>{user.id}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Nombre:</Text>
        <Text className={columright}>{user.name}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Email:</Text>
        <Text className={columright}>{user.email}</Text>
      </View>
      <View className="border-b border-gray-200 my-2" />

      <View className="flex-row justify-between">
        <Text className={columleft}>Rol:</Text>
        <Text className={columright}>{user.role}</Text>
      </View>
    </SafeAreaView>
  );
} 
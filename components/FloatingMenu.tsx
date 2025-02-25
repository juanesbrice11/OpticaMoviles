import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

interface FloatingMenuProps {
  visible: boolean;
  onClose: () => void;
}

export default function FloatingMenu({ visible, onClose }: FloatingMenuProps) {
  if (!visible) return null;

  return (
    <View className="absolute bottom-20 right-4 bg-white shadow-lg rounded-lg p-2 w-40">
      <Link href="/crear" asChild>
        <TouchableOpacity
          className="p-2 border-b border-gray-300"
          onPress={onClose}
        >
          <Text className="text-gray-700 text-xl">Crear historia</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/crear" asChild>
        <TouchableOpacity className="p-2" onPress={onClose}>
          <Text className="text-gray-700 text-xl">Crear cliente</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

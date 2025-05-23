import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface RoutesData {
  url: string;
  text: string;
}

interface FloatingMenuProps {
  visible: boolean;
  onClose: () => void;
  routes: RoutesData[];
  onSelectRoute: (url: string) => void;
}

export default function FloatingMenu({ visible, onClose, routes, onSelectRoute }: FloatingMenuProps) {
  if (!visible) return null;

  return (
    <View className="absolute bottom-20 right-4 bg-white shadow-lg rounded-lg p-2 w-40">
      {routes.map((route) => (
        <TouchableOpacity
          key={route.url}
          className="p-2 border-b border-gray-300"
          onPress={() => {
            onSelectRoute(route.url);
          }}
        >
          <Text className="text-gray-700 text-xl">{route.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

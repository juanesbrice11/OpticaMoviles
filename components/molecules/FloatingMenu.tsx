import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

interface RoutesData {
  url: string;
  text: string;
}

interface FloatingMenuProps {
  visible: boolean;
  onClose: () => void;
  routes: RoutesData[];
  onSelectRoute?: (url: string) => void;
}

export default function FloatingMenu({ visible, onClose, routes, onSelectRoute }: FloatingMenuProps) {
  if (!visible) return null;

  const handleRoutePress = (url: string) => {
    if (onSelectRoute) {
      onSelectRoute(url);
    } else {
      // Asegurarse de que la URL comience con /
      const formattedUrl = url.startsWith('/') ? url : `/${url}`;
      router.push(formattedUrl as any);
    }
    onClose();
  };

  return (
    <View className="absolute bottom-20 right-4 bg-white shadow-lg rounded-lg p-2 w-40">
      {routes.map((route) => (
        <TouchableOpacity
          key={route.url}
          className="p-2 border-b border-gray-300"
          onPress={() => handleRoutePress(route.url)}
        >
          <Text className="text-gray-700 text-xl">{route.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

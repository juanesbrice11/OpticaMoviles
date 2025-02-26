import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Link, RelativePathString } from "expo-router";

interface RoutesData {
  url: string;
  text: string;
}
interface FloatingMenuProps {
  visible: boolean;
  onClose: () => void;
  routes: RoutesData[];
}

export default function FloatingMenu({ visible, onClose, routes }: FloatingMenuProps) {
  if (!visible) return null;

  return (
    <View className="absolute bottom-20 right-4 bg-white shadow-lg rounded-lg p-2 w-40">

      {routes.map((route) => (
        <Link key={route.url} href={route.url as RelativePathString} asChild>
          <TouchableOpacity
            className="p-2 border-b border-gray-300"
            onPress={onClose}
          >
            <Text className="text-gray-700 text-xl">{route.text}</Text>
          </TouchableOpacity>
        </Link> 
      ))

      }
    </View>
  );
}

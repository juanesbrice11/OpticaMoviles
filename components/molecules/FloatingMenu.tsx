import React from "react";
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
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
  position?: 'left' | 'right';
}

export default function FloatingMenu({ visible, onClose, routes, onSelectRoute, position = 'right' }: FloatingMenuProps) {
  if (!visible) return null;

  const handleRoutePress = (route: RoutesData) => {
    if (onSelectRoute) {
      onSelectRoute(route.url);
    } else {
      const formattedUrl = route.url.startsWith('/') ? route.url : `/${route.url}`;
      router.push(formattedUrl as any);
    }
    onClose();
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View className="absolute inset-0">
        <TouchableWithoutFeedback>
          <View className={`absolute bottom-24 ${position === 'left' ? 'left-20' : 'right-4'} bg-white shadow-lg rounded-lg p-2 w-40`}>
            {routes.map((route) => (
              <TouchableOpacity
                key={route.url}
                className="p-2 border-b border-gray-300"
                onPress={() => handleRoutePress(route)}
              >
                <Text className="text-gray-700 text-xl">{route.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
}

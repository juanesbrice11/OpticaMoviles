// src/components/molecules/FloatingMenu.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

export interface Route {
  url: string;
  text: string;
}

interface FloatingMenuProps {
  visible: boolean;
  onClose: () => void;
  routes: Route[];
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ visible, onClose, routes }) => {
  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity className="flex-1" onPress={onClose}>
        <View className="absolute bottom-20 right-10 bg-white p-4 rounded-lg shadow-md">
          {routes.map((route, index) => (
            <TouchableOpacity
              key={index}
              className="py-2"
            >
              <Text className="text-blue-500">{route.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default FloatingMenu;

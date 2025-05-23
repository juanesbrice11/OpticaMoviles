import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  visible,
  onClose,
  onConfirm,
  title,
  description,
}) => {
  if (!visible) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg w-4/5">
          <Text className="text-lg font-bold mb-4">{title}</Text>
          <Text className="mb-6">{description}</Text>
          <View className="flex-row justify-end space-x-4">
            <TouchableOpacity
              onPress={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              className="px-4 py-2 rounded-lg bg-red-500"
            >
              <Text className="text-white font-bold">Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

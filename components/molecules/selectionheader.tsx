import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectionHeaderProps {
  isSelectionMode: boolean;
  selectedCount: number;
  onDelete: () => void;
  onCancel: () => void;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  isSelectionMode,
  selectedCount,
  onDelete,
  onCancel,
}) => {
  if (!isSelectionMode) return null;
  return (
    <View className="flex-row justify-center items-center mt-2 space-x-4">
      <TouchableOpacity
        onPress={onDelete}
        disabled={selectedCount === 0}
        className={`${selectedCount === 0 ? 'opacity-50' : ''}`}
      >
        <Ionicons name="trash" size={24} color={selectedCount === 0 ? "#999" : "#FF0000"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onCancel}>
        <Text className="text-blue-500">Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectionHeader;
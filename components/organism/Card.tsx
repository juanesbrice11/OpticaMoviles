import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { CardProps } from '@/types/api';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

export default function Card({ name, imageUri, price, material, id, stock, isSelected }: CardProps & { isSelected?: boolean }) {
  // Normalizar la URL reemplazando backslashes por forward slashes
  const normalizedImageUri = imageUri.replace(/\\/g, '/');

  const handleEdit = () => {
    router.push(`/editarGafa/${id}`);
  };

  return (
    <View className="w-40 h-65 bg-white rounded-lg shadow-md m-2 overflow-hidden relative">
      {isSelected && (
        <View className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
          <Ionicons
            testID="checkmark-icon"
            name="checkmark"
            size={16}
            color="white"
          />
        </View>
      )}
      <Image
        source={{ uri: normalizedImageUri }}
        className="w-full h-32"
        resizeMode="cover"
        onError={(error) => console.error('Error loading image:', error.nativeEvent.error)}
        onLoad={() => console.log('Image loaded successfully:', normalizedImageUri)}
      />
      <View className="p-2">
        <Text className="font-bold text-lg text-center">{name}</Text>
        <Text className="text-gray-600 text-center">${price}</Text>
        <Text className="text-gray-500 text-center">{material}</Text>
        <Text className="text-gray-500 text-center">Stock: {stock}</Text>
        <TouchableOpacity
          onPress={handleEdit}
          className="left-0 right-0 items-center"
        >
          <Ionicons name="create-outline" size={20} color="#1769AA" />
        </TouchableOpacity>
      </View>

    </View>
  );
}

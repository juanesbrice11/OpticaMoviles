import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { CardProps } from '@/types/api';
import { Ionicons } from "@expo/vector-icons";

export default function Card({ name, imageUri, price, material, id, stock, isSelected }: CardProps & { isSelected?: boolean }) {
  // Normalizar la URL reemplazando backslashes por forward slashes
  const normalizedImageUri = imageUri.replace(/\\/g, '/');

  return (
    <View className="w-40 h-64 bg-white rounded-lg shadow-md m-2 overflow-hidden relative">
      {isSelected && (
        <View className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
          <Ionicons name="checkmark" size={16} color="white" />
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
        <Text className="font-bold text-lg">{name}</Text>
        <Text className="text-gray-600">${price}</Text>
        <Text className="text-gray-500">{material}</Text>
        <Text className="text-gray-500">Stock: {stock}</Text>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, Image, ImageSourcePropType, TouchableOpacity, Alert } from 'react-native';
import { CardProps } from '@/types/api';
import { Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { deleteGlasses } from '@/services/glassesService';

interface CardPropsWithRefresh extends CardProps {
  isSelected?: boolean;
  onRefresh?: () => void;
}

export default function Card({ name, imageUri, price, material, id, stock, isSelected, onRefresh }: CardPropsWithRefresh) {
  // Normalizar la URL reemplazando backslashes por forward slashes
  const normalizedImageUri = imageUri.replace(/\\/g, '/');

  const handleEdit = () => {
    router.push({
        pathname: '/edit-glasses',
        params: { id: id }
    });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta gafa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteGlasses([id]);
              Alert.alert("Éxito", "Gafa eliminada correctamente");
              // Actualizar la lista de gafas
              if (onRefresh) {
                onRefresh();
              } else {
                // Si no hay función de actualización, recargar la página
                router.replace('/home');
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar la gafa");
            }
          }
        }
      ]
    );
  };

  return (
    <View className="w-44 bg-white rounded-xl shadow-lg shadow-black/20 m-2 overflow-hidden relative border border-gray-100">
      {isSelected && (
        <View className="absolute top-2 right-2 bg-blue-500 rounded-full p-1 z-10">
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
        className="w-full h-36 bg-gray-50"
        resizeMode="contain"
        onError={(error) => console.error('Error loading image:', error.nativeEvent.error)}
        onLoad={() => console.log('Image loaded successfully:', normalizedImageUri)}
      />
      <View className="p-3">
        <Text className="text-sm text-gray-500 mb-1">Ref. {id}</Text>
        <Text className="font-bold text-base text-gray-800 mb-1">{name}</Text>
        <Text className="text-lg font-bold text-primary mb-1">${price}</Text>
        <Text className="text-sm text-gray-600 mb-1">{material}</Text>
        <Text className="text-sm text-gray-600 mb-2">Stock: {stock}</Text>
        <View className="flex-row justify-center space-x-6 mt-1">
          <TouchableOpacity
            onPress={handleEdit}
            className="items-center"
          >
            <Ionicons name="create-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            className="items-center"
          >
            <Ionicons name="trash-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

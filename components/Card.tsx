import React from 'react';
import { View, Text, Image } from 'react-native';
import { CardProps } from '@/types/api';

export default function Card({ name, imageUri, price, material, id, stock }: CardProps) {
  return (
    <View className="rounded-xl border-2 border-primary bg-white shadow-lg shadow-gray-400 w-[150px] h-[220px] m-3 items-center p-3">
      <Text className="text-base font-bold mt-1 text-center" numberOfLines={1}>
        {name}
      </Text>

      <View className="w-[90px] h-[90px] mt-2">
        <Image
          source={imageUri}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>

      <Text className="text-sm mt-2 font-semibold text-gray-700">${price}</Text>
      <Text className="text-sm text-gray-500">{material}</Text>

      <View className="flex flex-row justify-between w-full mt-3 px-2">
        <Text className="text-sm text-gray-600">Stock: {stock}</Text>
        <Text className="text-xs text-gray-400">ID: {id}</Text>
      </View>
    </View>
  );
}

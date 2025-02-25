import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

interface CardProps {
  name: string;
  imageUri: ImageSourcePropType;
  price: number;
  material: string;
  id: string | number;
  stock: number;
}

export default function Card({ name, imageUri, price, material, id, stock }: CardProps) {
  return (
    <View className="rounded-[18px] border-[2px] border-blue bg-white shadow-[0px 4px 4px 0px] shadow-blue w-[135px] h-[200px] m-2 items-center p-2">
        <Text className="text-base font-bold mt-2 numberOfLines={1}">{name}</Text>
        <View className="w-[80px] h-[80px]">
        <Image
          source={imageUri}
          className="w-full h-full"
          resizeMode="contain" 
        />
      </View>
      <Text className="text-sm mt-1">{price}</Text>
      <Text className="text-sm mt-1">{material}</Text>
      <View className="flex flex-row justify-between w-full mt-2">
        <Text className="text-sm text-gray-500">Stock: {stock}</Text>
        <Text className="text-xs text-gray-500">ID: {id}</Text>
      </View>
    </View>
  );
}

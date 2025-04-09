import React from 'react';
import { Text, Image, View, Pressable } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

interface SalesViewerProps {
    id: number;
    client_id: string;
    product_id: string;
    product_image: { uri: string };
    total: string;
    date: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

export default function SalesViewerComponent({
    id,
    client_id,
    product_id,
    product_image,
    total,
    date,
    onEdit,
    onDelete,
}: SalesViewerProps): JSX.Element {
    return (
        <View className="bg-white rounded-2xl shadow-lg shadow-black/30 w-11/12 mx-auto my-2 p-5 flex-row items-center gap-4 border border-gray-200">
            <Image
                source={product_image}
                className="w-32 h-32 rounded-lg shadow-md mx-10"
                resizeMode="contain"
            />
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">ID: {id}</Text>
                <Text className="text-sm text-gray-600">Cliente: {client_id}</Text>
                <Text className="text-sm text-gray-600">Producto: {product_id}</Text>
                <Text className="text-sm text-gray-600">Fecha: {date}</Text>
                <Text className="text-lg font-bold text-primary mt-1">${total}</Text>
                
                <View className="flex-row justify-end gap-2 mt-2">
                    <Pressable onPress={onEdit}>
                        <Feather name="edit" color="#000" size={24} />
                    </Pressable>
                    <Pressable onPress={onDelete}>
                        <MaterialCommunityIcons name="delete" color="#000" size={24} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

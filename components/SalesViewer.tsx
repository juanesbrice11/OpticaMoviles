import React from 'react';
import { SafeAreaView, Text, Image, View } from 'react-native';

interface SalesViewerProps {
    id: string | number;
    client_id: string | number;
    product_id: string | number;
    product_image: any;
    total: number;
    date: string;
}

export default function SalesViewerComponent({
    id,
    client_id,
    product_id,
    product_image,
    total,
    date,
}: SalesViewerProps): JSX.Element {
    return (
            <View className="bg-white rounded-[18px] border-[2px] border-primary w-3/4 h-40 m-2 p-4 flex-row items-center">
                <View className="flex-1 pr-4">
                    <Text className="text-lg font-bold">ID: {id}</Text>
                    <Text className="text-sm mt-1 text-gray-700">Client ID: {client_id}</Text>
                    <Text className="text-sm mt-1 text-gray-700">Product ID: {product_id}</Text>
                    <Text className="text-sm mt-1 text-gray-700">Date: {date}</Text>
                    <Text className="text-sm mt-1 text-gray-700">Total: ${total}</Text>
                </View>
                <Image
                    source={product_image}
                    className="w-40 h-40"
                    resizeMode="contain"
                />
            </View>
    );
};

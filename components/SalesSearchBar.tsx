import React, { useState } from 'react';
import { View, TextInput, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import SalesViewerComponent from './SalesViewer';
import { Sale } from '@/services/salesService';

interface Client {
    name: string;
    lastname: string;
}

interface Glasses {
    marca: string;
    imagen: string;
}

interface Sale {
    id: number;
    client: Client;
    glasses: Glasses;
    total: number;
    date: string;
}

interface SalesSearchBarProps {
    data: Sale[];
    onEdit?: (sale: Sale) => void;
    onDelete?: (sale: Sale) => void;
}

export default function SalesSearchBar({ data, onEdit, onDelete }: SalesSearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const filteredData = data.filter((sale) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            `${sale.client.name} ${sale.client.lastname}`.toLowerCase().includes(searchLower) ||
            sale.glasses.marca.toLowerCase().includes(searchLower) ||
            sale.id.toString().includes(searchLower) ||
            sale.total.toString().includes(searchLower) ||
            sale.date.toLowerCase().includes(searchLower)
        );
    });

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1">
                <View className="flex-row items-center bg-white rounded-full px-4 py-2 mx-4 my-2 border border-gray-300">
                    <Feather name="search" size={20} color="#666" />
                    <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Buscar por cliente, producto, ID..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableWithoutFeedback onPress={() => setSearchQuery('')}>
                            <Feather name="x" size={20} color="#666" />
                        </TouchableWithoutFeedback>
                    )}
                </View>

                {filteredData.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-gray-500 text-lg">No se encontraron ventas</Text>
                    </View>
                ) : (
                    <View className="flex-1">
                        {filteredData.map((sale) => (
                            <SalesViewerComponent
                                key={sale.id}
                                id={sale.id}
                                client_id={`${sale.client.name} ${sale.client.lastname}`}
                                product_id={sale.glasses.marca}
                                product_image={{ uri: sale.glasses.imagen }}
                                total={sale.total.toString()}
                                date={sale.date}
                                onEdit={() => onEdit?.(sale)}
                                onDelete={() => onDelete?.(sale)}
                            />
                        ))}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
} 
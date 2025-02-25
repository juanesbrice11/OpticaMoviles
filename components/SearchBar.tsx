import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GenericSearchBarProps<T> {
    data: T[];
    filterPredicate: (item: T, query: string) => boolean;
    renderItem: ({ item }: { item: T }) => JSX.Element;
    placeholder?: string;
    headerComponent?: JSX.Element;
}

const GenericSearchBar = <T,>({
    data,
    filterPredicate,
    renderItem,
    placeholder = 'Buscar...',
    headerComponent,
}: GenericSearchBarProps<T>) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = data.filter(item => filterPredicate(item, searchQuery));

    return (
        <View className="p-4">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} className="relative">
                <TextInput
                    placeholder={placeholder}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    className="py-2 px-2 border border-gray-300 rounded-md"
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity
                        onPress={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                        <Ionicons name="close-circle" size={20} color="#888" />
                    </TouchableOpacity>
                )}
            </KeyboardAvoidingView>
            <FlatList
                data={filteredData}
                keyExtractor={item =>
                    typeof (item as any).id === 'string'
                        ? (item as any).id
                        : String((item as any).id)
                }
                renderItem={renderItem}
                ListHeaderComponent={headerComponent}
                ListEmptyComponent={
                    <Text className="text-center mt-2 text-gray-500">
                        No se encontraron resultados
                    </Text>
                }
            />
        </View>
    );
};

export default GenericSearchBar;

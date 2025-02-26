import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface GenericSearchBarProps<T> {
  data: T[];
  filterPredicate: (item: T, query: string) => boolean;
  renderItem: ({ item }: { item: T }) => JSX.Element;
  placeholder?: string;
}

const GenericSearchBar = <T,>({
  data,
  filterPredicate,
  renderItem,
  placeholder = "Buscar...",
}: GenericSearchBarProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((item) => filterPredicate(item, searchQuery));

  const keyExtractor = (item: T) =>
    typeof (item as any).id === "string"
      ? (item as any).id
      : String((item as any).id);

  return (
    <View className="px-4 py-2">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View className="flex-row items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3">
          <Ionicons name="search" size={20} color="#888" className="mr-2" />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-base"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>

      {filteredData.length === 0 ? (
        <Text className="text-center mt-4 text-gray-500">No se encontraron resultados</Text>
      ) : (
        <ScrollView className="mt-2">
          {filteredData.map((item) => (
            <View key={keyExtractor(item)}>{renderItem({ item })}</View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default GenericSearchBar;

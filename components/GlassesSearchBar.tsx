import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/components/organism/Card";

interface Glasses {
  id: number;
  marca: string;
  imagen: string;
  precio: number;
  material: string;
  stock: number;
}

interface GlassesSearchBarProps {
  data: Glasses[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  selectedItems: number[];
  onRefresh: () => void;
}

const GlassesSearchBar = ({ data, onPress, onLongPress, selectedItems, onRefresh }: GlassesSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = data.filter((glasses) =>
    glasses.marca.toLowerCase().includes(searchQuery.toLowerCase()) ||
    glasses.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
    glasses.precio.toString().includes(searchQuery) ||
    glasses.id.toString().includes(searchQuery)
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1">
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="flex-row items-center bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 mx-4">
            <Ionicons name="search" size={20} color="#888" className="mr-2" />
            <TextInput
              placeholder="Buscar gafas..."
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
            <View className="flex-row flex-wrap justify-center">
              {filteredData.map((item) => (
                <View key={item.id} className="w-1/2 p-2">
                  <Pressable
                    onPress={() => onPress(item.id)}
                    onLongPress={() => onLongPress(item.id)}
                    className={`${selectedItems.includes(item.id) ? 'opacity-70' : ''}`}
                  >
                    <Card
                      name={item.marca}
                      imageUri={item.imagen}
                      price={item.precio}
                      material={item.material}
                      id={item.id}
                      stock={item.stock}
                      isSelected={selectedItems.includes(item.id)}
                      onRefresh={onRefresh}
                    />
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GlassesSearchBar; 
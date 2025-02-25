import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";

import { CardProps } from "@/types/api";



const GlassesDetail = ({ id, name, material, price, stock, imageUri }: CardProps) => {

    const router = useRouter();

    const [currentStock, setCurrentStock] = useState(stock);
    const [editedName, setEditedName] = useState(name);
    const [editedMaterial, setEditedMaterial] = useState(material);
    const [editedPrice, setEditedPrice] = useState(price.toString());

    const increaseStock = () => setCurrentStock(currentStock + 1);
    const decreaseStock = () => {
        if (currentStock > 0) setCurrentStock(currentStock - 1);
    };

    const saveChanges = () => {
        console.log("Datos guardados:", {
            name: editedName,
            material: editedMaterial,
            price: parseFloat(editedPrice),
            stock: currentStock
        });
        alert("Cambios guardados!");

    };

    const confirmChanges = () => {
        alert("¡Confirmado!");
        router.push("/home"); 
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 items-center justify-center bg-gray-100 p-4">
                <View className="w-80 bg-white rounded-2xl shadow-lg p-5 items-center">
                    <Image
                        source={imageUri}
                        className="w-40 h-40 rounded-xl"
                        resizeMode="contain"
                    />

                    <TextInput
                        className="border border-gray-300 rounded-lg p-2 text-center text-xl font-bold mt-4 w-full"
                        value={editedName}
                        onChangeText={setEditedName}
                    />

                    <TextInput
                        className="border border-gray-300 rounded-lg p-2 text-center mt-2 w-full"
                        value={editedMaterial}
                        onChangeText={setEditedMaterial}
                    />

                    <TextInput
                        className="border border-gray-300 rounded-lg p-2 text-center mt-2 w-full"
                        value={editedPrice}
                        keyboardType="numeric"
                        onChangeText={setEditedPrice}
                    />

                    <View className="flex-row items-center gap-4 mt-3">
                        <TouchableOpacity
                            className="bg-red-500 px-4 py-2 rounded-full"
                            onPress={decreaseStock}
                        >
                            <Text className="text-white text-lg font-bold">-</Text>
                        </TouchableOpacity>

                        <Text className="text-xl font-bold">
                            {currentStock > 0 ? currentStock : "Agotado"}
                        </Text>

                        <TouchableOpacity
                            className="bg-green-500 px-4 py-2 rounded-full"
                            onPress={increaseStock}
                        >
                            <Text className="text-white text-lg font-bold">+</Text>
                        </TouchableOpacity>
                    </View>

                    {/* ID */}
                    <Text className="text-gray-400 text-sm mt-2">ID: {id}</Text>

                    <TouchableOpacity
                        className="bg-blue-500 p-3 rounded-lg mt-4 w-full"
                        onPress={saveChanges}
                    >
                        <Text className="text-white text-center font-bold">Guardar Cambios</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    className="bg-green-500 p-4 rounded-full mt-6"
                    onPress={confirmChanges}
                >
                    <Ionicons name="checkmark" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default GlassesDetail;

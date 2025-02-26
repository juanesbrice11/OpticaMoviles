import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    ImageBackground
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

    const confirmChanges = () => {
        alert("¡Confirmado!");
        router.push("/home");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground
                source={require("@/assets/images/backgafas.png")}
                className="flex-1 items-center justify-center bg-white p-4"
                resizeMode="stretch"
            >
                    <View className="w-80 bg-blue rounded-2xl shadow-lg p-5 items-center">
                        <View className="w-45 h-45 rounded-[100] bg-white items-center justify-center">
                            <Image
                                source={imageUri}
                                className="w-40 h-40 rounded-xl"
                                resizeMode="contain"
                            />
                        </View>

                        <TextInput
                            className="rounded-lg p-2 text-center text-xl text-blue font-bold mt-4 w-full bg-white"
                            value={editedName}
                            onChangeText={setEditedName}
                        />

                        <TextInput
                            className="rounded-lg p-2 text-center mt-2 w-full bg-white"
                            value={editedMaterial}
                            onChangeText={setEditedMaterial}
                        />

                        <TextInput
                            className="rounded-lg p-2 text-center mt-2 w-full bg-white"
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

                        <Text className="text-black text-sm mt-2">ID: {id}</Text>

                    </View>
                    <TouchableOpacity
                        className="bg-green-500 p-4 rounded-full mt-6"
                        onPress={confirmChanges}
                    >
                        <Ionicons name="checkmark" size={32} color="white" />
                    </TouchableOpacity>
            </ImageBackground>
        </TouchableWithoutFeedback>
    );
};

export default GlassesDetail;

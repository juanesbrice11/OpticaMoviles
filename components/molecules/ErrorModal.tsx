import React from "react";
import { Modal, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ErrorModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

export default function ErrorModal({
    visible,
    onClose,
    title = "Error",
    message
}: ErrorModalProps) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-4 rounded-lg w-3/5">
                    <View className="items-center mb-3">
                        <MaterialCommunityIcons 
                            name="alert-circle" 
                            size={40} 
                            color="#EF4444" 
                        />
                    </View>
                    <Text className="text-lg font-semibold mb-2 text-center text-red-500">
                        {title}
                    </Text>
                    <Text className="text-base text-gray-600 mb-4 text-center">
                        {message}
                    </Text>
                    <Pressable 
                        onPress={onClose}
                        className="bg-red-500 px-4 py-2 rounded-md"
                    >
                        <Text className="text-white font-medium text-center">
                            Entendido
                        </Text>
                    </Pressable>
                </View>
            </View>            
        </Modal>
    );
} 
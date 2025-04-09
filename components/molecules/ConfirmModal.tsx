import React from "react";
import { Modal, View, Text, Pressable } from "react-native";

interface ConfirmModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export default function ConfirmModal({
    visible,
    onClose,
    onConfirm,
    title = "Confirmar eliminación",
    description = "¿Estás seguro que deseas eliminar este elemento?"
}: ConfirmModalProps) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-6 rounded-lg w-4/5">
                    <Text className="text-lg font-bold mb-2">{title}</Text>
                    <Text className="text-base mb-4">{description}</Text>
                    <View className="flex-row justify-center gap-4">
                        <Pressable
                            onPress={onClose}
                            className="bg-gray-300 px-6 py-2 rounded"
                        >
                            <Text className="text-black">Cancelar</Text>
                        </Pressable>
                        <Pressable
                            onPress={onConfirm}
                            className="bg-red-500 px-6 py-2 rounded"
                        >
                            <Text className="text-white">Eliminar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
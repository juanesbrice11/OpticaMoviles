import React from "react";
import { Modal, View, Text, Button } from "react-native";

interface ConfirmModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message?: string;
}

export default function ConfirmModal({
    visible,
    onConfirm,
    onCancel,
    message = "¿Estás seguro?"
}: ConfirmModalProps) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onCancel}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="bg-white p-5 rounded-lg">
                    <Text>{message}</Text>
                    <Button title="Confirmar" onPress={onConfirm} />
                    <Button title="Cancelar" onPress={onCancel} />
                </View>
            </View>
            
        </Modal>
    );
}
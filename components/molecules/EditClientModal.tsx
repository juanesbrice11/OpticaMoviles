import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    TextInput,
    ScrollView,
    Alert,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { updateUser } from "@/services/usersService";
import { updateClient } from "@/services/clientsService";

interface EditUserModalProps {
    visible: boolean;
    clientData: {
        id: string;
        name: string;
        lastname: string;
        phone: string;
        email: string;
    };
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditClientModal({ visible, clientData, onClose, onSuccess }: EditUserModalProps) {
    const [name, setName] = useState(clientData.name);
    const [lastname, setLastname] = useState(clientData.lastname);
    const [phone, setPhone] = useState(clientData.phone);
    const [email, setEmail] = useState(clientData.email);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const updatedClient = {
                ...clientData,
                name,
                lastname,
                email,
                phone,
            };            
            await updateClient(String(clientData.id), updatedClient);
            Alert.alert("Éxito", "Cliente actualizado correctamente");
            onSuccess();
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el cliente");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDismiss = () => {
        Keyboard.dismiss();
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleDismiss}
        >
            <TouchableWithoutFeedback onPress={handleDismiss}>
                <View testID="modal-overlay" className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View className="bg-white p-4 rounded-lg w-4/5 max-h-[80%]">
                            <Text className="text-lg font-bold mb-4">Editar Usuario</Text>
                            <ScrollView>
                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Nombre</Text>
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Apellido</Text>
                                    <TextInput
                                        value={lastname}
                                        onChangeText={setLastname}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Email</Text>
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        className="border border-gray-300 rounded p-2"
                                        keyboardType="email-address"
                                        editable={!isLoading}
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Teléfono</Text>
                                    <TextInput
                                        value={phone}
                                        onChangeText={setPhone}
                                        className="border border-gray-300 rounded p-2"
                                        keyboardType="phone-pad"
                                        editable={!isLoading}
                                    />
                                </View>

                            </ScrollView>

                            <View className="flex-row justify-end gap-2 mt-4">
                                <Pressable
                                    onPress={handleDismiss}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                    disabled={isLoading}
                                >
                                    <Text>Cancelar</Text>
                                </Pressable>
                                <Pressable
                                    onPress={handleSave}
                                    className="bg-blue-500 px-4 py-2 rounded"
                                    disabled={isLoading}
                                >
                                    <Text className="text-white">
                                        {isLoading ? "Guardando..." : "Guardar"}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
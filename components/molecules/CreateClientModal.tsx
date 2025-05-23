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
import { createClient } from "@/services/clientsService";

interface CreateClientModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateClientModal({ visible, onClose, onSuccess }: CreateClientModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lastname, setLastname] = useState("");

    const handleCreate = async () => {
        if (!name || !id || !phone || !address || !email || !lastname) {
            Alert.alert("Error", "Por favor complete los campos obligatorios");
            return;
        }

        try {
            setIsLoading(true);
            const newClient = {
                name,
                lastname,
                email,
                phone,
                id,
                address
            };

            await createClient(newClient);
            Alert.alert("Éxito", "Cliente creado correctamente");
            onSuccess();
            setName("");
            setLastname("");
            setEmail("");
            setPhone("");
            setId("");
            setAddress("");
        } catch (error) {
            Alert.alert("Error", "No se pudo crear el cliente");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDismiss = () => {
        Keyboard.dismiss();
        setName("");
        setEmail("");
        setPhone("");
        setId("");
        setAddress("");
        setLastname("");
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
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View className="bg-white p-4 rounded-lg w-4/5 max-h-[80%]">
                            <Text className="text-lg font-bold mb-4">Crear Cliente</Text>
                            <ScrollView>
                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Nombre</Text>
                                    <TextInput
                                        value={name}
                                        onChangeText={setName}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                        placeholder="Ingrese el nombre"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Apellido</Text>
                                    <TextInput
                                        value={lastname}
                                        onChangeText={setLastname}
                                        className="border border-gray-300 rounded p-2"
                                        placeholder="Ingrese el apellido"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">ID</Text>
                                    <TextInput
                                        value={id}
                                        onChangeText={setId}
                                        className="border border-gray-300 rounded p-2"
                                        placeholder="Ingrese el ID"
                                        keyboardType="numeric"
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
                                        placeholder="Ingrese el email"
                                        autoCapitalize="none"
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
                                        placeholder="Ingrese el teléfono"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Dirección</Text>
                                    <TextInput
                                        value={address}
                                        onChangeText={setAddress}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                        placeholder="Ingrese la dirección"
                                        multiline
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
                                    onPress={handleCreate}
                                    className="bg-primary px-4 py-2 rounded"
                                    disabled={isLoading}
                                >
                                    <Text className="text-white">
                                        {isLoading ? "Creando..." : "Crear"}
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
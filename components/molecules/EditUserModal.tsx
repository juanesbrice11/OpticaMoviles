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
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import { MenuOption } from "@/components/atoms/MenuOption";

interface EditUserModalProps {
    visible: boolean;
    userData: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditUserModal({ visible, userData, onClose, onSuccess }: EditUserModalProps) {
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [role, setRole] = useState(userData.role);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const updatedUser = {
                ...userData,
                name,
                email,
                role,
            };

            await updateUser(String(userData.id), updatedUser);
            Alert.alert("Éxito", "Usuario actualizado correctamente");
            onSuccess();
        } catch (error) {
            Alert.alert("Error", "No se pudo actualizar el usuario");
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
                <View className="flex-1 justify-center items-center bg-black/50">
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
                                    <Text className="font-semibold mb-1">Rol</Text>
                                    <DropdownMenu
                                        visible={dropdownVisible}
                                        handleOpen={() => setDropdownVisible(true)}
                                        handleClose={() => setDropdownVisible(false)}
                                        trigger={
                                            <Pressable
                                                className="border border-gray-300 rounded p-2 bg-gray-50"
                                                onPress={() => setDropdownVisible(true)}
                                            >
                                                <Text>{role || "Seleccionar rol"}</Text>
                                            </Pressable>
                                        }
                                    >
                                        <MenuOption onSelect={() => { setRole("admin"); setDropdownVisible(false); }}>
                                            <Text>Admin</Text>
                                        </MenuOption>
                                        <MenuOption onSelect={() => { setRole("secretary"); setDropdownVisible(false); }}>
                                            <Text>Secretary</Text>
                                        </MenuOption>
                                    </DropdownMenu>
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
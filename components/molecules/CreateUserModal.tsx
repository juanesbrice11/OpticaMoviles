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
import { registerUser } from "@/services/usersService";
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import { MenuOption } from "@/components/atoms/MenuOption";

interface CreateUserModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateUserModal({ visible, onClose, onSuccess }: CreateUserModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleCreate = async () => {
        if (!name || !email || !password || !role || !id) {
            Alert.alert("Error", "Por favor complete todos los campos");
            return;
        }

        try {
            setIsLoading(true);
            const newUser = {
                name,
                email,
                password,
                role,
                id
            };

            await registerUser(newUser);
            Alert.alert("Éxito", "Usuario creado correctamente");
            onSuccess();
            setName("");
            setEmail("");
            setPassword("");
            setRole("");
        } catch (error) {
            Alert.alert("Error", "No se pudo crear el usuario");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDismiss = () => {
        Keyboard.dismiss();
        setName("");
        setEmail("");
        setPassword("");
        setRole("");
        setId("");
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
                            <Text className="text-lg font-bold mb-4">Crear Usuario</Text>
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
                                    <Text className="font-semibold mb-1">ID</Text>
                                    <TextInput
                                        value={id}
                                        onChangeText={setId}
                                        className="border border-gray-300 rounded p-2"
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
                                    <Text className="font-semibold mb-1">Contraseña</Text>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        className="border border-gray-300 rounded p-2"
                                        secureTextEntry
                                        editable={!isLoading}
                                        placeholder="Ingrese la contraseña"
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
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

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    id?: string;
}

export default function CreateUserModal({ visible, onClose, onSuccess }: CreateUserModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [id, setId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateName = (text: string) => {
        if (!text.trim()) {
            return 'El nombre es requerido';
        }
        if (!/^[A-Za-z\s]+$/.test(text)) {
            return 'El nombre solo puede contener letras y espacios';
        }
        if (text.length > 50) {
            return 'El nombre no puede tener más de 50 caracteres';
        }
        return '';
    };

    const validateEmail = (text: string) => {
        if (!text.trim()) {
            return 'El email es requerido';
        }
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(text)) {
            return 'El email debe tener un formato válido';
        }
        if (text.length > 255) {
            return 'El email no puede tener más de 255 caracteres';
        }
        return '';
    };

    const validatePassword = (text: string) => {
        if (!text.trim()) {
            return 'La contraseña es requerida';
        }
        if (text.length < 8) {
            return 'La contraseña debe tener al menos 8 caracteres';
        }
        if (text.length > 50) {
            return 'La contraseña no puede tener más de 50 caracteres';
        }
        return '';
    };

    const validateId = (text: string) => {
        if (!text.trim()) {
            return 'El ID es requerido';
        }
        if (!/^[A-Za-z0-9]+$/.test(text)) {
            return 'El ID solo puede contener letras y números';
        }
        if (text.length > 20) {
            return 'El ID no puede tener más de 20 caracteres';
        }
        return '';
    };

    const validateRole = (text: string) => {
        if (!text.trim()) {
            return 'El rol es requerido';
        }
        if (!['admin', 'secretary'].includes(text.toLowerCase())) {
            return 'El rol debe ser admin o secretary';
        }
        return '';
    };

    const handleInputChange = (field: string, value: string) => {
        let errorMessage = '';
        switch (field) {
            case 'name':
                errorMessage = validateName(value);
                setName(value);
                break;
            case 'email':
                errorMessage = validateEmail(value);
                setEmail(value);
                break;
            case 'password':
                errorMessage = validatePassword(value);
                setPassword(value);
                break;
            case 'id':
                errorMessage = validateId(value);
                setId(value);
                break;
            case 'role':
                errorMessage = validateRole(value);
                setRole(value);
                break;
        }

        setErrors(prev => ({
            ...prev,
            [field]: errorMessage
        }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        newErrors.name = validateName(name);
        newErrors.email = validateEmail(email);
        newErrors.password = validatePassword(password);
        newErrors.id = validateId(id);
        newErrors.role = validateRole(role);

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleCreate = async () => {
        if (!validateForm()) {
            Alert.alert('Error', 'Por favor corrija los errores en el formulario');
            return;
        }

        try {
            setIsLoading(true);
            const newUser = {
                name: name.trim(),
                email: email.trim(),
                password,
                role: role.toLowerCase(),
                id: id.trim()
            };

            await registerUser(newUser);
            Alert.alert("Éxito", "Usuario creado correctamente");
            onSuccess();
            handleDismiss();
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
        setErrors({});
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
                                        onChangeText={(text) => handleInputChange('name', text)}
                                        className={`border rounded p-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        editable={!isLoading}
                                        placeholder="Ingrese el nombre"
                                        maxLength={50}
                                    />
                                    {errors.name ? <Text className="text-red-500 text-sm mt-1">{errors.name}</Text> : null}
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">ID</Text>
                                    <TextInput
                                        value={id}
                                        onChangeText={(text) => handleInputChange('id', text)}
                                        className={`border rounded p-2 ${errors.id ? 'border-red-500' : 'border-gray-300'}`}
                                        editable={!isLoading}
                                        placeholder="Ingrese el ID"
                                        maxLength={20}
                                    />
                                    {errors.id ? <Text className="text-red-500 text-sm mt-1">{errors.id}</Text> : null}
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Email</Text>
                                    <TextInput
                                        value={email}
                                        onChangeText={(text) => handleInputChange('email', text)}
                                        className={`border rounded p-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        keyboardType="email-address"
                                        editable={!isLoading}
                                        placeholder="Ingrese el email"
                                        autoCapitalize="none"
                                        maxLength={255}
                                    />
                                    {errors.email ? <Text className="text-red-500 text-sm mt-1">{errors.email}</Text> : null}
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Contraseña</Text>
                                    <TextInput
                                        value={password}
                                        onChangeText={(text) => handleInputChange('password', text)}
                                        className={`border rounded p-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                        secureTextEntry
                                        editable={!isLoading}
                                        placeholder="Ingrese la contraseña"
                                        maxLength={50}
                                    />
                                    {errors.password ? <Text className="text-red-500 text-sm mt-1">{errors.password}</Text> : null}
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Rol</Text>
                                    <TextInput
                                        value={role}
                                        onChangeText={(text) => handleInputChange('role', text)}
                                        className={`border rounded p-2 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                                        editable={!isLoading}
                                        placeholder="admin o secretary"
                                        maxLength={10}
                                    />
                                    {errors.role ? <Text className="text-red-500 text-sm mt-1">{errors.role}</Text> : null}
                                </View>
                            </ScrollView>

                            <View className="flex-row justify-end space-x-2 mt-4">
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
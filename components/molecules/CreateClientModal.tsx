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

interface FormErrors {
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    id?: string;
    address?: string;
}

export default function CreateClientModal({ visible, onClose, onSuccess }: CreateClientModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [lastname, setLastname] = useState("");
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

    const validateLastname = (text: string) => {
        if (!text.trim()) {
            return 'El apellido es requerido';
        }
        if (!/^[A-Za-z\s]+$/.test(text)) {
            return 'El apellido solo puede contener letras y espacios';
        }
        if (text.length > 50) {
            return 'El apellido no puede tener más de 50 caracteres';
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

    const validatePhone = (text: string) => {
        if (!text.trim()) {
            return 'El teléfono es requerido';
        }
        if (!/^[0-9+\-\s()]+$/.test(text)) {
            return 'El teléfono solo puede contener números, +, -, (, ) y espacios';
        }
        if (text.length > 20) {
            return 'El teléfono no puede tener más de 20 caracteres';
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

    const validateAddress = (text: string) => {
        if (!text.trim()) {
            return 'La dirección es requerida';
        }
        if (text.length > 200) {
            return 'La dirección no puede tener más de 200 caracteres';
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
            case 'lastname':
                errorMessage = validateLastname(value);
                setLastname(value);
                break;
            case 'email':
                errorMessage = validateEmail(value);
                setEmail(value);
                break;
            case 'phone':
                errorMessage = validatePhone(value);
                setPhone(value);
                break;
            case 'id':
                errorMessage = validateId(value);
                setId(value);
                break;
            case 'address':
                errorMessage = validateAddress(value);
                setAddress(value);
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
        newErrors.lastname = validateLastname(lastname);
        newErrors.email = validateEmail(email);
        newErrors.phone = validatePhone(phone);
        newErrors.id = validateId(id);
        newErrors.address = validateAddress(address);

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
            const newClient = {
                name: name.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                phone: phone.trim(),
                id: id.trim(),
                address: address.trim()
            };

            await createClient(newClient);
            Alert.alert("Éxito", "Cliente creado correctamente");
            onSuccess();
            handleDismiss();
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
                            <Text className="text-lg font-bold mb-4">Crear Cliente</Text>
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
                                    <Text className="font-semibold mb-1">Apellido</Text>
                                    <TextInput
                                        value={lastname}
                                        onChangeText={(text) => handleInputChange('lastname', text)}
                                        className={`border rounded p-2 ${errors.lastname ? 'border-red-500' : 'border-gray-300'}`}
                                        editable={!isLoading}
                                        placeholder="Ingrese el apellido"
                                        maxLength={50}
                                    />
                                    {errors.lastname ? <Text className="text-red-500 text-sm mt-1">{errors.lastname}</Text> : null}
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
                                    <Text className="font-semibold mb-1">Teléfono</Text>
                                    <TextInput
                                        value={phone}
                                        onChangeText={(text) => handleInputChange('phone', text)}
                                        className={`border rounded p-2 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                        keyboardType="phone-pad"
                                        editable={!isLoading}
                                        placeholder="Ingrese el teléfono"
                                        maxLength={20}
                                    />
                                    {errors.phone ? <Text className="text-red-500 text-sm mt-1">{errors.phone}</Text> : null}
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Dirección</Text>
                                    <TextInput
                                        value={address}
                                        onChangeText={(text) => handleInputChange('address', text)}
                                        className={`border rounded p-2 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                        editable={!isLoading}
                                        placeholder="Ingrese la dirección"
                                        multiline
                                        maxLength={200}
                                    />
                                    {errors.address ? <Text className="text-red-500 text-sm mt-1">{errors.address}</Text> : null}
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
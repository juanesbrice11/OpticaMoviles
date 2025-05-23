import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { createSale } from '@/services/salesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { texttitle } from './tokens';

interface FormErrors {
    clientId?: string;
    glassesId?: string;
    total?: string;
    date?: string;
}

interface FormErrors {
    clientId?: string;
    glassesId?: string;
    total?: string;
    date?: string;
}

export default function CreateSaleScreen() {
    const [formData, setFormData] = useState({
        clientId: '',
        glassesId: '',
        total: '',
        date: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateClientId = (text: string) => {
        if (!text.trim()) {
            return 'El ID del cliente es requerido';
        }
        if (!/^[A-Za-z0-9]+$/.test(text)) {
            return 'El ID del cliente solo puede contener letras y números';
        }
        if (text.length > 20) {
            return 'El ID del cliente no puede tener más de 20 caracteres';
        }
        return '';
    };

    const validateGlassesId = (text: string) => {
        if (!text.trim()) {
            return 'El ID de las gafas es requerido';
        }
        const id = parseInt(text);
        if (isNaN(id)) {
            return 'El ID de las gafas debe ser un número válido';
        }
        if (id <= 0) {
            return 'El ID de las gafas debe ser mayor que 0';
        }
        return '';
    };

    const validateTotal = (text: string) => {
        if (!text.trim()) {
            return 'El total es requerido';
        }
        const total = parseFloat(text);
        if (isNaN(total)) {
            return 'El total debe ser un número válido';
        }
        if (total <= 0) {
            return 'El total debe ser mayor que 0';
        }
        return '';
    };

    const validateDate = (text: string) => {
        if (!text.trim()) {
            return 'La fecha es requerida';
        }
        if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) {
            return 'La fecha debe estar en formato YYYY-MM-DD';
        }
        const date = new Date(text);
        if (isNaN(date.getTime())) {
            return 'La fecha debe ser válida';
        }
        return '';
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        let errorMessage = '';

        switch (field) {
            case 'clientId':
                errorMessage = validateClientId(value);
                break;
            case 'glassesId':
                errorMessage = validateGlassesId(value);
                break;
            case 'total':
                errorMessage = validateTotal(value);
                break;
            case 'date':
                errorMessage = validateDate(value);
                break;
        }

        setErrors(prev => ({
            ...prev,
            [field]: errorMessage
        }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        
        newErrors.clientId = validateClientId(formData.clientId);
        newErrors.glassesId = validateGlassesId(formData.glassesId);
        newErrors.total = validateTotal(formData.total);
        newErrors.date = validateDate(formData.date);

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('Error', 'Por favor corrija los errores en el formulario');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const saleData = {
                clientId: formData.clientId.trim(),
                glassesId: parseInt(formData.glassesId),
                total: parseFloat(formData.total),
                date: formData.date
            };

            await createSale(saleData);
            Alert.alert('Éxito', 'Venta creada correctamente');
            router.replace('/home');
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'Error al crear la venta');
            Alert.alert('Error', 'No se pudo crear la venta. Por favor intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.replace('/home');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View className="items-center mb-4">
                        <Image
                            source={require("@/assets/images/top.png")}
                            className="w-full h-44"
                            resizeMode="cover"
                        />
                    </View>

                    <Text className={`${texttitle} text-center mb-4 text-2xl font-bold text-blue-600`}>
                        Crear nueva venta
                    </Text>

                    <View className="p-4 space-y-4">
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">ID del Cliente</Text>
                            <TextInput
                                className={`border rounded-xl p-3 shadow-sm bg-gray-50 ${errors.clientId ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.clientId}
                                onChangeText={(text) => handleInputChange('clientId', text)}
                                placeholder="Ingrese el ID del cliente"
                                placeholderTextColor="#9CA3AF"
                                maxLength={20}
                            />
                            {errors.clientId ? <Text className="text-red-500 text-sm mt-1">{errors.clientId}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">ID de Gafas</Text>
                            <TextInput
                                className={`border rounded-xl p-3 shadow-sm bg-gray-50 ${errors.glassesId ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.glassesId}
                                onChangeText={(text) => handleInputChange('glassesId', text)}
                                placeholder="Ingrese el ID de las gafas"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                                maxLength={10}
                            />
                            {errors.glassesId ? <Text className="text-red-500 text-sm mt-1">{errors.glassesId}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Total</Text>
                            <TextInput
                                className={`border rounded-xl p-3 shadow-sm bg-gray-50 ${errors.total ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.total}
                                onChangeText={(text) => handleInputChange('total', text)}
                                placeholder="Ingrese el total"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                                maxLength={10}
                            />
                            {errors.total ? <Text className="text-red-500 text-sm mt-1">{errors.total}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Fecha</Text>
                            <TextInput
                                className={`border rounded-xl p-3 shadow-sm bg-gray-50 ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.date}
                                onChangeText={(text) => handleInputChange('date', text)}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#9CA3AF"
                                maxLength={10}
                            />
                            {errors.date ? <Text className="text-red-500 text-sm mt-1">{errors.date}</Text> : null}
                        </View>

                        {error && (
                            <Text className="text-red-500 text-center">{error}</Text>
                        )}

                        <View className="flex-row space-x-4 mt-4">
                            <TouchableOpacity
                                onPress={handleCancel}
                                className="bg-gray-300 p-3 rounded-xl flex-1 items-center shadow"
                            >
                                <Text className="text-gray-700 font-bold">Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={loading}
                                className={`bg-blue-500 p-3 rounded-xl flex-1 items-center shadow ${loading ? 'opacity-50' : ''}`}
                            >
                                <Text className="text-white font-bold">
                                    {loading ? 'Creando...' : 'Crear Venta'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

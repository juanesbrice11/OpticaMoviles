import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { createSale } from '@/services/salesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { texttitile } from './tokens';

export default function CreateSaleScreen() {
    const [formData, setFormData] = useState({
        clientId: '',
        glassesId: '',
        total: '',
        date: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!formData.clientId || !formData.glassesId || !formData.total || !formData.date) {
                throw new Error('Todos los campos son requeridos');
            }

            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(formData.date)) {
                throw new Error('La fecha debe estar en formato YYYY-MM-DD');
            }

            const total = parseFloat(formData.total);
            if (isNaN(total)) {
                throw new Error('El total debe ser un número válido');
            }

            const saleData = {
                clientId: formData.clientId,
                glassesId: parseInt(formData.glassesId),
                total: total,
                date: formData.date
            };

            await createSale(saleData);
            router.replace('/home');
        } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'Error al crear la venta');
            Alert.alert('Error', err instanceof Error ? err.message : 'No se pudo crear la venta');
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

                    <Text className={`${texttitile} text-center mb-4 text-2xl font-bold text-blue-600`}>
                        Crear nueva venta
                    </Text>

                    <View className="p-6 space-y-5">
                        {/* Campo Cliente */}
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">ID del Cliente</Text>
                            <TextInput
                                className="border border-gray-300 rounded-xl p-3 shadow-sm bg-gray-50"
                                value={formData.clientId}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, clientId: text }))}
                                placeholder="Ingrese el ID del cliente"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        {/* Campo Gafas */}
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">ID de Gafas</Text>
                            <TextInput
                                className="border border-gray-300 rounded-xl p-3 shadow-sm bg-gray-50"
                                value={formData.glassesId}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, glassesId: text }))}
                                placeholder="Ingrese el ID de las gafas"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Campo Total */}
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Total</Text>
                            <TextInput
                                className="border border-gray-300 rounded-xl p-3 shadow-sm bg-gray-50"
                                value={formData.total}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, total: text }))}
                                placeholder="Ingrese el total"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Campo Fecha */}
                        <View>
                            <Text className="text-gray-700 mb-2 font-medium">Fecha</Text>
                            <TextInput
                                className="border border-gray-300 rounded-xl p-3 shadow-sm bg-gray-50"
                                value={formData.date}
                                onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>

                        {error && (
                            <Text className="text-red-500 text-center">{error}</Text>
                        )}

                        {/* Botones */}
                        <View className="flex-row justify-between space-x-4 pt-2">
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

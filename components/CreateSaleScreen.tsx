import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createSale } from '@/services/salesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { texttitile } from './tokens';

export default function CreateSaleScreen() {
    const [formData, setFormData] = useState({
        client: '',
        glasses: '',
        total: '',
        date: '',
        product_image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Error', 'Lo sentimos, necesitamos permisos para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prev => ({ ...prev, product_image: result.assets[0].uri }));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!formData.client || !formData.glasses || !formData.total || !formData.date || !formData.product_image) {
                throw new Error('Todos los campos son requeridos');
            }

            // Validar formato de fecha (YYYY-MM-DD)
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(formData.date)) {
                throw new Error('La fecha debe estar en formato YYYY-MM-DD');
            }

            const data = new FormData();
            
            // Convertir valores a números
            const clientId = parseInt(formData.client);
            const glassesId = parseInt(formData.glasses);
            const total = parseFloat(formData.total);

            if (isNaN(clientId) || isNaN(glassesId) || isNaN(total)) {
                throw new Error('Los campos numéricos deben ser válidos');
            }

            // Agregar los datos en el orden correcto
            data.append('client', clientId.toString());
            data.append('glasses', glassesId.toString());
            data.append('total', total.toString());
            data.append('date', formData.date);

            // Manejo de la imagen
            const imageData = {
                uri: formData.product_image,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };

            data.append('product_image', imageData as any);

            console.log('Datos a enviar:', {
                client: clientId,
                glasses: glassesId,
                total: total,
                date: formData.date,
                product_image: formData.product_image
            });

            await createSale(data);
            router.push('/sales');
        } catch (err) {
            console.error('Error completo:', JSON.stringify(err));
            setError(err instanceof Error ? err.message : 'Error al crear la venta');
            Alert.alert('Error', err instanceof Error ? err.message : 'No se pudo crear la venta. Verifica que todos los campos sean válidos.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/sales');
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="items-center mb-7">
                <Image
                    source={require("@/assets/images/top.png")}
                    className="w-full h-44"
                />
            </View>
            <Text className={`${texttitile}`}>
                Crear nueva venta
            </Text>

            <View className="p-4 space-y-4">
                <View>
                    <Text className="text-gray-600 mb-1">Cliente</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.client}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, client: text }))}
                        placeholder="Ingrese el ID del cliente"
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">ID de Gafas</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.glasses}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, glasses: text }))}
                        placeholder="Ingrese el ID de las gafas"
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Total</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.total}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, total: text }))}
                        placeholder="Ingrese el total"
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Fecha</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.date}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
                        placeholder="YYYY-MM-DD"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Imagen</Text>
                    <TouchableOpacity
                        onPress={pickImage}
                        className="border border-gray-300 rounded-lg p-2 items-center"
                    >
                        {formData.product_image ? (
                            <Image
                                source={{ uri: formData.product_image }}
                                className="w-32 h-32 rounded-lg"
                            />
                        ) : (
                            <Text>Seleccionar imagen</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {error && (
                    <Text className="text-red-500 text-center">{error}</Text>
                )}

                <View className="flex-row justify-between space-x-4">
                    <TouchableOpacity
                        onPress={handleCancel}
                        className="bg-gray-300 p-3 rounded-lg flex-1 items-center"
                    >
                        <Text className="text-gray-700 font-bold">Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-500 p-3 rounded-lg flex-1 items-center ${loading ? 'opacity-50' : ''}`}
                    >
                        <Text className="text-white font-bold">
                            {loading ? 'Creando...' : 'Crear Venta'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
} 
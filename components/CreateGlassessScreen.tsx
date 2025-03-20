import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createGlasses } from '@/services/glassesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { texttitile } from './tokens';



export default function CreateGlassesScreen() {
    const [formData, setFormData] = useState({
        marca: '',
        imagen: '',
        precio: '',
        material: '',
        stock: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        if (!result.canceled) {
            const base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
            setFormData(prev => ({ ...prev, imagen: base64Image }));
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            if (!formData.marca || !formData.imagen || !formData.precio || !formData.material || !formData.stock) {
                throw new Error('Todos los campos son requeridos');
            }

            const glassesData = {
                marca: formData.marca,
                imagen: formData.imagen,
                precio: Number(formData.precio),
                material: formData.material,
                stock: Number(formData.stock)
            };

            await createGlasses(glassesData);
            router.push('/home');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear la gafa');
        } finally {
            setLoading(false);
        }
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
                Crear nueva gafa
            </Text>

            <View className="p-4 space-y-4">
                <View>
                    <Text className="text-gray-600 mb-1">Marca</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.marca}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, marca: text }))}
                        placeholder="Ingrese la marca"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Imagen</Text>
                    <TouchableOpacity
                        onPress={pickImage}
                        className="border border-gray-300 rounded-lg p-2 items-center"
                    >
                        {formData.imagen ? (
                            <Image
                                source={{ uri: formData.imagen }}
                                className="w-32 h-32 rounded-lg"
                            />
                        ) : (
                            <Text>Seleccionar imagen</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Precio</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.precio}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, precio: text }))}
                        placeholder="Ingrese el precio"
                        keyboardType="numeric"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Material</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.material}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, material: text }))}
                        placeholder="Ingrese el material"
                    />
                </View>

                <View>
                    <Text className="text-gray-600 mb-1">Stock</Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2"
                        value={formData.stock}
                        onChangeText={(text) => setFormData(prev => ({ ...prev, stock: text }))}
                        placeholder="Ingrese el stock"
                        keyboardType="numeric"
                    />
                </View>

                {error && (
                    <Text className="text-red-500">{error}</Text>
                )}

                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    className={`bg-blue-500 p-3 rounded-lg items-center ${loading ? 'opacity-50' : ''}`}
                >
                    <Text className="text-white font-bold">
                        {loading ? 'Creando...' : 'Crear Gafa'}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

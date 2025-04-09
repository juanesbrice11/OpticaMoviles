import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createGlasses } from '@/services/glassesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { acceptbutton, cancelbutton, texttitile } from './tokens';
import { createGlassesSchema, CreateGlassesSchema } from '@/types/schemas';
import { z } from 'zod';

interface FormErrors {
    marca?: string;
    precio?: string;
    material?: string;
    stock?: string;
    imagen?: string;
}

export default function CreateGlassesScreen() {
    const [formData, setFormData] = useState({
        marca: '',
        imagen: '',
        precio: '',
        material: '',
        stock: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateMarca = (text: string) => {
        try {
            createGlassesSchema.shape.marca.parse(text);
            return '';
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.errors[0].message;
            }
            return 'Error de validación';
        }
    };

    const validateField = (name: keyof CreateGlassesSchema, value: string) => {
        try {
            createGlassesSchema.shape[name].parse(value);
            return '';
        } catch (error) {
            if (error instanceof z.ZodError) {
                return error.errors[0].message;
            }
            return 'Error de validación';
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        let errorMessage = '';
        if (field === 'marca') {
            errorMessage = validateMarca(value);
        } else {
            errorMessage = validateField(field as keyof CreateGlassesSchema, value);
        }
        
        setErrors(prev => ({
            ...prev,
            [field]: errorMessage
        }));
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            alert('Lo sentimos, necesitamos permisos para acceder a la galería');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData(prev => ({ ...prev, imagen: result.assets[0].uri }));
            setErrors(prev => ({ ...prev, imagen: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        
        newErrors.marca = validateMarca(formData.marca);
        newErrors.material = validateField('material', formData.material);
        newErrors.precio = validateField('precio', formData.precio);
        newErrors.stock = validateField('stock', formData.stock);
        if (!formData.imagen) {
            newErrors.imagen = 'La imagen es requerida';
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = new FormData();
            data.append('marca', formData.marca.trim());
            data.append('precio', formData.precio);
            data.append('material', formData.material.trim());
            data.append('stock', formData.stock);

            const uriParts = formData.imagen.split('.');
            const fileType = uriParts[uriParts.length - 1];
            
            data.append('imagen', {
                uri: formData.imagen,
                type: 'image/jpeg',
                name: 'photo.jpg',
            } as any);

            await createGlasses(data);
            router.push('/home');
        } catch (err) {
            console.error('Error completo:', JSON.stringify(err));
            setError('Error al crear la gafa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView>
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
                                className={`border rounded-lg p-2 ${errors.marca ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.marca}
                                onChangeText={(text) => handleInputChange('marca', text)}
                                placeholder="Ingrese la marca"
                                maxLength={50}
                            />
                            {errors.marca ? <Text className="text-red-500 text-sm">{errors.marca}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-1">Imagen</Text>
                            <TouchableOpacity
                                onPress={pickImage}
                                className={`border rounded-lg p-2 items-center ${errors.imagen ? 'border-red-500' : 'border-gray-300'}`}
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
                            {errors.imagen ? <Text className="text-red-500 text-sm">{errors.imagen}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-1">Precio</Text>
                            <TextInput
                                className={`border rounded-lg p-2 ${errors.precio ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.precio}
                                onChangeText={(text) => handleInputChange('precio', text)}
                                placeholder="Ingrese el precio"
                                keyboardType="numeric"
                                maxLength={50}
                            />
                            {errors.precio ? <Text className="text-red-500 text-sm">{errors.precio}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-1">Material</Text>
                            <TextInput
                                className={`border rounded-lg p-2 ${errors.material ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.material}
                                onChangeText={(text) => handleInputChange('material', text)}
                                placeholder="Ingrese el material"
                                maxLength={50}
                            />
                            {errors.material ? <Text className="text-red-500 text-sm">{errors.material}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-1">Stock</Text>
                            <TextInput
                                className={`border rounded-lg p-2 ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.stock}
                                onChangeText={(text) => handleInputChange('stock', text)}
                                placeholder="Ingrese el stock"
                                keyboardType="numeric"
                                maxLength={50}
                            />
                            {errors.stock ? <Text className="text-red-500 text-sm">{errors.stock}</Text> : null}
                        </View>

                        {error && (
                            <Text className="text-red-500">{error}</Text>
                        )}

                        <View className="flex-row w-11/12 mt-4 justify-end gap-2">
                            <TouchableOpacity
                                onPress={() => router.push('/home')}
                                className={cancelbutton}
                            >
                                <Text className="text-white font-bold text-center">
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={loading}
                                className={`${acceptbutton} ${loading ? 'opacity-50' : ''}`}
                            >
                                <Text className="text-white font-bold text-center">
                                    {loading ? 'Creando...' : 'Crear'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

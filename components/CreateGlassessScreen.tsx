import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createGlasses } from '@/services/glassesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { acceptbutton, cancelbutton, texttitle } from './tokens';
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
        if (!text.trim()) {
            return 'La marca es requerida';
        }
        if (!/^[A-Za-z0-9\s\-]+$/.test(text)) {
            return 'La marca solo puede contener letras, números, espacios y guiones';
        }
        if (text.length > 50) {
            return 'La marca no puede tener más de 50 caracteres';
        }
        return '';
    };

    const validateMaterial = (text: string) => {
        if (!text.trim()) {
            return 'El material es requerido';
        }
        if (!/^[A-Za-z0-9\s\-]+$/.test(text)) {
            return 'El material solo puede contener letras, números, espacios y guiones';
        }
        if (text.length > 50) {
            return 'El material no puede tener más de 50 caracteres';
        }
        return '';
    };

    const validatePrecio = (text: string) => {
        if (!text.trim()) {
            return 'El precio es requerido';
        }
        const precio = parseFloat(text);
        if (isNaN(precio)) {
            return 'El precio debe ser un número válido';
        }
        if (precio < 0) {
            return 'El precio no puede ser negativo';
        }
        return '';
    };

    const validateStock = (text: string) => {
        if (!text.trim()) {
            return 'El stock es requerido';
        }
        const stock = parseInt(text);
        if (isNaN(stock)) {
            return 'El stock debe ser un número entero válido';
        }
        if (stock < 0) {
            return 'El stock no puede ser negativo';
        }
        return '';
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        let errorMessage = '';

        switch (field) {
            case 'marca':
                errorMessage = validateMarca(value);
                break;
            case 'material':
                errorMessage = validateMaterial(value);
                break;
            case 'precio':
                errorMessage = validatePrecio(value);
                break;
            case 'stock':
                errorMessage = validateStock(value);
                break;
        }

        setErrors(prev => ({
            ...prev,
            [field]: errorMessage
        }));
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Error', 'Necesitamos permisos para acceder a la galería');
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
        newErrors.material = validateMaterial(formData.material);
        newErrors.precio = validatePrecio(formData.precio);
        newErrors.stock = validateStock(formData.stock);
        
        if (!formData.imagen) {
            newErrors.imagen = 'La imagen es requerida';
        }

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
            Alert.alert('Éxito', 'Gafa creada correctamente');
            router.push('/home');
        } catch (err) {
            console.error('Error completo:', JSON.stringify(err));
            setError('Error al crear la gafa');
            Alert.alert('Error', 'No se pudo crear la gafa. Por favor intente nuevamente.');
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
                    <Text className={`${texttitle}`}>
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
                                maxLength={10}
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
                                maxLength={10}
                            />
                            {errors.stock ? <Text className="text-red-500 text-sm">{errors.stock}</Text> : null}
                        </View>

                        {error && (
                            <Text className="text-red-500 text-center">{error}</Text>
                        )}

                        <View className="flex-row space-x-4">
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

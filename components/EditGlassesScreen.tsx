import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, KeyboardAvoidingView, ScrollView, Modal, FlatList, TouchableWithoutFeedback } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { updateGlasses } from '@/services/glassesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { acceptbutton, cancelbutton, texttitle } from './tokens';
import { createGlassesSchema, CreateGlassesSchema } from '@/types/schemas';
import { z } from 'zod';

interface FormErrors {
    marca?: string;
    precio?: string;
    material?: string;
    stock?: string;
}

const MARCAS = [
    'RayBan',
    'Oakley',
    'Gucci',
    'Tommy Hilfiger',
    'Prada',
    'Michael Kors',
    'Carrera',
    'Persol',
    'Maui Jim',
    'Warby Parker'
];

const MATERIALES = [
    'Acetato',
    'Metal',
    'Titanio',
    'Plástico',
    'Madera',
    'Fibra de carbono',
    'Aluminio',
    'Acero inoxidable'
];

export default function EditGlassesScreen() {
    const params = useLocalSearchParams();
    const [formData, setFormData] = useState({
        marca: '',
        precio: '',
        material: '',
        stock: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [marcaModalVisible, setMarcaModalVisible] = useState(false);
    const [materialModalVisible, setMaterialModalVisible] = useState(false);

    useEffect(() => {
        // Aquí deberías cargar los datos de la gafa usando el ID de los params
        // Por ahora usamos datos de ejemplo
        setFormData({
            marca: 'RayBan',
            precio: '100',
            material: 'Metal',
            stock: '10'
        });
    }, []);

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

    const validateForm = () => {
        const newErrors: FormErrors = {};
        
        newErrors.marca = validateMarca(formData.marca);
        newErrors.material = validateField('material', formData.material);
        newErrors.precio = validateField('precio', formData.precio);
        newErrors.stock = validateField('stock', formData.stock);

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

            await updateGlasses(Number(params.id), data);
            router.replace('/home');
        } catch (err) {
            console.error('Error completo:', JSON.stringify(err));
            setError('Error al actualizar la gafa');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <View className="items-center">
                <Image
                    source={require("@/assets/images/top.png")}
                    className="w-full h-44"
                />
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView keyboardShouldPersistTaps="handled" className="px-6">
                    <Text className={`${texttitle} mb-6`}>
                        Editar gafa
                    </Text>

                    <View className="space-y-6">
                        <View>
                            <Text className="text-gray-600 mb-2 text-base font-medium">Marca</Text>
                            <TouchableOpacity
                                className={`border rounded-lg p-3 ${errors.marca ? 'border-red-500' : 'border-gray-300'}`}
                                onPress={() => setMarcaModalVisible(true)}
                            >
                                <Text className={formData.marca ? 'text-black text-base' : 'text-gray-400 text-base'}>
                                    {formData.marca || 'Seleccione una marca'}
                                </Text>
                            </TouchableOpacity>
                            {errors.marca ? <Text className="text-red-500 text-sm mt-1">{errors.marca}</Text> : null}
                        </View>

                        <Modal
                            visible={marcaModalVisible}
                            transparent
                            animationType="fade"
                        >
                            <TouchableWithoutFeedback onPress={() => setMarcaModalVisible(false)}>
                                <View className="flex-1 bg-black/30 justify-center items-center">
                                    <View className="bg-white rounded-lg p-4 w-4/5 max-h-96">
                                        <Text className="text-lg font-bold mb-4">Selecciona una marca</Text>
                                        <FlatList
                                            data={MARCAS}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    className="py-3 border-b border-gray-100"
                                                    onPress={() => {
                                                        handleInputChange('marca', item);
                                                        setMarcaModalVisible(false);
                                                    }}
                                                >
                                                    <Text className="text-base">{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <View className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <Text className="text-gray-600 mb-2 text-base font-medium">Imagen</Text>
                            <Text className="text-gray-500 italic">Selección de imagen disponible próximamente</Text>
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-2 text-base font-medium">Precio</Text>
                            <TextInput
                                className={`border rounded-lg p-3 text-base ${errors.precio ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.precio}
                                onChangeText={(text) => handleInputChange('precio', text)}
                                placeholder="Ingrese el precio"
                                keyboardType="numeric"
                                maxLength={50}
                            />
                            {errors.precio ? <Text className="text-red-500 text-sm mt-1">{errors.precio}</Text> : null}
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-2 text-base font-medium">Material</Text>
                            <TouchableOpacity
                                className={`border rounded-lg p-3 ${errors.material ? 'border-red-500' : 'border-gray-300'}`}
                                onPress={() => setMaterialModalVisible(true)}
                            >
                                <Text className={formData.material ? 'text-black text-base' : 'text-gray-400 text-base'}>
                                    {formData.material || 'Seleccione un material'}
                                </Text>
                            </TouchableOpacity>
                            {errors.material ? <Text className="text-red-500 text-sm mt-1">{errors.material}</Text> : null}
                        </View>

                        <Modal
                            visible={materialModalVisible}
                            transparent
                            animationType="fade"
                        >
                            <TouchableWithoutFeedback onPress={() => setMaterialModalVisible(false)}>
                                <View className="flex-1 bg-black/30 justify-center items-center">
                                    <View className="bg-white rounded-lg p-4 w-4/5 max-h-96">
                                        <Text className="text-lg font-bold mb-4">Selecciona un material</Text>
                                        <FlatList
                                            data={MATERIALES}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    className="py-3 border-b border-gray-100"
                                                    onPress={() => {
                                                        handleInputChange('material', item);
                                                        setMaterialModalVisible(false);
                                                    }}
                                                >
                                                    <Text className="text-base">{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                        <View>
                            <Text className="text-gray-600 mb-2 text-base font-medium">Stock</Text>
                            <TextInput
                                className={`border rounded-lg p-3 text-base ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                                value={formData.stock}
                                onChangeText={(text) => handleInputChange('stock', text)}
                                placeholder="Ingrese el stock"
                                keyboardType="numeric"
                                maxLength={50}
                            />
                            {errors.stock ? <Text className="text-red-500 text-sm mt-1">{errors.stock}</Text> : null}
                        </View>

                        {error && (
                            <Text className="text-red-500 text-center">{error}</Text>
                        )}

                        <View className="flex-row justify-end gap-4 mt-8 mb-6">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className={`${cancelbutton} min-w-[120px] py-3.5`}
                                disabled={loading}
                            >
                                <Text className="text-white font-bold text-base text-center">Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleSubmit}
                                disabled={loading}
                                className={`${acceptbutton} min-w-[120px] py-3.5 ${loading ? 'opacity-50' : ''}`}
                            >
                                <Text className="text-white font-bold text-base text-center">
                                    {loading ? 'Actualizando...' : 'Actualizar'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
} 
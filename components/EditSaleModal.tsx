import React, { useState, useEffect } from 'react';
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
} from 'react-native';
import { updateSale } from '@/services/salesService';

interface EditSaleModalProps {
    visible: boolean;
    sale: {
        id: number;
        clientId: string;
        glassesId: number;
        total: number;
        date: string;
    };
    onClose: () => void;
    onSuccess: () => void;
}

export default function EditSaleModal({ visible, sale, onClose, onSuccess }: EditSaleModalProps) {
    const [formData, setFormData] = useState({
        clientId: sale.clientId,
        glassesId: sale.glassesId.toString(),
        total: sale.total.toString(),
        date: sale.date
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (visible) {
            setFormData({
                clientId: sale.clientId,
                glassesId: sale.glassesId.toString(),
                total: sale.total.toString(),
                date: sale.date
            });
        }
    }, [visible, sale]);

    const handleSave = async () => {
        try {
            setIsLoading(true);

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

            const updateData = {
                clientId: formData.clientId,
                glassesId: parseInt(formData.glassesId),
                total: total,
                date: formData.date
            };

            await updateSale(sale.id, updateData);
            Alert.alert("Éxito", "Venta actualizada correctamente");
            onSuccess();
        } catch (err) {
            Alert.alert("Error", err instanceof Error ? err.message : "No se pudo actualizar la venta");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDismiss = () => {
        Keyboard.dismiss();
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
                            <Text className="text-lg font-bold mb-4">Editar Venta</Text>
                            <ScrollView>
                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">ID del Cliente</Text>
                                    <TextInput
                                        value={formData.clientId}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, clientId: text }))}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">ID de Gafas</Text>
                                    <TextInput
                                        value={formData.glassesId}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, glassesId: text }))}
                                        className="border border-gray-300 rounded p-2"
                                        keyboardType="numeric"
                                        editable={!isLoading}
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Total</Text>
                                    <TextInput
                                        value={formData.total}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, total: text }))}
                                        className="border border-gray-300 rounded p-2"
                                        keyboardType="numeric"
                                        editable={!isLoading}
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Fecha</Text>
                                    <TextInput
                                        value={formData.date}
                                        onChangeText={(text) => setFormData(prev => ({ ...prev, date: text }))}
                                        className="border border-gray-300 rounded p-2"
                                        placeholder="YYYY-MM-DD"
                                        editable={!isLoading}
                                    />
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
                                    onPress={handleSave}
                                    className="bg-blue-500 px-4 py-2 rounded"
                                    disabled={isLoading}
                                >
                                    <Text className="text-white">
                                        {isLoading ? "Guardando..." : "Guardar"}
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
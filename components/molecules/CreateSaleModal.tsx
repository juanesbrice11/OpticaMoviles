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
    Platform,
    TouchableOpacity,
} from "react-native";
import { createSale } from "@/services/salesService";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { createLocalSale } from "@/services/localSalesService";

interface CreateSaleModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CreateSaleModal({ visible, onClose, onSuccess }: CreateSaleModalProps) {
    const [clientId, setClientId] = useState("");
    const [glassesId, setGlassesId] = useState("");
    const [total, setTotal] = useState("");
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = async () => {
        if (!clientId || !glassesId || !total || !date) {
            Alert.alert("Error", "Por favor complete todos los campos");
            return;
        }

        try {
            setIsLoading(true);
            const saleData = {
                clientId,
                glassesId: parseInt(glassesId),
                total: parseFloat(total),
                date: date.toISOString().split('T')[0]
            };

            await createLocalSale(saleData);
            Alert.alert("Éxito", "Venta creada correctamente");
            onSuccess();
            resetForm();
        } catch (error) {
            Alert.alert("Error", "No se pudo crear la venta");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setClientId("");
        setGlassesId("");
        setTotal("");
        setDate(new Date());
        setShowDatePicker(false);
    };

    const handleDismiss = () => {
        Keyboard.dismiss();
        resetForm();
        onClose();
    };

    const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            const date = new Date(selectedDate);
            date.setHours(12, 0, 0, 0);
            setDate(date);
        }
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
                            <Text className="text-lg font-bold mb-4">Crear Venta</Text>
                            <ScrollView>
                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">ID del Cliente</Text>
                                    <TextInput
                                        value={clientId}
                                        onChangeText={setClientId}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                        placeholder="Ingrese el ID del cliente"
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">ID de las Gafas</Text>
                                    <TextInput
                                        value={glassesId}
                                        onChangeText={setGlassesId}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                        placeholder="Ingrese el ID de las gafas"
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Total</Text>
                                    <TextInput
                                        value={total}
                                        onChangeText={setTotal}
                                        className="border border-gray-300 rounded p-2"
                                        editable={!isLoading}
                                        placeholder="Ingrese el total"
                                        keyboardType="numeric"
                                    />
                                </View>

                                <View className="mb-4">
                                    <Text className="font-semibold mb-1">Fecha</Text>
                                    <Pressable 
                                        onPress={() => setShowDatePicker(true)}
                                        className="border border-gray-300 rounded p-2"
                                    >
                                        <Text>{date.toLocaleDateString('es-ES', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</Text>
                                    </Pressable>

                                    {showDatePicker && (
                                        <View className="items-center w-full">
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                mode="date"
                                                is24Hour={true}
                                                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                                onChange={onDateChange}
                                                locale="es"
                                                maximumDate={new Date()}
                                                style={{ 
                                                    width: Platform.OS === 'ios' ? 320 : undefined,
                                                    height: Platform.OS === 'ios' ? 250 : undefined,
                                                    transform: Platform.OS === 'ios' ? [{ scale: 0.75 }] : undefined,
                                                    alignSelf: 'center',
                                                    marginTop: 10
                                                }}
                                                themeVariant="light"
                                            />
                                            {Platform.OS === 'ios' && (
                                                <Pressable 
                                                    onPress={() => setShowDatePicker(false)}
                                                    className="bg-primary py-2 px-4 rounded mt-2 w-full"
                                                >
                                                    <Text className="text-white text-center">Aceptar</Text>
                                                </Pressable>
                                            )}
                                        </View>
                                    )}
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
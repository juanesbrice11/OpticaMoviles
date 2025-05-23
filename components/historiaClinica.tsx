import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { ClientBd } from "@/types/api";
import { createClinicalHistory } from "@/services/clinicalHistory";
import { useRouter } from "expo-router";
import { cancelbutton, acceptbutton } from "./tokens";
import ClientSearchBar from "./molecules/ClientSearchBar";

interface FormErrors {
    clientId?: string;
    av?: string[];
    sc?: string[];
    cc?: string[];
    ae?: string[];
}

const initialRows = [
    { category: "Visión Lejana", values: { SC: "", CC: "", AE: "" } },
    { category: "Visión Cercana", values: { SC: "", CC: "", AE: "" } }
];

const HistoriaClinica = () => {
    const router = useRouter();
    const [selectedClient, setSelectedClient] = useState<ClientBd | null>(null);
    const [rows, setRows] = useState(initialRows);
    const [errors, setErrors] = useState<FormErrors>({});

    const validateVisionValue = (value: string) => {
        if (!value.trim()) {
            return 'Este campo es requerido';
        }
        if (!/^[0-9.]+$/.test(value)) {
            return 'Solo se permiten números y punto decimal';
        }
        const num = parseFloat(value);
        if (isNaN(num)) {
            return 'Debe ser un número válido';
        }
        if (num < 0 || num > 20) {
            return 'El valor debe estar entre 0 y 20';
        }
        return '';
    };

    const handleInputChange = (category: string, field: "SC" | "CC" | "AE", value: string) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.category === category ? { ...row, values: { ...row.values, [field]: value } } : row
            )
        );

        // Validar el valor ingresado
        const error = validateVisionValue(value);
        setErrors(prev => ({
            ...prev,
            [field.toLowerCase()]: rows.map(row => 
                row.category === category ? error : ''
            )
        }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        let hasErrors = false;

        // Validar ID del cliente
        if (!selectedClient) {
            newErrors.clientId = 'Debe seleccionar un cliente';
            hasErrors = true;
        }

        // Validar valores de visión
        const visionErrors = {
            sc: [] as string[],
            cc: [] as string[],
            ae: [] as string[]
        };

        rows.forEach(row => {
            const scError = validateVisionValue(row.values.SC);
            const ccError = validateVisionValue(row.values.CC);
            const aeError = validateVisionValue(row.values.AE);

            visionErrors.sc.push(scError);
            visionErrors.cc.push(ccError);
            visionErrors.ae.push(aeError);

            if (scError || ccError || aeError) {
                hasErrors = true;
            }
        });

        newErrors.sc = visionErrors.sc;
        newErrors.cc = visionErrors.cc;
        newErrors.ae = visionErrors.ae;

        setErrors(newErrors);
        return !hasErrors;
    };

    const onSubmit = async () => {
        if (!validateForm()) {
            Alert.alert('Error', 'Por favor corrija los errores en el formulario');
            return;
        }

        try {
            const historyData = {
                id_client: selectedClient!.id,
                av: rows.map(row => row.values.SC),
                sc: rows.map(row => row.values.CC),
                cc: rows.map(row => row.values.AE),
                ae: rows.map(row => row.values.AE),
            };

            await createClinicalHistory(historyData);
            Alert.alert("Éxito", "Historia clínica guardada exitosamente");
            router.replace("/home");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            Alert.alert("Error", "No se pudo guardar la historia clínica. Por favor intente nuevamente.");
        }
    };

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            className="flex-1 bg-white"
        >
            <View className="items-center absolute top-0 left-0 right-0 z-10">
                <Image source={require("@/assets/images/top.png")} className="w-full h-44" />
            </View>

            {!selectedClient ? (
                <View className="flex-1 mt-44">
                    <View className="flex-1 px-4">
                        <Text className="text-2xl font-bold text-center mb-4 text-primary">Seleccionar Cliente</Text>
                        
                        <ClientSearchBar 
                            onSelectClient={setSelectedClient}
                            selectedClient={selectedClient}
                        />
                    </View>
                </View>
            ) : (
                <ScrollView className="flex-1 mt-44" contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="flex-1">
                        <View className="flex-1 px-4">
                            <Text className="text-2xl font-bold text-center mb-4 text-primary">Seleccionar Cliente</Text>
                            
                            <ClientSearchBar 
                                onSelectClient={setSelectedClient}
                                selectedClient={selectedClient}
                            />

                            <Text className="text-2xl font-bold text-center my-4 text-primary">Historia Clínica</Text>
                            <View className="space-y-6">
                                {rows.map((row, index) => (
                                    <View key={index} className="mb-6">
                                        <Text className="text-xl font-bold mb-4 text-primary">{row.category}</Text>
                                        <View className="space-y-4">
                                            <View>
                                                <Text className="text-gray-600 mb-1">SC (Sin Corrección)</Text>
                                                <TextInput
                                                    className={`border rounded-lg p-3 bg-white ${errors.sc?.[index] ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={row.values.SC}
                                                    onChangeText={(text) => handleInputChange(row.category, "SC", text)}
                                                    keyboardType="numeric"
                                                    placeholder="Ej: 20/20"
                                                />
                                                {errors.sc?.[index] && (
                                                    <Text className="text-red-500 text-sm mt-1">{errors.sc[index]}</Text>
                                                )}
                                            </View>

                                            <View>
                                                <Text className="text-gray-600 mb-1">CC (Con Corrección)</Text>
                                                <TextInput
                                                    className={`border rounded-lg p-3 bg-white ${errors.cc?.[index] ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={row.values.CC}
                                                    onChangeText={(text) => handleInputChange(row.category, "CC", text)}
                                                    keyboardType="numeric"
                                                    placeholder="Ej: 20/20"
                                                />
                                                {errors.cc?.[index] && (
                                                    <Text className="text-red-500 text-sm mt-1">{errors.cc[index]}</Text>
                                                )}
                                            </View>

                                            <View>
                                                <Text className="text-gray-600 mb-1">AE (Añadido Esférico)</Text>
                                                <TextInput
                                                    className={`border rounded-lg p-3 bg-white ${errors.ae?.[index] ? 'border-red-500' : 'border-gray-300'}`}
                                                    value={row.values.AE}
                                                    onChangeText={(text) => handleInputChange(row.category, "AE", text)}
                                                    keyboardType="numeric"
                                                    placeholder="Ej: +2.00"
                                                />
                                                {errors.ae?.[index] && (
                                                    <Text className="text-red-500 text-sm mt-1">{errors.ae[index]}</Text>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                ))}

                                <View className="flex-row justify-between mb-8 mt-4">
                                    <TouchableOpacity
                                        className={`${cancelbutton} flex-1 mr-2`}
                                        onPress={() => router.back()}
                                    >
                                        <Text className="text-white font-bold text-center">Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className={`${acceptbutton} flex-1 ml-2`}
                                        onPress={onSubmit}
                                    >
                                        <Text className="text-white font-bold text-center">Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    );
};

export default HistoriaClinica;
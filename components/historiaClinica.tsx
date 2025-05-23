import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { ClientBd } from "@/types/api";
import { getClients } from "@/services/clientsService";
import { createClinicalHistory } from "@/services/clinicalHistory";
import { useRouter } from "expo-router";
import { cancelbutton, acceptbutton } from "./tokens";

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
    const [clientId, setClientId] = useState("");
    const [selectedClient, setSelectedClient] = useState<ClientBd | null>(null);
    const [clients, setClients] = useState<ClientBd[]>([]);
    const [rows, setRows] = useState(initialRows);
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const apiClients = await getClients();
                setClients(apiClients);
            } catch (error) {
                console.error("Error al cargar clientes:", error);
                Alert.alert("Error", "No se pudieron cargar los clientes");
            } finally {
                setIsLoading(false);
            }
        };
        fetchClients();
    }, []);

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

    const handleSearch = () => {
        const error = validateClientId(clientId);
        if (error) {
            setErrors(prev => ({ ...prev, clientId: error }));
            return;
        }

        const foundClient = clients.find(client => client.id === clientId);
        if (foundClient) {
            setSelectedClient(foundClient);
            setErrors(prev => ({ ...prev, clientId: '' }));
        } else {
            Alert.alert("Cliente no encontrado", "Verifique el ID ingresado");
            setSelectedClient(null);
            setErrors(prev => ({ ...prev, clientId: 'Cliente no encontrado' }));
        }
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
            [field.toLowerCase()]: prevRows.map(row => 
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

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#1769AA" />
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
            <View className="flex-1 bg-white relative">
                <View className="items-center">
                    <Image source={require("@/assets/images/top.png")} className="w-full h-44" />
                </View>

                <Text className="text-2xl font-bold text-center mb-4 text-primary">Buscar Cliente</Text>
                <View className="mx-6">
                    <TextInput
                        className={`border rounded p-2 bg-white ${errors.clientId ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Ingrese el ID del cliente"
                        value={clientId}
                        onChangeText={(text) => {
                            setClientId(text);
                            setErrors(prev => ({ ...prev, clientId: validateClientId(text) }));
                        }}
                        maxLength={20}
                    />
                    {errors.clientId ? <Text className="text-red-500 text-sm mt-1">{errors.clientId}</Text> : null}
                    <TouchableOpacity className="bg-primary py-2 rounded-lg mt-2 items-center mx-10" onPress={handleSearch}>
                        <Text className="text-white font-bold">Buscar</Text>
                    </TouchableOpacity>
                </View>

                {selectedClient && (
                    <Text className="text-lg font-bold text-center my-2 text-gray-700">
                        Cliente: {selectedClient.name} {selectedClient.lastname}
                    </Text>
                )}

                <Text className="text-2xl font-bold text-center my-4 text-primary">Historia Clínica</Text>

                <ScrollView className="px-4">
                    {rows.map((row, index) => (
                        <View key={row.category} className="mb-6">
                            <Text className="text-lg font-semibold mb-2">{row.category}</Text>
                            
                            <View className="space-y-2">
                                <View>
                                    <Text className="text-gray-600 mb-1">SC</Text>
                                    <TextInput
                                        className={`border rounded p-2 ${errors.sc?.[index] ? 'border-red-500' : 'border-gray-300'}`}
                                        value={row.values.SC}
                                        onChangeText={(text) => handleInputChange(row.category, "SC", text)}
                                        placeholder="Ingrese SC"
                                        keyboardType="numeric"
                                        maxLength={5}
                                    />
                                    {errors.sc?.[index] ? <Text className="text-red-500 text-sm mt-1">{errors.sc[index]}</Text> : null}
                                </View>

                                <View>
                                    <Text className="text-gray-600 mb-1">CC</Text>
                                    <TextInput
                                        className={`border rounded p-2 ${errors.cc?.[index] ? 'border-red-500' : 'border-gray-300'}`}
                                        value={row.values.CC}
                                        onChangeText={(text) => handleInputChange(row.category, "CC", text)}
                                        placeholder="Ingrese CC"
                                        keyboardType="numeric"
                                        maxLength={5}
                                    />
                                    {errors.cc?.[index] ? <Text className="text-red-500 text-sm mt-1">{errors.cc[index]}</Text> : null}
                                </View>

                                <View>
                                    <Text className="text-gray-600 mb-1">AE</Text>
                                    <TextInput
                                        className={`border rounded p-2 ${errors.ae?.[index] ? 'border-red-500' : 'border-gray-300'}`}
                                        value={row.values.AE}
                                        onChangeText={(text) => handleInputChange(row.category, "AE", text)}
                                        placeholder="Ingrese AE"
                                        keyboardType="numeric"
                                        maxLength={5}
                                    />
                                    {errors.ae?.[index] ? <Text className="text-red-500 text-sm mt-1">{errors.ae[index]}</Text> : null}
                                </View>
                            </View>
                        </View>
                    ))}

                    <View className="flex-row space-x-4 mb-8">
                        <TouchableOpacity
                            onPress={() => router.replace("/home")}
                            className={cancelbutton}
                        >
                            <Text className="text-white font-bold text-center">Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={onSubmit}
                            className={acceptbutton}
                        >
                            <Text className="text-white font-bold text-center">Guardar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default HistoriaClinica;
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { ClientBd } from "@/types/api";
import { getClients } from "@/services/clientsService";
import { createClinicalHistory } from "@/services/clinicalHistory";
import { useRouter } from "expo-router";
import { cancelbutton, acceptbutton } from "./tokens";

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

    const handleSearch = () => {
        const foundClient = clients.find(client => client.id === clientId);
        if (foundClient) {
            setSelectedClient(foundClient);
        } else {
            Alert.alert("Cliente no encontrado", "Verifique el ID ingresado");
            setSelectedClient(null);
        }
    };

    const handleInputChange = (category: string, field: "SC" | "CC" | "AE", value: string) => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.category === category ? { ...row, values: { ...row.values, [field]: value } } : row
            )
        );
    };

    const onSubmit = async () => {
        if (!selectedClient) {
            Alert.alert("Error", "Seleccione un cliente antes de guardar");
            return;
        }

        const historyData = {
            id_client: selectedClient.id,
            av: [],
            sc: rows.map(row => row.values.SC),
            cc: rows.map(row => row.values.CC),
            ae: rows.map(row => row.values.AE),
        };

        try {
            await createClinicalHistory(historyData);
            Alert.alert("Éxito", "Historia clínica guardada exitosamente");
            router.replace("/home");
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            Alert.alert("Error", "No se pudo conectar con el servidor");
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
                        className="border border-gray-300 rounded p-2 bg-white"
                        placeholder="Ingrese el ID del cliente"
                        value={clientId}
                        onChangeText={(text) => setClientId(text)}
                    />
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
                <ScrollView className="mx-6">
                    {rows.map((row, index) => (
                        <View key={index} className="mb-4 p-3 bg-white rounded-lg">
                            <Text className="font-bold mb-2 text-gray-700 text-center">{row.category}</Text>
                            <View className="flex-row items-center gap-2">
                                <Text className="font-bold text-gray-700">SC:</Text>
                                <TextInput
                                    className="border border-gray-300 rounded p-2 bg-gray-50 flex-1"
                                    placeholder="SC"
                                    value={row.values.SC}
                                    onChangeText={(text) => handleInputChange(row.category, "SC", text)}
                                />
                            </View>
                            <View className="flex-row items-center gap-2 mt-2">
                                <Text className="font-bold text-gray-700">CC:</Text>
                                <TextInput
                                    className="border border-gray-300 rounded p-2 bg-gray-50 flex-1"
                                    placeholder="CC"
                                    value={row.values.CC}
                                    onChangeText={(text) => handleInputChange(row.category, "CC", text)}
                                />
                            </View>
                            <View className="flex-row items-center gap-2 mt-2">
                                <Text className="font-bold text-gray-700">AE:</Text>
                                <TextInput
                                    className="border border-gray-300 rounded p-2 bg-gray-50 flex-1"
                                    placeholder="AE"
                                    value={row.values.AE}
                                    onChangeText={(text) => handleInputChange(row.category, "AE", text)}
                                />
                            </View>
                        </View>
                    ))}

                    <View className="items-center my-6 flex-row justify-center gap-4 ">
                        <TouchableOpacity className={`${acceptbutton}`} onPress={onSubmit}>
                            <Text className="text-white font-bold text-lg">Guardar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className={`${cancelbutton}`} onPress={() => router.replace("/home")}>
                            <Text className="text-white font-bold text-lg">Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

export default HistoriaClinica;
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    SafeAreaView,
    Image,
} from "react-native";
import { FormComponent, FormField } from "./Form";
import { ClientSchema, clientSchema } from "@/types/schemas";

const fields: FormField<ClientSchema>[] = [
    {
        name: "name",
        type: "name",
        placeholder: "Nombre",
        label: "Nombre",
    },
    {
        name: "lastname",
        type: "lastname",
        placeholder: "Apellido",
        label: "Apellido",
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email",
        label: "Email",
    },
    {
        name: "id",
        type: "id",
        placeholder: "ID",
        label: "ID",
    },
    {
        name: "phone",
        type: "phone",
        placeholder: "Teléfono",
        label: "Teléfono",
    },
    {
        name: "clinicalHistory",
        type: "clinicalHistory",
        placeholder: "Historia Clínica",
        label: "Historia Clínica",
    },
];

const HistoriaClinica = () => {
    const headers = ["SC", "CC", "AE"];

    const initialRows = [
        { category: "Lejos", AV: "OD", values: { SC: "", CC: "", AE: "" } },
        { category: "Lejos", AV: "OI", values: { SC: "", CC: "", AE: "" } },
        { category: "Cerca", AV: "OD", values: { SC: "", CC: "", AE: "" } },
        { category: "Cerca", AV: "OI", values: { SC: "", CC: "", AE: "" } },
    ];

    const [rows, setRows] = useState(initialRows);

    const updateValue = (rowIndex: number, header: string, newValue: string) => {
        const newRows = [...rows];
        newRows[rowIndex].values[header] = newValue;
        setRows(newRows);
    };

    const onSubmit = (data: ClientSchema) => {
        console.log('Historia clinica:', data);
    };

    const onCancel = () => {
        setRows(initialRows);
    }

    return (
        <SafeAreaView className="flex-1 bg-white relative">

            <View className="items-center">
                <Image
                    source={require("@/assets/images/top.png")}
                    className="w-full h-44"
                />
            </View>
            <Text className="text-2xl font-bold text-center mb-2 mt-4 text-primary">
                Crear Historia Clínica
            </Text>

            <ScrollView>
                <View className="flex-row border-b border-gray-300 pb-2">
                    <Text className="flex-1 font-bold text-center"></Text>
                    <Text className="flex-1 font-bold text-center">AV</Text>
                    {headers.map((header, index) => (
                        <Text key={index} className="flex-1 font-bold text-center">
                            {header}
                        </Text>
                    ))}
                </View>

                {rows.map((row, rowIndex) => (
                    <View
                        key={rowIndex}
                        className="flex-row border-b border-gray-200 py-2 items-center"
                    >
                        <Text className="flex-1 text-center">{row.category}</Text>
                        <Text className="flex-1 text-center">{row.AV}</Text>
                        {headers.map((header, colIndex) => (
                            <TextInput
                                key={colIndex}
                                className="flex-1 border border-gray-300 rounded p-1 text-center mx-1"
                                value={row.values[header]}
                                onChangeText={(text) => updateValue(rowIndex, header, text)}
                                placeholder="-"
                                placeholderTextColor="#999"
                            />
                        ))}
                    </View>
                ))}

                <FormComponent<ClientSchema>
                    schema={clientSchema}
                    fields={fields}
                    buttonAccept="Guardar"
                    buttonCancel="Cancelar"
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                />
            </ScrollView>

        </SafeAreaView>
    );
};

export default HistoriaClinica;

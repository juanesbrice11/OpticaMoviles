import React from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";

const HistoriaClinica = () => {

    const headers = ["AV", "SC", "CC", "AE"];
    const rows = [
        { category: "Lejos", eye: "OD" },
        { category: "Lejos", eye: "OI" },
        { category: "Cerca", eye: "OD" },
        { category: "Cerca", eye: "OI" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 px-4 py-6">
                <Text>holi</Text>               
            </ScrollView>
        </SafeAreaView>
    );
};

export default HistoriaClinica;
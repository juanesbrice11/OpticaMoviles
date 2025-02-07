import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import imagen from '../../assets/images/iconOptica.png';



const Client = () => {
  const clients = [
    { id: '1', cedula: '123456789', nombre: 'Juan Pérez', telefono: '555-1234', historiaClinica: 'Historia 1' },
    { id: '2', cedula: '987654321', nombre: 'Ana Gómez', telefono: '555-5678', historiaClinica: 'Historia 2' },
    { id: '3', cedula: '456789123', nombre: 'Carlos Ruiz', telefono: '555-9012', historiaClinica: 'Historia 3' },
  ];

  const renderItem = ({ item }) => (
    <View className="flex-row py-2 border-b border-gray-200">
      <Text className="flex-1 text-center">{item.cedula}</Text>
      <Text className="flex-1 text-center">{item.nombre}</Text>
      <Text className="flex-1 text-center">{item.telefono}</Text>
      <Text className="flex-1 text-center">{item.historiaClinica}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white"> 
      <Stack.Screen options={{ title: 'Clientes' }} />
      <View className="items-center mt-4">
        <Image
          source={imagen}
          className="w-48 h-48" 
        />
      </View>

      <Text className="text-2xl font-bold text-center mt-4">Clientes</Text>
      <View className="flex-row pb-2 border-b border-black mt-10">
        <Text className="flex-1 font-bold text-center">Cédula</Text>
        <Text className="flex-1 font-bold text-center">Nombre</Text>
        <Text className="flex-1 font-bold text-center">Teléfono</Text>
        <Text className="flex-1 font-bold text-center">Historia Clínica</Text>
      </View>
      <FlatList
        data={clients}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Client;
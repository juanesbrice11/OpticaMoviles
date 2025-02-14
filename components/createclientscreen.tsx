import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import imagen from '../assets/images/iconOptica.png';

const CreateClientScreen = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");


  return (
    <SafeAreaView className="flex-1 bg-white px-20">
      <View className="items-center mt-4">
        <Image
          source={imagen}
          className="w-48 h-48"
        />
      </View>
      <Text className="text-2xl font-bold text-center mt-4 text-blue"> Crear Clientes</Text>

      <View className="w-full mb-4">
        <Text className="text-gray-700 mb-1">Nombre</Text>
        <TextInput
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-gray-700 mb-1">Apellido</Text>
        <TextInput
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="Ingresa tu apellido"
          value={apellido}
          onChangeText={setApellido}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-gray-700 mb-1">Correo electrónico</Text>
        <TextInput
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="correo@ejemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />
      </View>

      <View className="w-full mb-4">
        <Text className="text-gray-700 mb-1">Teléfono</Text>
        <TextInput
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="3001234567"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />
      </View>

      <View className="w-full mb-6">
        <Text className="text-gray-700 mb-1">Cédula</Text>
        <TextInput
          className="border border-gray-300 rounded-md px-3 py-2"
          placeholder="12345678"
          keyboardType="numeric"
          value={cedula}
          onChangeText={setCedula}
        />
      </View>

      <View className='flex-row justify-end bottom-0 right-0 mb-4 mr-4'>
        <Pressable
          className="rounded-md py-3 w-20 items-center"
        >
          <Text className="text-black font-bold">Cancel</Text>
        </Pressable>

        <Pressable
          className="bg-blue rounded-md w-20 py-3 items-center"
        >
          <Text className="text-white font-bold">Save</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  );
}
export default CreateClientScreen;
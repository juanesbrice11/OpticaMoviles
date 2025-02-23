import React, { useState } from 'react';
import { View, Text, FlatList, Image, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormComponent from './Form';

const CreateClientScreen = () => {

  return (
    <SafeAreaView className="flex-1 bg-white px-20">
      <View className="items-center">
        <Image
          source={require("@/assets/images/iconOptica.png")}
          className="w-44 h-44"
        />
      </View>

      <Text className="text-2xl font-bold text-center mb-5 text-blue"> Crear Clientes</Text>

      <FormComponent 
        fields={[
          { name: 'nombre', type: 'name', placeholder: 'Nombre', label: 'Nombre' },
          { name: 'apellido', type: 'lastname', placeholder: 'Apellido', label: 'Apellido' },
          { name: 'email', type: 'email', placeholder: 'Email', label: 'Email' },
          { name: 'id', type: 'id', placeholder: 'Cédula', label: 'Cédula' },
          { name: 'celular', type: 'phone', placeholder: 'Celular', label: 'Celular' },
        ]}
        buttonAccept='Aceptar' 
        buttonCancel='Cancelar'
      />
    </SafeAreaView>
  );
}
export default CreateClientScreen;
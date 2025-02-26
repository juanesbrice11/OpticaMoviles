import React from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import { FormComponent, FormField } from "./Form";
import { ClientSchema, clientSchema } from "@/types/schemas";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { texttitile } from "./tokens";

const fields: FormField<ClientSchema>[] = [
  {
    name: "nombre",
    type: "name",
    placeholder: "Nombre",
    label: "Nombre",
  },
  {
    name: "apellido",
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
    name: "cedula",
    type: "id",
    placeholder: "Cédula",
    label: "Cédula",
  },
  {
    name: "telefono",
    type: "phone",
    placeholder: "Teléfono",
    label: "Teléfono",
  },
  {
    name: "historiaClinica",
    type: "clinicalHistory",
    placeholder: "Historia Clínica",
    label: "Historia Clínica",
  },
];

export default function CreateClientScreen() {
  const router = useRouter();

  const storeData = async (value: ClientSchema) => {
    try {
      const client = JSON.stringify(value);
      await AsyncStorage.setItem('my-client', client);
    } catch (e) {

    }
  };

  const getData = async () => {
    try {
      const client = await AsyncStorage.getItem('my-client');
      return client;
    } catch (e) {
      console.log('Error al obtener el cliente:', e);
    }
  };

  const onSumbit = (data: ClientSchema) => {
    storeData(data);
    getData().then((client) => {
      console.log("Datos del nuevo cliente:", client);
    });
    router.push("/client");
  };

  const onCancel = () => {
    router.push("/client");
  }

  return (
    <View className="flex-1 bg-white">
      <View className="items-center mb-7">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>
      <Text className={`${texttitile}`}>
        Crear Cliente
      </Text>

      <FormComponent<ClientSchema>
        schema={clientSchema}
        fields={fields}
        buttonAccept="Guardar"
        buttonCancel="Cancelar"
        onSubmit={onSumbit}
        onCancel={onCancel}
      />
    </View>
  );
}

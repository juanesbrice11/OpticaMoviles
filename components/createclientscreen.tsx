import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { z } from "zod";
import { FormComponent } from "./Form";
import { ClientSchema } from "@/types/api";
import AsyncStorage from '@react-native-async-storage/async-storage';


const createClientSchema: z.ZodType<ClientSchema> = z.object({
  id: z.string().nonempty("El campo es obligatorio"),
  nombre: z
    .string()
    .nonempty("El campo es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  apellido: z
    .string()
    .nonempty("El campo es obligatorio")
    .min(3, "El apellido debe tener al menos 3 caracteres"),
  email: z
    .string()
    .nonempty("El campo es obligatorio")
    .email("El email no es válido"),
  cedula: z
    .string()
    .nonempty("El campo es obligatorio")
    .min(6, "La cédula no es válida"),
  telefono: z
    .string()
    .nonempty("El campo es obligatorio")
    .min(10, "El número debe tener al menos 10 dígitos")
    .max(10, "El número debe tener máximo 10 dígitos"),
  historiaClinica: z.string().nonempty("El campo es obligatorio"),
});

export default function CreateClientScreen() {
  const router = useRouter();

  const storeData = async (value: ClientSchema) => {
    try {
      const client = JSON.stringify(value);
      await AsyncStorage.setItem('my-client', client);
    } catch (e) {

    }
  }

  const getData = async () => {
    try {
      const client = await AsyncStorage.getItem('my-client');
      return client != null ? JSON.parse(client) : null;
    } catch (e) {
    }
  };

  const handleCancel = () => {
    router.push("/client");
  };

  const handleSubmit = (data: ClientSchema) => {
    storeData(data);
    getData().then((client) => {
      console.log("Datos del nuevo cliente:", client);
    });

    console.log("Datos del nuevo cliente:", data);

    router.push("/client");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="items-center mb-[10%]">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>

      <Text className="text-2xl font-bold text-center mb-5 text-primary">
        Crear Clientes
      </Text>

      <FormComponent<ClientSchema>
        schema={createClientSchema}
        fields={[
          {
            name: "nombre",
            type: "nombre",
            placeholder: "Nombre",
            label: "Nombre",
          },
          {
            name: "apellido",
            type: "apellido",
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
            type: "cedula",
            placeholder: "Cédula",
            label: "Cédula",
          },
          {
            name: "celular",
            type: "telefono",
            placeholder: "Celular",
            label: "Celular",
          },
          {
            name: "historiaClinica",
            type: "historiaClinica",
            placeholder: "Historia Clínica",
            label: "Historia Clínica",
          }
        ]}
        buttonAccept="Aceptar"
        buttonCancel="Cancelar"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </SafeAreaView>
  );
}

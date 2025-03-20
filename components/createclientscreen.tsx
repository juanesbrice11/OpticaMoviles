import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { FormComponent, FormField } from "./Form";
import { ClientBd } from "@/types/api";
import { clientSchema, ClientSchema } from "@/types/schemas";
import { createClient } from "@/services/clientsService";
import { texttitile } from "./tokens";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    placeholder: "Cédula",
    label: "Cédula",
  },
  {
    name: "phone",
    type: "phone",
    placeholder: "Teléfono",
    label: "Teléfono",
  },
];

export default function CreateClientScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const storeData = async (data: ClientSchema) => {
    try {
      const clientData = JSON.stringify(data);
      await AsyncStorage.setItem("client", clientData);
    } catch (error) {
      console.error("Error al almacenar el cliente:", error);
    }
  };

  const getData = async () => {
    try {
      const clientData = await AsyncStorage.getItem("client");
      return clientData;
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
    }
  };

  const onSumbit = async (data: ClientSchema) => {
    storeData(data);
    
    try {
      setIsLoading(true);
      await createClient({
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      });
      router.push("/client");
    } catch (error) {
      console.error("Error al crear el cliente:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    router.push("/client");
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
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

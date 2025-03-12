import React, { useState } from "react";
import { View, Text, Image, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { FormComponent, FormField } from "./Form";
import { ClientBd } from "@/types/api";
import { clientSchema, ClientSchema } from "@/types/schemas";
import { createClient } from "@/services/clientsService";
import { texttitile } from "./tokens";

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

  const onSumbit = async (data: ClientSchema) => {
    console.log("data", data);
    
    try {
      setIsLoading(true);
      console.log("Intentando crear cliente...");
      await createClient({
        id: data.id,
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
      });
      console.log("Cliente creado exitosamente");
      router.push("/client");
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
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

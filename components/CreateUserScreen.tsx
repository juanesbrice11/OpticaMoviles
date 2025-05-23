import React, { useState } from "react";
import { View, Image, ActivityIndicator, TextInput, Button, Alert, Text } from "react-native";
import { useRouter } from "expo-router";
import { registerUser } from "@/services/usersService"; // Asegúrate de tener este servicio
import { userSchema, UserSchema } from "@/types/schemas";
import { FormComponent, FormField } from "./Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { texttitle } from "./tokens";

export default function CreateUserScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormField<UserSchema>[] = [
    {
      name: "name",
      type: "name",
      placeholder: "Nombre",
      label: "Nombre",
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
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      label: "Contraseña",
      secureTextEntry: true,
    },
    {
      name: "confirmPassword",
      type: "confirmPassword",
      placeholder: "Confirmar contraseña",
      label: "Confirmar contraseña",
      secureTextEntry: true,
    },
    {
      name: "role",
      type: "role",
      placeholder: "Rol",
      label: "Rol",
    },
  ];

  const storeData = async (data: UserSchema) => {
    try {
      const userData = JSON.stringify(data);
      await AsyncStorage.setItem("user", userData);
    } catch (error) {
      console.error("Error al almacenar el usuario:", error);
    }
  };

  const onSubmit = async (data: UserSchema) => {
    storeData(data);
    if (data.password !== data.confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      setIsLoading(true);
      await registerUser({
        email: data.email,
        name: data.name,
        id: data.id,
        password: data.password,
        role: data.role,
      });
      router.push("/users");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      Alert.alert('Error', 'No se pudo crear el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = () => {
    router.push("/users");
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
      <Text className={`${texttitle}`}>Crear Usuario</Text>

        <FormComponent<UserSchema>
          schema={userSchema}
          fields={fields}
          buttonAccept="Guardar"
          buttonCancel="Cancelar"
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
    </View>
  );
} 
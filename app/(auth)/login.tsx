import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    router.push("../home");
  };

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ImageBackground
        source={require("@/assets/images/background.png")}
        className="flex-1"
        resizeMode="stretch"
      >

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center items-center px-5 pt-48">
              <TextInput
                className="w-11/12 h-12 rounded-2xl border border-gray-400 bg-gray-300 shadow-lg px-4 mb-7 text-black"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#5F5F5F"
              />

              <TextInput
                className="w-11/12 h-12 rounded-2xl border border-gray-400 bg-gray-300 shadow-lg px-4 mb-7 text-black"
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#5F5F5F"
              />

              <Text className="text-base font-normal text-gray-500 self-end mr-10 mb-5">
                Forgot password?
              </Text>

              <Pressable
                className="w-11/12 bg-blue py-3 rounded-2xl items-center mt-2"
                onPress={handleLogin}
              >
                <Text className="text-lg font-bold text-gray-300">Sign in</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

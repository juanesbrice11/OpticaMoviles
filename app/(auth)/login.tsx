import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ImageBackground, StyleSheet } from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Correo:", email);
    console.log("Contraseña:", password);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <Text style={styles.title}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#ddd"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#ddd"
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 170,
    marginBottom: 30,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  input: {
    width: "90%",
    height: 50,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "white",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 15,
  },
  button: {
    width: "90%",
    backgroundColor: "#1769AA",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

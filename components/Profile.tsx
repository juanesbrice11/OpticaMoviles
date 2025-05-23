import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, Button, Pressable } from "react-native";
import { useAuth } from "@/context/AuthContext";
import { getUserById } from "@/services/usersService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Ionicons } from "@expo/vector-icons";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Profile = () => {
  const { onLogout } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("@access_token");
        if (token) {
          const decodedToken = jwtDecode<{ sub: string }>(token);
          const userId = decodedToken.sub;
          const data = await getUserById(userId);
          setProfileData(data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  if (!profileData) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No se encontró el perfil del usuario.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white relative">
      <View className="items-center">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>
      <View className="items-center">
        <Ionicons name="person-circle-outline" size={200} color="black" />
        <Text className="text-xl font-bold">{profileData.name}</Text>
        <Text className="text-gray-600">{profileData.email}</Text>
        <Text className="text-gray-600">ID: {profileData.id}</Text>
        <Text className="text-gray-600">Rol: {profileData.role}</Text>
      </View>

      <View className="items-center mt-4">
        <Pressable 
          onPress={onLogout}
          className="bg-primary px-6 rounded-lg"
        >
          <Text className="text-white font-semibold p-2">Cerrar Sesión</Text>
        </Pressable>

        <Button
          title="Borrar token"
          onPress={() => {
            AsyncStorage.removeItem("@access_token");
            AsyncStorage.removeItem("@refresh_token");
          }}
        />
      </View>
    </View>
  );
};

export default Profile; 
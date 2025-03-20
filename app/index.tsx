import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/context/AuthContext";

export default function Index() {
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    if (!authState?.loading) { 
      if (authState?.authenticated) {
        router.replace("/(content)/(tabs)/home");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [authState?.loading, authState?.authenticated]);

  if (authState?.loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="blue" className="mt-4" />
      </View>
    );
  }

  return null;
}
import { useEffect, useState } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigationState?.key) {
      setTimeout(() => {
        router.replace("/(auth)/login");
        setIsLoading(false);
      }, 1000);
    }
  }, [navigationState?.key]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="blue" className="mt-4" />
      </View>
    );
  }

  return null;
}

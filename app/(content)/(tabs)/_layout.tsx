import TabNavigator from "@/components/Tabs";
import { useAuth } from "@/context/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function TabsLayout() {
  const { authState } = useAuth();

  if (!authState || authState.authenticated === null || !authState.token) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  return <TabNavigator key={authState.role} />;
}

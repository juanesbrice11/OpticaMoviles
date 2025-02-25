import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", height: 60, margin:40, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 4, }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="clients"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="sales"
        options={{
          title: "Ventas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-handle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

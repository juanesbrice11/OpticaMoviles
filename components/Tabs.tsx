import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function TabNavigator() {
  const { authState } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "#1769AA",
          height: 80,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 4,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          href: "/(content)/(tabs)/home",
        }}
      />

      <Tabs.Screen
        name="clients"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          href: "/(content)/(tabs)/clients",
        }}
      />

      <Tabs.Screen
        name="sales"
        options={{
          title: "Ventas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-handle" size={size} color={color} />
          ),
          href: "/(content)/(tabs)/sales",
        }}
      />

      <Tabs.Screen
        name="users"
        options={{
          title: "Usuarios",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          href: authState?.role === "admin"
            ? "/(content)/(tabs)/users"
            : null,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          href: authState?.role === "admin"
            ? "/(content)/(tabs)/profile"
            : null,
        }}
      />
    </Tabs>
  );
}
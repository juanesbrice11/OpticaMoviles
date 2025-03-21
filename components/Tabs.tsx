import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

export default function TabNavigator() {
  const { authState } = useAuth();

  const allowedRoutes: { name: string; title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
    { name: "home", title: "Inicio", icon: "home" },
    { name: "clients", title: "Clientes", icon: "person" },
    { name: "sales", title: "Ventas", icon: "bag-handle" },
  ];

  if (authState?.role === "admin") {
    allowedRoutes.push({ name: "users", title: "Usuarios", icon: "people" });
  }

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
      {allowedRoutes.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

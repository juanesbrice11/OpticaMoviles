import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Card from "@/components/Card";
import FloatingMenu from "./FloatingMenu";
import { texttitile } from "./tokens";
import { getGlasses } from "@/services/glassesService";

interface Glasses {
  id: number;
  marca: string;
  imagen: string;
  precio: number;
  material: string;
  stock: number;
}

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [glasses, setGlasses] = useState<Glasses[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGlasses = async () => {
      try {
        const data = await getGlasses();
        setGlasses(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchGlasses();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="items-center">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>
      <Text className={`${texttitile}`}>Inventario</Text>
      <ScrollView>
        {loading ? (
          <Text className="text-center mt-4">Cargando...</Text>
        ) : error ? (
          <Text className="text-center mt-4 text-red-500">Error: {error}</Text>
        ) : (
          <View className="flex flex-row flex-wrap justify-center p-4">
            {glasses.map((item) => (
              <Link
                key={item.id}
                href={`/${item.id}`}
                asChild
              >
                <Pressable>
                  <Card
                    key={item.id}
                    name={item.marca}
                    imageUri={item.imagen}
                    price={item.precio}
                    material={item.material}
                    id={item.id}
                    stock={item.stock}
                  />
                </Pressable>
              </Link>
            ))}
          </View>
        )}
      </ScrollView>

      <FloatingMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        routes={[
          { url: "/crearGafa", text: "Crear Gafa" },
        ]}
      />
      <View className="absolute bottom-0 right-0 mb-4 mr-4">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="add-circle" size={60} color="#1769AA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

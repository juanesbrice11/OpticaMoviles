import { View, Text, ScrollView, Image, Pressable, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import Card from "@/components/Card";
import { glassesData } from "@/app/(glasses)/glassessData";
import FloatingMenu from "./FloatingMenu";
import { texttitile } from "./tokens";

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);

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

        <View className="flex flex-row flex-wrap justify-center p-4">

          {glassesData.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id}`}
              asChild
            >
              <Pressable>
                <Card
                  key={item.id}
                  name={item.name}
                  imageUri={item.imageUri}
                  price={item.price}
                  material={item.material}
                  id={item.id}
                  stock={item.stock}
                />
              </Pressable>
            </Link>
          ))}

        </View>
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

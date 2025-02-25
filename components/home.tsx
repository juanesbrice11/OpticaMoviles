import { View, Text, ScrollView, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import Card from '@/components/Card';
import { glassesData } from '@/app/(home)/glassessData';
import { Ionicons } from "@expo/vector-icons";
import GenericSearchBar from "@/components/SearchBar";
import { CardProps } from "@/types/api";

const Home = () => {
    return (
        <ScrollView className="flex-1 bg-white">
            <View className="items-center">
                <Image
                    source={require("@/assets/images/iconOptica.png")}
                    className="w-44 h-44"
                />
            </View>
            <Text className="text-2xl font-bold text-center text-blue mt-4">Inventario</Text>
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
            <View className="absolute bottom-0 right-0 mb-4 mr-4">
                <Link href="/crear" asChild>
                    <Pressable>
                        <Ionicons name="add-circle" size={60} color="#1769AA" />
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    )
}

export default Home
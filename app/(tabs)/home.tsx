// HomeScreen.js
import { View, Text, ScrollView, Image } from "react-native";
import Card from '@/components/Card';

export default function HomeScreen() {
  const glassesData = [
    {
      id: 123,
      name: 'Rayban Sun',
      imageUri: require('../../assets/images/image9.png'),
      material: 'Metal',
      price: 150000,
      stock: 10,
    },
    {
      id: 124,
      name: 'Oakley',
      imageUri: require('../../assets/images/image15.png'),
      material: 'Metal',
      price: 132000,
      stock: 5,
    },
    {
      id: 125,
      name: 'Oakley',
      imageUri: require('../../assets/images/image16.png'),
      material: 'Metal',
      price: 177000,
      stock: 3,
    },
    {
      id: 126,
      name: 'Oakley',
      imageUri: require('../../assets/images/image17.png'),
      material: 'Metal',
      price: 73754,
      stock: 4,
    },
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center">
              <Image
                source={require("../../assets/images/iconOptica.png")}
                className="w-44 h-44"
              />
            </View>
      <View className="flex flex-row flex-wrap justify-center p-4">
        {glassesData.map((item) => (
          <Card
            key={item.id}
            name={item.name}
            imageUri={item.imageUri}
            price={item.price}
            material={item.material}
            id={item.id}
            stock={item.stock}
          />
        ))}
      </View>
    </ScrollView>
  );
}

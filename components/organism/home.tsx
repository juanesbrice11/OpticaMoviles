import { View, Text, ScrollView, Image, Pressable, TouchableOpacity, Modal, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/components/organism/Card";
import FloatingMenu from "@/components/molecules/FloatingMenu";
import { texttitle } from "@/components/tokens";
import { useRouter } from "expo-router";

import { getGlasses, deleteGlasses } from "@/services/glassesService";

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
  const [selectedGlasses, setSelectedGlasses] = useState<number[]>([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchGlasses();
  }, []);

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

  const handleLongPress = (id: number) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
    }
    toggleSelection(id);
  };

  const toggleSelection = (id: number) => {
    setSelectedGlasses(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handlePress = (id: number) => {
    if (isSelectionMode) {
      toggleSelection(id);
    }
  };

  const exitSelectionMode = () => {
    setIsSelectionMode(false);
    setSelectedGlasses([]);
  };

  const handleDelete = async () => {
    if (selectedGlasses.length === 0) return;

    setIsDeleting(true);
    try {
      await deleteGlasses(selectedGlasses);
      await fetchGlasses(); // Recargar la lista
      setShowDeleteModal(false);
      exitSelectionMode();
    } catch (err) {
      Alert.alert('Error', 'No se pudieron eliminar las gafas seleccionadas');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMenuAction = (url: string) => {
    setMenuVisible(false);
    router.push(url as any);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="items-center">
        <Image
          source={require("@/assets/images/top.png")}
          className="w-full h-44"
        />
      </View>
      <View className="px-4">
        <Text className={`${texttitle} text-center`}>Inventario</Text>
        {isSelectionMode && (
          <View className="flex-row justify-center items-center mt-2 space-x-4">
            <TouchableOpacity
              onPress={() => setShowDeleteModal(true)}
              disabled={selectedGlasses.length === 0}
              className={`${selectedGlasses.length === 0 ? 'opacity-50' : ''}`}
            >
              <Ionicons
                name="trash"
                size={24}
                color={selectedGlasses.length === 0 ? "#999" : "#FF0000"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={exitSelectionMode}>
              <Text className="text-blue-500">Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView>
        {loading ? (
          <Text className="text-center mt-4">Cargando...</Text>
        ) : error ? (
          <Text className="text-center mt-4 text-red-500">Error: {error}</Text>
        ) : (
          <View className="flex flex-row flex-wrap justify-center p-4">
            {glasses.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => handlePress(item.id)}
                onLongPress={() => handleLongPress(item.id)}
                className={`m-2 ${selectedGlasses.includes(item.id) ? 'opacity-70' : ''}`}
              >
                <Card
                  name={item.marca}
                  imageUri={item.imagen}
                  price={item.precio}
                  material={item.material}
                  id={item.id}
                  stock={item.stock}
                  isSelected={selectedGlasses.includes(item.id)}
                />
              </Pressable>
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
        onSelectRoute={handleMenuAction}
      />
      <View className="absolute bottom-0 right-0 mb-4 mr-4">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="add-circle" size={60} color="#1769AA" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-bold mb-4">Confirmar eliminación</Text>
            <Text className="mb-6">
              ¿Estás seguro de que deseas eliminar {selectedGlasses.length} {selectedGlasses.length === 1 ? 'gafa' : 'gafas'} seleccionada{selectedGlasses.length !== 1 ? 's' : ''}?
            </Text>
            <View className="flex-row justify-end space-x-4">
              <TouchableOpacity
                onPress={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200"
              >
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 rounded-lg bg-red-500 ${isDeleting ? 'opacity-50' : ''}`}
              >
                <Text className="text-white font-bold">
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

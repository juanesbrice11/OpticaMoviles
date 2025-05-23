import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { ClientBd } from '@/types/api';
import { getClients } from '@/services/clientsService';

interface ClientSearchBarProps {
  onSelectClient: (client: ClientBd) => void;
  selectedClient: ClientBd | null;
}

export default function ClientSearchBar({ onSelectClient, selectedClient }: ClientSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<ClientBd[]>([]);
  const [filteredClients, setFilteredClients] = useState<ClientBd[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const apiClients = await getClients();
      setClients(apiClients);
      setFilteredClients(apiClients);
    } catch (error) {
      console.error("Error al cargar clientes:", error);
      setError("No se pudieron cargar los clientes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredClients(clients);
      return;
    }

    const filtered = clients.filter(client => 
      client.id.toLowerCase().includes(text.toLowerCase()) ||
      client.name.toLowerCase().includes(text.toLowerCase()) ||
      client.lastname.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredClients(filtered);
  };

  const handleSelectClient = (client: ClientBd) => {
    onSelectClient(client);
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1769AA" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="mx-4 mb-4">
        <TextInput
          className="border border-gray-300 rounded-lg p-2 bg-white"
          placeholder="Buscar por nombre, apellido o ID"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {selectedClient && (
        <View className="mx-4 mb-4 p-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-bold text-primary">
            Cliente seleccionado:
          </Text>
          <Text className="text-lg">
            {selectedClient.name} {selectedClient.lastname}
          </Text>
          <Text className="text-gray-600">ID: {selectedClient.id}</Text>
        </View>
      )}

      {!selectedClient && searchQuery && (
        <View className="mx-4" style={{ height: 300 }}>
          <FlatList
            data={filteredClients}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="p-4 border-b border-gray-200"
                onPress={() => handleSelectClient(item)}
              >
                <Text className="text-lg font-semibold">
                  {item.name} {item.lastname}
                </Text>
                <Text className="text-gray-600">ID: {item.id}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text className="text-center text-gray-500 mt-4">
                No se encontraron clientes
              </Text>
            }
          />
        </View>
      )}
    </View>
  );
} 
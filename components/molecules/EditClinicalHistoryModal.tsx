import React, { useState } from 'react';
import { View, Text, Modal, Pressable, TextInput, ScrollView, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ClinicalHistory } from '@/types/api';
import { updateClinicalHistory } from '@/services/clinicalHistory';

interface EditClinicalHistoryModalProps {
  visible: boolean;
  historyData: ClinicalHistory;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditClinicalHistoryModal: React.FC<EditClinicalHistoryModalProps> = ({
  visible,
  historyData,
  onClose,
  onSuccess,
}) => {
  const [sc, setSc] = useState(historyData.sc?.join('/ ') || '');
  const [cc, setCc] = useState(historyData.cc?.join('/ ') || '');
  const [ae, setAe] = useState(historyData.ae?.join('/ ') || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      const updatedHistory = {
        ...historyData,
        sc: sc.split(',').map(item => item.trim()),
        cc: cc.split(',').map(item => item.trim()),
        ae: ae.split(',').map(item => item.trim()),
      };
      await updateClinicalHistory(String(historyData.id), updatedHistory);
      Alert.alert('Éxito', 'Historia clínica actualizada correctamente');
      onSuccess();
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo actualizar la historia clínica');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <TouchableWithoutFeedback onPress={handleDismiss}>
        <View testID="modal-overlay" className="flex-1 justify-center items-center bg-black/50">
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View className="bg-white p-4 rounded-lg w-4/5 max-h-[80%]">
              <Text className="text-lg font-bold mb-4">Editar Historia Clínica</Text>
              <ScrollView>
                <View className="mb-4">
                  <Text className="font-semibold mb-1">SC (Separar por /)</Text>
                  <TextInput
                    value={sc}
                    onChangeText={setSc}
                    className="border border-gray-300 rounded p-2"
                    multiline
                    editable={!isLoading}
                    placeholder="Ej: 20/20, 20/30"
                  />
                </View>

                <View className="mb-4">
                  <Text className="font-semibold mb-1">CC (Separar por /)</Text>
                  <TextInput
                    value={cc}
                    onChangeText={setCc}
                    className="border border-gray-300 rounded p-2"
                    multiline
                    editable={!isLoading}
                    placeholder="Ej: Miopía, Astigmatismo"
                  />
                </View>

                <View className="mb-4">
                  <Text className="font-semibold mb-1">AE (Separar por /)</Text>
                  <TextInput
                    value={ae}
                    onChangeText={setAe}
                    className="border border-gray-300 rounded p-2"
                    multiline
                    editable={!isLoading}
                    placeholder="Ej: Lentes progresivos, Lentes de contacto"
                  />
                </View>
              </ScrollView>

              <View className="flex-row justify-end gap-2 mt-4">
                <Pressable 
                  onPress={handleDismiss} 
                  className="bg-gray-300 px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  <Text>Cancelar</Text>
                </Pressable>
                <Pressable 
                  onPress={handleSave} 
                  className="bg-blue-500 px-4 py-2 rounded"
                  disabled={isLoading}
                >
                  <Text className="text-white">{isLoading ? 'Guardando...' : 'Guardar'}</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

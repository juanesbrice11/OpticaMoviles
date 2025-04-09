import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { createSale } from '@/services/salesService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { texttitile } from '@/components/tokens';
import CreateSaleScreen from "@/components/CreateSaleScreen";

export default function CreateSaleScreenWrapper() {
  return <CreateSaleScreen />;
} 
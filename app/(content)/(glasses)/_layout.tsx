import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const GlassesLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="[id]" />
        <Stack.Screen name="crearGafa" />
    </Stack>
  )
}

export default GlassesLayout
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const UsersLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="crearUsuario" />
    </Stack>
  )
}

export default UsersLayout
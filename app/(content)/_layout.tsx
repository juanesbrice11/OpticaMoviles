import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ContentLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(client)' />
        <Stack.Screen name='(glasses)'  />
        <Stack.Screen name='(historia)' />
        <Stack.Screen name='(tabs)' />
    </Stack>
  )
}

export default ContentLayout
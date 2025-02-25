import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormComponent from '@/components/Form'
import SearchBarComponent from '@/components/SearchBar'

const Prueba = () => {
    return (
        <SafeAreaView className='flex-1 bg-white px-20'>
            <Text>prueba</Text>
            <SearchBarComponent />
        </SafeAreaView>
    )
}

export default Prueba
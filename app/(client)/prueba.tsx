import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormComponent from '@/components/Form'

const prueba = () => {
    return (
        <SafeAreaView className='flex-1 bg-white px-20'>
            <Text>prueba</Text>
            <FormComponent fields={[
                { name: 'nombre', type: 'text', placeholder: 'Nombre', label: 'Nombre' },
                { name: 'apellido', type: 'text', placeholder: 'Apellido', label: 'Apellido' },
                { name: 'edad', type: 'number', placeholder: 'Edad', label: 'Edad' },
                { name: 'email', type: 'email', placeholder: 'Email', label: 'Email' }
            ]}
            />
        </SafeAreaView>
    )
}

export default prueba
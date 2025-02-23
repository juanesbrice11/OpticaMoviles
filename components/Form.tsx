import { View, Text, TextInput } from 'react-native'
import React from 'react'

interface FormField {
    name: string;
    type: string;
    placeholder: string;
    label: string;
}

interface FormComponentProps {
    fields: FormField[];
}

const FormComponent = ({fields}: FormComponentProps) => {

  return (
      <View className='items-center mt-4'>
            {fields.map((field) => (
                <View className='w-full mb-4' key={field.name}>
                    <Text className='text-gray-700 mb-1'>{field.label}</Text>
                    <TextInput
                        className='border border-gray-300 p-2 rounded-lg'
                        placeholder={field.placeholder}
                    />
                </View>
            ))}
    </View>
  )
}

export default FormComponent
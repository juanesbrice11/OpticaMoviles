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
      <View>
            {fields.map((field) => (
                <View key={field.name}>
                    <Text>{field.label}</Text>
                    <TextInput
                        
                        placeholder={field.placeholder}
                    />
                </View>
            ))}
    </View>
  )
}

export default FormComponent
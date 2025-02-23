import { View, Text, TextInput, KeyboardAvoidingView, Platform, Pressable } from 'react-native'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React from 'react'

const schema = z.object({
    name: z.string().nonempty("El campo es obligatorio").min(3, "El nombre debe tener al menos 3 caracteres"),
    lastname: z.string().nonempty("El campo es obligatorio").min(3, "El apellido debe tener al menos 3 caracteres"),
    email: z.string().nonempty("El campo es obligatorio").email("El email no es válido"),
    id: z.string().nonempty("El campo es obligatorio").min(6, "El id no es válido"),
    phone: z.string().nonempty("El campo es obligatorio").min(10, "El número debe tener al menos 10 dígitos").max(10, "El número debe tener máximo 10 dígitos")
})

type FormSchema = z.infer<typeof schema>;

interface FormField {
    name: string;
    type: keyof FormSchema;
    placeholder: string;
    label: string;
}

interface FormComponentProps {
    fields: FormField[];
    buttonAccept: string;
    buttonCancel: string;
}

const FormComponent = ({ fields, buttonAccept, buttonCancel }: FormComponentProps) => {

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormSchema>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: FormSchema) => {
        console.log(data)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"} className='items-center mt-4'>
            {fields.map((field) => (
                <View className='w-full mb-4' key={field.name}>
                    <Text className='text-gray-700 mb-1'>{field.label}</Text>
                    <TextInput
                        className='border border-gray-300 p-2 rounded-lg'
                        placeholder={field.placeholder}
                        value={watch(field.type)}
                        onChangeText={(text) => setValue(field.type, text)}
                        {...register(field.type)}
                    />
                    {errors[field.type] && <Text className="text-red-500">{errors[field.type]?.message}</Text>}
                </View>
            ))}
            <View className='flex-row w-full mt-4 justify-end gap-2'>
                <Pressable className="bg-red rounded-md w-20 py-3 items-center" onPress={() => console.log('Operación cancelada')}>
                    <Text className="text-black font-bold">{buttonCancel}</Text>
                </Pressable>
                <Pressable className="bg-blue rounded-md w-20 py-3 items-center" onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white font-bold">{buttonAccept}</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default FormComponent
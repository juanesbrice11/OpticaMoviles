import React from 'react';
import { View, Text, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { z } from 'zod';

import { FormComponent, FormField } from '@/components/Form';

const gafasSchema = z.object({
    name: z
        .string()
        .nonempty('El campo es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres'),
    imageUri: z
        .string()
        .nonempty('El campo es obligatorio')
        .url('URL no válida'),
    price: z
        .string()
        .nonempty('El campo es obligatorio'),
    material: z.string().nonempty('El campo es obligatorio'),
    id: z.string().nonempty('El campo es obligatorio'),
    stock: z.string().nonempty('El campo es obligatorio')
});

type GafasSchema = z.infer<typeof gafasSchema>;

const fields: FormField<GafasSchema>[] = [
    {
        name: 'name',
        type: 'name',
        placeholder: 'Nombre de la gafa',
        label: 'Nombre',
    },
    {
        name: 'imageUri',
        type: 'imageUri',
        placeholder: 'URL de la imagen',
        label: 'Imagen',
    },
    {
        name: 'price',
        type: 'price',
        placeholder: 'Precio',
        label: 'Precio',
    },
    {
        name: 'material',
        type: 'material',
        placeholder: 'Material de la gafa',
        label: 'Material',
    },
    {
        name: 'id',
        type: 'id',
        placeholder: 'ID de la gafa',
        label: 'ID',
    },
    {
        name: 'stock',
        type: 'stock',
        placeholder: 'Stock disponible',
        label: 'Stock',
    },
];

export default function CrearGafa() {
    const router = useRouter();

    const onSubmit = (data: GafasSchema) => {
        const numericPrice = Number(data.price);
        const numericStock = Number(data.stock);
        console.log('Nueva gafa:', {
            ...data,
            price: numericPrice,
            stock: numericStock,
        });

        router.push('/home');
    };

    const onCancel = () => {
        router.push('/home');
    };

    return (
        <View className="flex-1 bg-white px-20">
            <View className="items-center">
                <Image
                    source={require("@/assets/images/iconOptica.png")}
                    style={{ width: 176, height: 176 }}
                />
            </View>
            <Text className="text-2xl font-bold text-center mb-5 text-blue">Crear Gafa</Text>

            <FormComponent<GafasSchema>
                schema={gafasSchema}
                fields={fields}
                buttonAccept="Guardar"
                buttonCancel="Cancelar"
                onSubmit={onSubmit}
                onCancel={onCancel}
            />
        </View>
    );
}

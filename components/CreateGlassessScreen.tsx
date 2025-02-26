import React from 'react';
import { View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { GafasSchema, gafasSchema } from '@/types/schemas';
import { FormComponent, FormField } from '@/components/Form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { texttitile } from './tokens';


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

    const storeData = async (value: GafasSchema) => {
        try {
            const glass = JSON.stringify(value);
            await AsyncStorage.setItem('my-glass', glass);
        } catch (e) {
            console.log('Error al guardar las gafas:', e);
        }
    }

    const getData = async () => {
        try {
            const glasses = await AsyncStorage.getItem('my-glass');            
            return glasses;
        } catch (e) {
            console.log('Error al obtener las gafas:', e);
        }
    };

    const onSubmit = (data: GafasSchema) => {
        storeData(data);
        getData().then((glasses) => {
            console.log('Gafas guardadas en el storage:', glasses);
        });
        
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
        <View className="flex-1 bg-white">
            <View className="items-center mb-7">
                <Image
                    source={require("@/assets/images/top.png")}
                    className="w-full h-44"
                />
            </View>
            <Text className={`${texttitile}`}>Crear Gafa</Text>

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

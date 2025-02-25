import { ImageSourcePropType } from 'react-native';

export interface ClientSchema {
    id: string;
    cedula: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    historiaClinica: string;
  }
export interface CardProps {
  name: string;
  imageUri: ImageSourcePropType;
  price: number;
  material: string;
  id: string | number;
  stock: number;
}
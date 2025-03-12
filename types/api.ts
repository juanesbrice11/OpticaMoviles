import { ImageSourcePropType } from 'react-native';

export interface ClientBd {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
  }
export interface CardProps {
    name: string;
    imageUri: string;
    price: number;
    material: string;
    id: number;
    stock: number;
}
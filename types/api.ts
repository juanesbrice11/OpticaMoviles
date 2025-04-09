export const URL = `http://${process.env.EXPO_PUBLIC_API_URL}:${process.env.EXPO_PUBLIC_API_PORT}`;

export interface ClientBd {
    id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface CardProps {
    name: string;
    imageUri: string;
    price: number;
    material: string;
    id: number;
    stock: number;
    isSelected?: boolean;
}

export interface ClinicalHistory {
    id?: number;
    id_client: string;
    av: string[];
    sc: string[];
    cc: string[];
    ae: string[];
}

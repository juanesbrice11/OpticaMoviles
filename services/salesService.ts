import axios from 'axios';
import { URL } from '@/types/api';

export interface Sale {
  id: number;
  client: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
  glasses: {
    id: number;
    marca: string;
    imagen: string;
    precio: number;
    material: string;
    stock: number;
  };
  total: string;
  date: string;
}

export const getSales = async (): Promise<Sale[]> => {
  try {
    const response = await axios.get<Sale[]>(`${URL}/sales`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sales:', error);
    throw error;
  }
};

export const createSale = async (formData: FormData): Promise<Sale> => {
  try {
    const response = await axios.post<Sale>(`${URL}/sales`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    }
    throw error;
  }
}; 
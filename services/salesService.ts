import axios from 'axios';
import { URL } from '@/types/api';

export interface Sale {
  id: number;
  client: string;
  glasses: number;
  total: number;
  date: string;
  product_image: string;
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
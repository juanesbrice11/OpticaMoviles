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
  total: number;
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

export const createSale = async (saleData: {
  clientId: string;
  glassesId: number;
  total: number;
  date: string;
}): Promise<Sale> => {
  try {
    const response = await axios.post<Sale>(`${URL}/sales`, saleData);
    return response.data;
  } catch (error) {
    console.error('Error creating sale:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    }
    throw error;
  }
};

export const deleteSale = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${URL}/sales/${id}`);
  } catch (error) {
    console.error('Error deleting sale:', error);
    throw error;
  }
};

export const updateSale = async (id: number, updateData: {
  clientId: string;
  glassesId: number;
  total: number;
  date: string;
}): Promise<Sale> => {
  try {
    const response = await axios.put<Sale>(`${URL}/sales/${id}`, updateData);
    if (!response.data.glasses) {
      throw new Error('No se encontraron las gafas asociadas a la venta');
    }
    return {
      ...response.data,
      glasses: {
        ...response.data.glasses,
        imagen: response.data.glasses.imagen.replace(/\\/g, '/')
      }
    };
  } catch (error) {
    console.error('Error updating sale:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
    }
    throw error;
  }
}; 
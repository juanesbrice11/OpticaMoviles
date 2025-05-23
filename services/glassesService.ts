import axios from 'axios';
import { URL } from '@/types/api';
export interface Glasses {
  id: number;
  marca: string;
  imagen: string;
  precio: number;
  material: string;
  stock: number;
}

export const getGlasses = async (): Promise<Glasses[]> => {
  try {
    const response = await axios.get<Glasses[]>(`${URL}/glasses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching glasses:', error);
    throw error;
  }
};

export const getGlassesById = async (id: number): Promise<Glasses> => {
  try {
    const response = await axios.get<Glasses>(`${URL}/glasses/${id}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching glasses by id:', error);
    throw error;
  }
};

export const createGlasses = async (formData: FormData): Promise<Glasses> => {
  try {
    const response = await axios.post<Glasses>(`${URL}/glasses`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating glasses:', error);
    throw error;
  }
};

export const deleteGlasses = async (ids: number[]) => {
  try {
    const response = await axios.delete(`${URL}/glasses`, { data: { ids } });
    return response.data;
  } catch (error) {
    console.error('Error deleting glasses:', error);
    throw error;
  }
};

export const updateGlasses = async (id: number, data: FormData) => {
  try {
    const response = await fetch(`${URL}/glasses/${id}`, {
      method: 'PUT',
      body: data,
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la gafa');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en updateGlasses:', error);
    throw error;
  }
};

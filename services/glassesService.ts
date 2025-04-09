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

export const updateGlasses = async (id: number, formData: FormData) => {
  try {
    // Verificar si hay una imagen en el FormData
    const hasImage = formData.get('imagen') !== null;
    
    // Si no hay imagen, enviar solo los datos de texto
    if (!hasImage) {
      const response = await axios.put(`${URL}/glasses/${id}`, {
        marca: formData.get('marca'),
        precio: formData.get('precio'),
        material: formData.get('material'),
        stock: formData.get('stock')
      });
      return response.data;
    }
    
    // Si hay imagen, enviar como multipart/form-data
    const response = await axios.put(`${URL}/glasses/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating glasses:', error);
    throw error;
  }
};

import axios from 'axios';

export interface Glasses {
  id: number;
  marca: string;
  imagen: string;
  precio: number;
  material: string;
  stock: number;
}

const API_URL = 'http://172.20.10.2:3000/glasses'; 

export const getGlasses = async (): Promise<Glasses[]> => {
  try {
    const response = await axios.get<Glasses[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching glasses:', error);
    throw error;
  }
};

export const getGlassesById = async (id: number): Promise<Glasses> => {
  try {
    const response = await axios.get<Glasses>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching glasses by id:', error);
    throw error;
  }
};

export const createGlasses = async (glassesData: Omit<Glasses, 'id'>): Promise<Glasses> => {
  try {
    const response = await axios.post<Glasses>(API_URL, glassesData);
    return response.data;
  } catch (error) {
    console.error('Error creating glasses:', error);
    throw error;
  }
}; 
import { LoginSchema } from "@/types/schemas";

interface LoginResponse {
    access_token: string;
}

const API_URL = 'http://172.20.10.2:3000/auth';

export const login = async (credentials: LoginSchema): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Error en la autenticación');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
}; 
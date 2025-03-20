import { LoginSchema, UserSchema } from "@/types/schemas";
import { URL } from "@/types/api";

interface LoginResponse {
    access_token: string;
}

export const login = async (credentials: LoginSchema): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${URL}/auth/login`, {
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

export const register = async (credentials: UserSchema): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${URL}/auth/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error('Error en el registro');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
};

export const validateUser = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${URL}/auth/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    
        if (!response.ok) {
            throw new Error('Error en la validación');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en la validación:', error);
        throw error;
    }
};
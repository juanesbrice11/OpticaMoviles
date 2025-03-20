import { ClientBd } from "@/types/api";
import { URL } from "@/types/api";

interface ClientResponse {
    statusCode: number;
    message: string;
    client: ClientBd;
}

export const getClients = async (): Promise<ClientBd[]> => {
    try {
        const response = await fetch(`${URL}/clients`);
        const data = await response.json();
        return data.clients;
    } catch (error) {
        console.error('Error fetching clients:', error);
        throw error;
    }
};

export const createClient = async (clientData: ClientBd): Promise<ClientBd> => {
    try {
        const response = await fetch(`${URL}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error('Error al crear el cliente');
        }

        const data = await response.json();
        return data.client;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
}; 

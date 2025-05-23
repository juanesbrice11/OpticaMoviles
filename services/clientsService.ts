import { ClientBd } from "@/types/api";
import { URL } from "@/types/api";

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

export const getClientById = async (id: string): Promise<ClientBd> => {
    try {
        const response = await fetch(`${URL}/clients/${id}`);
        const data = await response.json();
        return data.client;
    } catch (error) {
        console.error('Error fetching client by id:', error);
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

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al crear el cliente');
        }

        return data.client;
    } catch (error) {
        console.error('Error creating client:', error);
        throw error;
    }
};

export const updateClient = async (id: string, clientData: ClientBd): Promise<ClientBd> => {
    try {
        const response = await fetch(`${URL}/clients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el cliente');
        }

        const data = await response.json();
        return data.client;
    } catch (error) {
        console.error('Error updating client:', error);
        throw error;
    }
};

export const deleteClient = async (id: string): Promise<{ message: string; hasSales?: boolean; salesIds?: number[] }> => {
    try {
        const response = await fetch(`${URL}/clients/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json();

        if (!response.ok) {
            if (response.status === 409) {
                return {
                    message: data.message,
                    hasSales: data.hasSales,
                    salesIds: data.salesIds
                };
            }
            throw new Error(data.message || 'Error al eliminar el cliente');
        }

        return data;
    } catch (error) {
        console.error('Error deleting client:', error);
        throw error;
    }
};

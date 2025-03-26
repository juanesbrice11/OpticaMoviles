import { URL } from "@/types/api";
import { ClinicalHistory } from "@/types/api";

interface ClinicalHistoryResponse {
    statusCode: number;
    message: string;
    history: ClinicalHistory;
}

export const getClinicalHistories = async (): Promise<ClinicalHistory[]> => {
    try {
        const response = await fetch(`${URL}/clinical-histories`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching clinical histories:', error);
        throw error;
    }
};

export const getClinicalHistoryById = async (id: string): Promise<ClinicalHistory> => {
    try {
        const response = await fetch(`${URL}/clinical-histories/${id}`);
        const data = await response.json();
        return data.history;
    } catch (error) {
        console.error('Error fetching clinical history by id:', error);
        throw error;
    }
};

export const createClinicalHistory = async (historyData: ClinicalHistory): Promise<ClinicalHistory> => {
    try {
        const response = await fetch(`${URL}/clinical-histories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(historyData)
        });

        if (!response.ok) {
            throw new Error('Error al crear la historia clínica');
        }

        const data = await response.json();
        return data.history;
    } catch (error) {
        console.error('Error creating clinical history:', error);
        throw error;
    }
};

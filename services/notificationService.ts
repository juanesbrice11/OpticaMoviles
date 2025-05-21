import { URL } from "@/types/api";
import { DeviceToken } from "@/types/api";

export const registerDeviceToken = async (deviceToken: DeviceToken, token: string) => {
    try {
        const response = await fetch(`${URL}/device-tokens/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(deviceToken),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Server response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al registrar token:', error);
        throw error;
    }
};

export const deactiveDeviceToken = async (deviceToken: DeviceToken, token: string) => {
    try {
        const response = await fetch(`${URL}/device-tokens/deactivate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(deviceToken),
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error('Server response:', errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error al desactivar token:', error);
        throw error;
    }
};

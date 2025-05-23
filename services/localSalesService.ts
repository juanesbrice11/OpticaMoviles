import * as SQLite from 'expo-sqlite';
import { db } from '@/db';
import { sales } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createSale } from './salesService';

export interface LocalSale {
    id: number;
    clientId: string;
    glassesId: number;
    total: number;
    date: string;
    status: string;
    }

export const getLocalSales = async (): Promise<LocalSale[]> => {
    try {
        const result = await db.select().from(sales);
        return result.map(sale => ({
            id: sale.id,
            clientId: sale.clientId,
            glassesId: sale.glassesId,
            total: sale.total,
            date: sale.date,
            status: sale.status
        }));
    } catch (error) {
        console.error('Error obteniendo ventas locales:', error);
        throw error;
    }
};

export const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const createLocalSale = async (saleData: {
    clientId: string;
    glassesId: number;
    total: number;
    date: string;
}): Promise<{
    id: number;
    clientId: string;
    glassesId: number;
    total: number;
    date: string;
}> => {
    try {
        const formattedDate = formatDate(new Date(saleData.date));

        const result = await db.insert(sales).values({
            clientId: saleData.clientId,
            glassesId: saleData.glassesId,
            total: saleData.total,
            date: formattedDate,
            status: 'pending'
        }).returning();

        return {
            id: result[0].id,
            clientId: result[0].clientId,
            glassesId: result[0].glassesId,
            total: result[0].total,
            date: result[0].date
        };
    } catch (error) {
        console.error('Error creando venta local:', error);
        throw error;
    }
};

export const clearSalesTable = async (): Promise<void> => {
    try {
        await db.delete(sales);
        console.log('Tabla de ventas limpiada exitosamente');
    } catch (error) {
        console.error('Error limpiando tabla de ventas:', error);
        throw error;
    }
};

export const dropSalesTable = async (): Promise<void> => {
    try {
        const connection = SQLite.openDatabaseSync('optica.db');
        connection.closeSync();
        SQLite.deleteDatabaseAsync('optica.db');
        console.log('Base de datos eliminada exitosamente');
    } catch (error) {
        console.error('Error eliminando base de datos:', error);
        throw error;
    }
};

export const syncSales = async (): Promise<void> => {
    try {
        // 1. Obtener todas las ventas locales que tengan status 'pending'
        const pendingSales = await db
            .select()
            .from(sales)
            .where(eq(sales.status, 'pending'));

        // 2. Para cada venta pendiente, intentar sincronizar con el backend
        for (const sale of pendingSales) {
            try {
                // 3. Crear la venta en el backend con solo los campos necesarios
                await createSale({
                    clientId: sale.clientId,
                    glassesId: sale.glassesId,
                    total: sale.total,
                    date: sale.date
                });

                // 4. Si la sincronización fue exitosa, actualizar el status a 'synced'
                await db
                    .update(sales)
                    .set({ status: 'synced' })
                    .where(eq(sales.id, sale.id));

            } catch (error) {
                console.error(`Error sincronizando venta ${sale.id}:`, error);
                // La venta seguirá con status 'pending' para intentar sincronizar después
            }
        }

        console.log('Sincronización completada');
    } catch (error) {
        console.error('Error en el proceso de sincronización:', error);
        throw error;
    }
};
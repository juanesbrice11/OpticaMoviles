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
        const pendingSales = await db
            .select()
            .from(sales)
            .where(eq(sales.status, 'pending'));

        // Añadir un control de ventas en proceso de sincronización
        const syncingIds = new Set();

        for (const sale of pendingSales) {
            // Evitar sincronizar la misma venta múltiples veces
            if (syncingIds.has(sale.id)) continue;

            try {
                syncingIds.add(sale.id);

                // Marcar como "syncing" antes de intentar sincronizar
                await db
                    .update(sales)
                    .set({ status: 'syncing' })
                    .where(eq(sales.id, sale.id));

                await createSale({
                    clientId: sale.clientId,
                    glassesId: sale.glassesId,
                    total: sale.total,
                    date: sale.date
                });

                await db
                    .update(sales)
                    .set({ status: 'synced' })
                    .where(eq(sales.id, sale.id));

                syncingIds.delete(sale.id);
            } catch (error) {
                // Si falla, volver a "pending"
                await db
                    .update(sales)
                    .set({ status: 'pending' })
                    .where(eq(sales.id, sale.id));

                syncingIds.delete(sale.id);
                console.error(`Error sincronizando venta ${sale.id}:`, error);
            }
        }
    } catch (error) {
        console.error('Error en el proceso de sincronización:', error);
        throw error;
    }
};
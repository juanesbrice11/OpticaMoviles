import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { clearSalesTable, createLocalSale, dropSalesTable, formatDate, getLocalSales, syncSales } from '@/services/localSalesService';
import { db } from '@/db';

export default function TestSQLite() {
    const [sales, setSales] = useState<any[]>([]);
    const [testStatus, setTestStatus] = useState<string>('');

    const testCreateSale = async () => {
        try {
            setTestStatus('Creando venta de prueba...');

            const today = new Date();
            const formattedDate = formatDate(today);

            const newSale = await createLocalSale({
                clientId: "1",
                glassesId: 1,
                total: 100000,
                date: formattedDate
            });

            setTestStatus('Venta creada exitosamente');
            loadSales();
        } catch (error) {
            setTestStatus(`Error creando venta: ${error}`);
        }
    };

    const clearData = async () => {
        try {
            setTestStatus('Limpiando tabla de ventas...');
            await clearSalesTable();
            setTestStatus('Tabla de ventas limpiada exitosamente');
            loadSales(); // Recargar la lista vacía
        } catch (error) {
            setTestStatus(`Error limpiando datos: ${error}`);
        }
    };

    const loadSales = async () => {
        try {
            setTestStatus('Cargando ventas...');
            const localSales = await getLocalSales();
            setSales(localSales);
            setTestStatus(`${localSales.length} ventas encontradas`);
        } catch (error) {
            setTestStatus(`Error cargando ventas: ${error}`);
        }
    };

    const testSync = async () => {
        try {
            setTestStatus('Sincronizando ventas...');
            await syncSales();
            setTestStatus('Sincronización completada');
            loadSales();
        } catch (error) {
            setTestStatus(`Error sincronizando: ${error}`);
        }
    };

    useEffect(() => {
        loadSales();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Prueba SQLite</Text>

            <Button
                title="Crear Venta de Prueba"
                onPress={testCreateSale}
            />

            <Button
                title="Cargar Ventas"
                onPress={loadSales}
            />

            <Button
                title="Limpiar Tabla de Ventas"
                onPress={clearData}
                color="orange"
            />

            <Button
                title="Sincronizar"
                onPress={testSync}
            />

            <Button
                title="Eliminar tabla de ventas"
                onPress={async () => {
                    try {
                        await dropSalesTable();
                    } catch (error) {
                        console.log(error);
                    }
                }}
            />

            <Text style={{ marginVertical: 10, color: 'blue' }}>
                Status: {testStatus}
            </Text>

            <ScrollView style={{ maxHeight: 400 }}>
                <Text style={{ fontWeight: 'bold' }}>Ventas en SQLite:</Text>
                {sales.map((sale, index) => (
                    <View key={index} style={{ marginVertical: 10, padding: 10, backgroundColor: '#f0f0f0' }}>
                        <Text>ID: {sale.id}</Text>
                        <Text>Cliente: {sale.clientId}</Text>
                        <Text>Gafas: {sale.glassesId}</Text>
                        <Text>Total: ${sale.total}</Text>
                        <Text>Fecha: {sale.date}</Text>
                        <Text>Status: {sale.status}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';

const connection = SQLite.openDatabaseSync('optica.db');

connection.execSync(`
  CREATE TABLE IF NOT EXISTS sales (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    clientId TEXT NOT NULL,
    glassesId INTEGER NOT NULL,
    total REAL NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
  );
`);

try {
  const result = connection.execSync('SELECT name FROM sqlite_master WHERE type="table" AND name="sales";');
  console.log('Tablas existentes:', result);
} catch (error) {
  console.error('Error verificando tablas:', error);
}

export const db = drizzle(connection, { schema });

console.log('Base de datos inicializada');
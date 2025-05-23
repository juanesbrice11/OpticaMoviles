import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import * as schema from './schema';
import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '../drizzle/migrations';


const connection = SQLite.openDatabaseSync('optica.db');
const db = drizzle(connection, { schema });

try {
  migrate(db, migrations);
  console.log('Migraciones aplicadas correctamente');
} catch (error) {
  console.error('Error aplicando migraciones:', error);
}

export { db };

console.log('Base de datos inicializada');
// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';

const migrations = {
    "0000_initial_sales": `
        CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            clientId TEXT NOT NULL,
            glassesId INTEGER NOT NULL,
            total REAL NOT NULL,
            date TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending'
        );

    CREATE INDEX IF NOT EXISTS sales_clientId_idx ON sales(clientId);
    CREATE INDEX IF NOT EXISTS sales_glassesId_idx ON sales(glassesId);
    CREATE INDEX IF NOT EXISTS sales_date_idx ON sales(date);
  `
};

export default {
  journal,
  migrations
};

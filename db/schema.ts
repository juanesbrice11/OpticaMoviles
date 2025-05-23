import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const sales = sqliteTable("sales", {
    id: integer("id").primaryKey({autoIncrement: true}),
    clientId: text("clientId").notNull(),
    glassesId: integer("glassesId").notNull(),
    total: real("total").notNull(),
    date: text("date").notNull(),
    status: text("status").notNull().default('pending')
});

export type Sales = typeof sales.$inferSelect;
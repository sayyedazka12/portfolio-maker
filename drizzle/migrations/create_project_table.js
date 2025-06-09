import { pgTable, serial, varchar, text, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const project = pgTable('project', {
    id: serial('id').primaryKey(),
    name: varchar('name'),
    desc: text('desc'),
    url: varchar('url').notNull(),
    logo: varchar('logo'),
    banner: varchar('banner'),
    category: varchar('category'),
    activeStatus: boolean('activeStatus').notNull(),
    emailRef: varchar('emailRef'),
    userRef: integer('userRef').notNull().references(() => userInfo.id),
    showGraph: boolean('showGraph')
});

// Migration function to create the project table
export const createProjectTable = async (db) => {
    await db.schema.createTable(project);
};

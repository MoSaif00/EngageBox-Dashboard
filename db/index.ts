// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema'

const connectionEnv = process.env.DATABASE_URL || 'postgres://localhost:5432/drizzle';

const client = postgres(connectionEnv)
export const db = drizzle(client, {schema})

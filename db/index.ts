// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionEnv = process.env.DATABASE_URL || 'postgres://localhost:5432/drizzle';

// Serverless-friendly settings for Supabase / Vercel:
// - prepare: false is required for Supabase transaction pooler
// - max: 1 avoids exhausting connections across function instances
const client = postgres(connectionEnv, {
  prepare: false,
  max: 1,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(client, { schema });

// src/services/db.ts
import { Pool } from 'pg';

// Define a connection pool to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for managed cloud databases like Neon
  },
});

// Define and export a type-safe query function
export const query = (text: string, params?: any[]): Promise<any> => {
  return pool.query(text, params);
};

export {};

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '@/configs';
import logger from '@/configs/loggerConfig';

// Create Postgres connection pool
const pool = new Pool({
  connectionString: config.DATABASE_URL,
});

// Drizzle ORM instance
export const db = drizzle(pool);

// Function to test DB connection
export const isDBConnected = async () => {
  try {
    const res = await pool.query('SELECT NOW()');

    if (res.rows[0]) {
      logger.info('✅ Database connection successful:', res.rows[0]);
      return true;
    }

    logger.warn('⚠️ Database connection query returned no rows');
  } catch (err) {
    logger.error(err, '❌ Database connection failed');
    process.exit(1);
  }
};

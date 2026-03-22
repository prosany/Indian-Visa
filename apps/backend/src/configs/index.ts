import { productionDomains, stageDomains } from '@/constants/cors-domains';
import env from 'dotenv';

env.config();

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
};

export const corsConfigs = {
  origin: config.NODE_ENV === 'production' ? productionDomains : stageDomains,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

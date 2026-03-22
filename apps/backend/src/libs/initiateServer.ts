import express, { Express } from 'express';
import { createServer } from 'http';

export const app: Express = express();
export const server = createServer(app);

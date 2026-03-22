import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import path from 'path';

import { corsConfigs } from '@/configs';
import { app } from '@/libs/initiateServer';
import { xss } from '@/middlewares/sanitize.middleware';
import errorHandler, { notFound } from '@/middlewares/errorHandler.middleware';

// enable cors
app.use(cors(corsConfigs));
app.options(/.*/, cors(corsConfigs));

// parse cookies
app.use(cookieParser());

// body parser
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(express.json({ limit: '100mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// trust proxy
app.set('trust proxy', true);

// sanitize request data
app.use(xss);
app.use(expressMongoSanitize());

// gzip compression
app.use(compression());

// security headers
app.use(helmet());

// global error handler
app.use(notFound);
app.use(errorHandler);

export default app;

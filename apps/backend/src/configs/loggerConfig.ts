import { config } from '@/configs';
import pino from 'pino';

// Existing Pino logger setup
const logger = pino({
  level: config.NODE_ENV === 'production' ? 'info' : 'debug',
  transport:
    config.NODE_ENV === 'production'
      ? undefined
      : {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname',
          },
        },
});

// Function to log errors with structured data
export const logError = (err: Error) => {
  // Extract the second line of the stack trace (it typically contains the path and line number)
  const stack = err.stack?.split('\n')[1];

  // Improved regex to capture path, line, and column number
  const match = stack?.match(/at (.*):(\d+):(\d+)/);

  // Log the error with structured fields
  logger.debug({
    type: err.name,
    message: err.message, // Error message
    path: match ? match[1] : 'unknown', // Extracted path from the stack trace
    lineNumber: match ? match[2] : 'unknown', // Extracted line number
  });
};

export default logger;

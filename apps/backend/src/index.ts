import '@/app';
import { config } from '@/configs';
import { server } from '@/libs/initiateServer';
import logger from '@/configs/loggerConfig';
import { isDBConnected } from '@/libs/initiateDatabase';

const serverInstance = server.listen(config.PORT, async () => {
  await isDBConnected();
  logger.info(`Server running on port ${config.PORT}`);
});

process.on('SIGINT', () => {
  serverInstance.close(async () => {
    logger.warn('SIGINT | Process terminated');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  serverInstance.close(async () => {
    logger.warn('SIGTERM | Process terminated');
    process.exit(0);
  });
});

import Fastify from 'fastify';
import { registerAvailabilityRoutes } from './availability.js';
import { registerBookingRoutes } from './bookings.js';
import { disconnectPrisma } from './prisma.js';

const app = Fastify({
  logger: true,
});

app.get('/health', async () => ({
  status: 'ok',
  service: 'lbc-api',
}));

registerAvailabilityRoutes(app);
registerBookingRoutes(app);

app.addHook('onClose', async () => {
  await disconnectPrisma();
});

const parsePort = (value: string | undefined) => {
  const port = Number(value ?? 3000);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT value: ${value}`);
  }

  return port;
};

const start = async () => {
  const port = parsePort(process.env.PORT);
  const host = process.env.HOST ?? '127.0.0.1';

  await app.listen({ port, host });
};

start().catch((error) => {
  app.log.error(error);
  process.exit(1);
});

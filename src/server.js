import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { json } from 'express';
import {
  setupErrorHandler,
  setupNotFoundHandler,
} from './middlewares/errorHandler.js';
import contactsRouter from './routers/contacts.js';

export const setupServer = () => {
  const app = express();

  app.set('etag', false);

  app.use(json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('/api/contacts', contactsRouter);

  app.use(setupNotFoundHandler);

  app.use(setupErrorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

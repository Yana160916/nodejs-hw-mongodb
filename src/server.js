import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.set('etag', false);

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 'success',
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: `Error fetching contacts: ${error.message}`,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId: id } = req.params;
    try {
      const contact = await getContactById(id);

      if (!contact) {
        return res.status(404).json({
          status: 'error',
          message: 'Contact not found!',
        });
      }

      res.status(200).json({
        status: 'success',
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: `Error fetching contact: ${error.message}`,
      });
    }
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 'error',
      message: 'Not found',
    });
  });

  app.use((err, req, res) => {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: err.message,
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

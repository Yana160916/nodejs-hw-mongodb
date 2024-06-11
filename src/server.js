import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getAllStudents, getStudentById } from './services/contacts.js';
import mongoose from 'mongoose';

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/students', async (req, res) => {
    try {
      const students = await getAllStudents();
      res.status(200).json({
        status: 'success',
        message: 'Successfully found students!',
        data: students,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: `Error fetching students: ${error.message}`,
      });
    }
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(404).json({
        status: 404,
        message: `Student with id ${studentId} not found`,
      });
    }
    const student = await getStudentById(studentId);

    if (!student) {
      return res.status(404).json({
        status: 404,
        message: `Student with id ${studentId} not found`,
      });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found student with id ${studentId}!`,
      data: student,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

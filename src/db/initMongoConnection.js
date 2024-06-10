import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  try {
    const MONGODB_USER = process.env.MONGODB_USER;
    const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
    const MONGODB_URL = process.env.MONGODB_URL;
    const MONGODB_DB = process.env.MONGODB_DB;

    const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Mongo connection error:', error);
  }
};

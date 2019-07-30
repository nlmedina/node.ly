import mongoose, { Mongoose } from 'mongoose';

export default function connectMongoDB(): Promise<Mongoose> {
  if (!process.env.MONGO_DSN) {
    throw new Error('Missing MONGO_DSN environment variable.');
  }

  return mongoose.connect(encodeURI(process.env.MONGO_DSN), { useNewUrlParser: true, useCreateIndex: true });
}

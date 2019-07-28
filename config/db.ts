import mongoose, { Mongoose } from 'mongoose';

const { MONGODB_HOST, MONGODB_PORT, MONGODB_DB_NAME, MONGODB_USER, MONGODB_PASS } = process.env;

export default function connectMongoDB(): Promise<Mongoose> {
  return mongoose.connect(
    `mongodb://${MONGODB_USER}:${encodeURIComponent(
      `${MONGODB_PASS}`
    )}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB_NAME}?authSource=admin`,
    { useNewUrlParser: true, useCreateIndex: true }
  );
}

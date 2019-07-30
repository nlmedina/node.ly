import { default as express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import { AddressInfo } from 'net';
import connectMongoDB from './config/db';

interface MiddlewareError extends Error {
  status?: number;
}

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const app = express();

app.use(cors());

if (!isTest) {
  app.use(morgan('combined'));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
  app.use(errorHandler());
}

app.get('/', (_req, res): void => {
  res.json({
    status: 'It works!'
  });
});

if (!isProduction) {
  app.use((err: MiddlewareError, _req: Request, res: Response, _next: NextFunction): void => {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

connectMongoDB()
  .then((): void => {
    console.log('DB connected.');

    const server = app.listen(process.env.PORT || 3000, (): void => {
      const { port } = server.address() as AddressInfo;
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((e): void => {
    console.error(e);
  });

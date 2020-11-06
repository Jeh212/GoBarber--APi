import "reflect-metadata"
import 'dotenv/config';
import express, { Response, NextFunction, Request } from 'express';
import {errors} from 'celebrate'
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadFolder));
app.use(routes);

app.use(errors());
app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal SERVER Error',
    });
  },
);
app.listen(3333, () => {
  console.log('Servidor rodando');
});

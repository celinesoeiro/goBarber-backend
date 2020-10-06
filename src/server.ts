import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';

import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();

app.use(cors());

app.use(express.json());

// Rota pra acessar os caminhos das imagens atraves do browser
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Middleware para tratativa global de errors
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError){
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log(err);
    
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
})

app.listen(3333, ()=>{
  console.log('Servidor rodando na porta 3333! ✌')
});
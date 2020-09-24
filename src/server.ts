import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
// Rota pra acessar os caminhos das imagens atraves do browser
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, ()=>{
  console.log('Servidor rodando na porta 3333! ✌')
});
import { createConnection } from 'typeorm';

createConnection();
// Procura em todo o projeto um arquivo chamado ormconfig.json.
// Quando encontra ele importa e já faz a conexão com o db
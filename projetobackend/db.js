require('dotenv').config();
const { Client } = require('pg');

// Configurações do banco de dados
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Comando SQL para criar a tabela
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone BIGINT,
    datanascimento DATE,
    senha VARCHAR(255) NOT NULL
  );
`;

async function createTable() {
  try {
    await client.connect();
    await client.query(createTableQuery);
    console.log('✅ Tabela "usuarios" criada com sucesso.');
  } catch (err) {
    console.error('❌ Erro ao criar tabela:', err.message);
  } finally {
    await client.end();
  }
}

createTable();
require('dotenv').config();
const { Client } = require('pg');

const clientConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};






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
  const client = new Client(clientConfig);
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

async function selectCustomers() {
  const client = new Client(clientConfig);
  await client.connect();
  const result = await client.query('SELECT * FROM usuarios');
  await client.end();
  return result.rows;
}

async function selectCustomer(id) {
  const client = new Client(clientConfig);
  await client.connect();
  const result = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  await client.end();
  return result.rows[0];
}

async function insertCustomer(data) {
  const { nome, cpf, telefone, nascimento, senha } = data;
  const client = new Client(clientConfig);
  await client.connect();
  await client.query(
    'INSERT INTO usuarios (nome, cpf, telefone, datanascimento, senha) VALUES ($1, $2, $3, $4, $5)',
    [nome, cpf, telefone, nascimento, senha]
  );
  await client.end();
}

async function updateCustomer(id, data) {
  const { nome, cpf, telefone, nascimento, senha } = data;
  const client = new Client(clientConfig);
  await client.connect();
  await client.query(
    'UPDATE usuarios SET nome = $1, cpf = $2, telefone = $3, nascimento = $4, senha = $5 WHERE id = $6',
    [nome, cpf, telefone, datanascimento, senha, id]
  );
  await client.end();
}

async function deleteCustomer(id) {
  const client = new Client(clientConfig);
  await client.connect();
  await client.query('DELETE FROM usuarios WHERE id = $1', [id]);
  await client.end();
}

module.exports = {
  createTable,
  selectCustomers,
  selectCustomer,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
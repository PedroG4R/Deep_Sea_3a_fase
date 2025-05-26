require('dotenv').config();
const { Client } = require('pg');

const clientConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Queries para criação das tabelas
const createCategoriaTable = `
  CREATE TABLE IF NOT EXISTS categoria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30)
  );
`;

const createProdutosTable = `
  CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT NOT NULL,
    preco BIGINT,
    imagem TEXT,
    estoque INTEGER NOT NULL,
    id_categoria INTEGER,
    FOREIGN KEY (id_categoria) REFERENCES categoria (id) ON UPDATE CASCADE ON DELETE RESTRICT
  );
`;

const createUsuariosTable = `
  CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    telefone BIGINT,
    datanascimento DATE,
    senha VARCHAR(255) NOT NULL,
    adm BOOLEAN NOT NULL DEFAULT false
  );
`;

const createVendaTable = `
  CREATE TABLE IF NOT EXISTS venda (
    id SERIAL PRIMARY KEY,
    data_venda DATE NOT NULL,
    numero_nf VARCHAR(60),
    subtotal MONEY DEFAULT 0,
    desconto MONEY DEFAULT 0,
    imposto MONEY DEFAULT 0,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE RESTRICT
  );
`;

const createItensVendaTable = `
  CREATE TABLE IF NOT EXISTS itens_venda (
    id SERIAL PRIMARY KEY,
    id_produto INTEGER NOT NULL,
    id_venda INTEGER NOT NULL,
    quantidade INTEGER NOT NULL,
    valor_unit MONEY NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produtos (id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (id_venda) REFERENCES venda (id) ON UPDATE CASCADE ON DELETE CASCADE
  );
`;

const createEnderecoTable = `
  CREATE TABLE IF NOT EXISTS endereco (
    id SERIAL PRIMARY KEY,
    cep VARCHAR(8),
    numero VARCHAR(10),
    complemento VARCHAR(30),
    id_produto INTEGER,
    id_usuario INTEGER,
    FOREIGN KEY (id_produto) REFERENCES produtos (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id) ON UPDATE CASCADE ON DELETE CASCADE
  );
`;

// Função para criar todas as tabelas
async function createTables() {
  const client = new Client(clientConfig);
  try {
    await client.connect();
    await client.query(createCategoriaTable);
    await client.query(createProdutosTable);
    await client.query(createUsuariosTable);
    await client.query(createVendaTable);
    await client.query(createItensVendaTable);
    await client.query(createEnderecoTable);
    console.log('✅ Todas as tabelas criadas com sucesso.');
  } catch (err) {
    console.error('❌ Erro ao criar tabelas:', err.message);
  } finally {
    await client.end();
  }
}

// --- FUNÇÕES CRUD ---

// --- Categoria ---
async function insertCategoria(data) {
  const client = new Client(clientConfig);
  await client.connect();
  await client.query('INSERT INTO categoria (nome) VALUES ($1)', [data.nome]);
  await client.end();
}

async function selectCategorias() {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM categoria');
  await client.end();
  return res.rows;
}

// --- Produtos ---
async function insertProduto(data) {
  const client = new Client(clientConfig);
  await client.connect();
  const { nome, descricao, preco, imagem, estoque, id_categoria } = data;
  await client.query(
    'INSERT INTO produtos (nome, descricao, preco, imagem, estoque, id_categoria) VALUES ($1, $2, $3, $4, $5, $6)',
    [nome, descricao, preco, imagem, estoque, id_categoria]
  );
  await client.end();
}

async function selectProdutos() {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM produtos');
  await client.end();
  return res.rows;
}

// --- Usuarios ---
async function insertUsuario(data) { 
  console.log("dados chegando: ", data)
  const client = new Client(clientConfig);
  await client.connect();
  const { nome, cpf, telefone, datanascimento, senha, adm } = data;
  await client.query(
    'INSERT INTO usuarios (nome, cpf, telefone, datanascimento, senha, adm) VALUES ($1, $2, $3, $4, $5, $6)',
    [nome, cpf, telefone, datanascimento, senha, adm || false]
  );
  await client.end();
}

async function selectUsuarios() {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM usuarios');
  await client.end();
  return res.rows;
}

async function selectUsuarioById(id) {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  await client.end();
  return res.rows[0];
}

async function updateUsuario(id, data) {
  const client = new Client(clientConfig);
  await client.connect();
  const { nome, cpf, telefone, datanascimento, senha, adm } = data;
  await client.query(
    `UPDATE usuarios SET nome=$1, cpf=$2, telefone=$3, datanascimento=$4, senha=$5, adm=$6 WHERE id=$7`,
    [nome, cpf, telefone, datanascimento, senha, adm, id]
  );
  await client.end();
}

async function deleteUsuario(id) {
  const client = new Client(clientConfig);
  await client.connect();
  await client.query('DELETE FROM usuarios WHERE id=$1', [id]);
  await client.end();
}

// --- Venda ---
async function insertVenda(data) {
  const client = new Client(clientConfig);
  await client.connect();
  const { data_venda, numero_nf, subtotal, desconto, imposto, id_usuario } = data;
  await client.query(
    `INSERT INTO venda (data_venda, numero_nf, subtotal, desconto, imposto, id_usuario)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [data_venda, numero_nf, subtotal, desconto, imposto, id_usuario]
  );
  await client.end();
}

async function selectVendas() {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM venda');
  await client.end();
  return res.rows;
}

// --- Itens Venda ---
async function insertItemVenda(data) {
  const client = new Client(clientConfig);
  await client.connect();
  const { id_produto, id_venda, quantidade, valor_unit } = data;
  await client.query(
    `INSERT INTO itens_venda (id_produto, id_venda, quantidade, valor_unit)
     VALUES ($1, $2, $3, $4)`,
    [id_produto, id_venda, quantidade, valor_unit]
  );
  await client.end();
}

async function selectItensVenda() {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM itens_venda');
  await client.end();
  return res.rows;
}

// --- Endereco ---
async function insertEndereco(data) {
  const client = new Client(clientConfig);
  await client.connect();
  const { cep, numero, complemento, id_produto, id_usuario } = data;
  await client.query(
    `INSERT INTO endereco (cep, numero, complemento, id_produto, id_usuario)
     VALUES ($1, $2, $3, $4, $5)`,
    [cep, numero, complemento, id_produto, id_usuario]
  );
  await client.end();
}

async function selectEnderecos() {
  const client = new Client(clientConfig);
  await client.connect();
  const res = await client.query('SELECT * FROM endereco');
  await client.end();
  return res.rows;
}

module.exports = {
  createTables,

  // Categoria
  insertCategoria,
  selectCategorias,

  // Produtos
  insertProduto,
  selectProdutos,

  // Usuarios
  insertUsuario,
  selectUsuarios,
  selectUsuarioById,
  updateUsuario,
  deleteUsuario,

  // Venda
  insertVenda,
  selectVendas,

  // Itens Venda
  insertItemVenda,
  selectItensVenda,

  // Endereco
  insertEndereco,
  selectEnderecos,
};
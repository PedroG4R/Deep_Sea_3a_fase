require('dotenv').config();
const { Client } = require('pg');

const clientConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function query(sql, params = []) {
  const client = new Client(clientConfig);
  await client.connect();
  const result = await client.query(sql, params);
  await client.end();
  return result;
}

async function createUsuariosTable() {
  const sql = `
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
  await query(sql);
}

async function insertUsuario(data) {
  const { nome, cpf, telefone, datanascimento, senha, adm = false } = data;
  await query(
    `INSERT INTO usuarios (nome, cpf, telefone, datanascimento, senha, adm)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [nome, cpf, telefone, datanascimento, senha, adm]
  );
}

async function selectUsuarios() {
  const res = await query('SELECT * FROM usuarios');
  return res.rows;
}

async function selectUsuario(id) {
  const res = await query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return res.rows[0];
}

async function updateUsuario(id, data) {
  const { nome, cpf, telefone, datanascimento, senha, adm } = data;
  await query(
    `UPDATE usuarios SET nome=$1, cpf=$2, telefone=$3, datanascimento=$4, senha=$5, adm=$6 WHERE id=$7`,
    [nome, cpf, telefone, datanascimento, senha, adm, id]
  );
}

async function deleteUsuario(id) {
  await query('DELETE FROM usuarios WHERE id=$1', [id]);
}

async function insertCategoria(nome) {
  await query(`INSERT INTO categoria (nome) VALUES ($1)`, [nome]);
}

async function selectCategorias() {
  const res = await query('SELECT * FROM categoria');
  return res.rows;
}

async function insertProduto(data) {
  const { nome, descricao, preco, imagem, estoque, id_categoria } = data;
  await query(
    `INSERT INTO produtos (nome, descricao, preco, imagem, estoque, id_categoria)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [nome, descricao, preco, imagem, estoque, id_categoria]
  );
}

async function selectProdutos() {
  const res = await query('SELECT * FROM produtos');
  return res.rows;
}

async function deleteProduto(id) {
  await query('DELETE FROM produtos WHERE id = $1', [id]);
}

async function insertVenda(data) {
  const { data_venda, numero_nf, subtotal, desconto, imposto, id_usuario } = data;
  await query(
    `INSERT INTO venda (data_venda, numero_nf, subtotal, desconto, imposto, id_usuario)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [data_venda, numero_nf, subtotal, desconto, imposto, id_usuario]
  );
}

async function selectVendas() {
  const res = await query('SELECT * FROM venda');
  return res.rows;
}

async function insertItemVenda(data) {
  const { id_produto, id_venda, quantidade, valor_unit } = data;
  await query(
    `INSERT INTO itens_venda (id_produto, id_venda, quantidade, valor_unit)
     VALUES ($1, $2, $3, $4)`,
    [id_produto, id_venda, quantidade, valor_unit]
  );
}

async function selectItensVenda() {
  const res = await query('SELECT * FROM itens_venda');
  return res.rows;
}


async function insertEndereco(data) {
  const { cep, numero, complemento, id_produto, id_usuario } = data;
  await query(
    `INSERT INTO endereco (cep, numero, complemento, id_produto, id_usuario)
     VALUES ($1, $2, $3, $4, $5)`,
    [cep, numero, complemento, id_produto, id_usuario]
  );
}

async function selectEnderecos() {
  const res = await query('SELECT * FROM endereco');
  return res.rows;
}

module.exports = {
  query,

  createUsuariosTable,
  insertUsuario,
  selectUsuarios,
  selectUsuario,
  updateUsuario,
  deleteUsuario,

  insertCategoria,
  selectCategorias,

  insertProduto,
  selectProdutos,
  deleteProduto,

  insertVenda,
  selectVendas,

  insertItemVenda,
  selectItensVenda,

  insertEndereco,
  selectEnderecos
};

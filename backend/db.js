require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release();
  }
}

// USUÁRIOS
async function insertUsuario(data) {
  const { nome, cpf, telefone, email, datanascimento, senha, adm = false } = data;
  const result = await query(
    `INSERT INTO usuarios (nome, cpf, telefone, email, datanascimento, senha, adm)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [nome, cpf, telefone, email, datanascimento, senha, adm]
  );
  return result.rows[0];
}

async function selectUsuarios() {
  const result = await query('SELECT * FROM usuarios');
  return result.rows;
}

async function selectUsuarioById(id) {
  const result = await query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return result.rows[0];
}

// PRODUTOS
async function insertProduto(data) {
  const { nome, descricao, preco, imagem, estoque, id_categoria = null } = data;
  await query(
    `INSERT INTO produtos (nome, descricao, preco, imagem, estoque, id_categoria)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [nome, descricao, preco, imagem, estoque, id_categoria]
  );
}

async function selectProdutos() {
  const result = await query('SELECT * FROM produtos');
  return result.rows;
}

async function selectProdutoById(id) {
  const result = await query('SELECT * FROM produtos WHERE id = $1', [id]);
  return result.rows[0];
}

async function deleteProduto(id) {
  await query('DELETE FROM produtos WHERE id = $1', [id]);
}

module.exports = {
  query,
  insertUsuario,
  selectUsuarios,
  selectUsuarioById,
  insertProduto,
  selectProdutos,
  selectProdutoById,
  deleteProduto
};
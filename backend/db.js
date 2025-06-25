require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// USUÁRIOS
async function selectUsuarios() {
  const res = await pool.query('SELECT * FROM usuarios');
  return res.rows;
}

async function selectUsuarioById(id) {
  const res = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return res.rows[0];
}

async function selectUsuarioByEmail(email) {
  const res = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return res.rows[0];
}

async function insertUsuario(usuario) {
  const { nome, cpf, telefone, email, datanascimento, senha, adm = false } = usuario;
  const res = await pool.query(
    `INSERT INTO usuarios (nome, cpf, telefone, email, datanascimento, senha, adm)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [nome, cpf, telefone, email, datanascimento, senha, adm]
  );
  return res.rows[0];
}

async function updateUsuario(id, data) {
  const { nome, cpf, telefone, email, datanascimento, senha, adm } = data;
  await pool.query(
    `UPDATE usuarios SET nome=$1, cpf=$2, telefone=$3, email=$4, datanascimento=$5, senha=$6, adm=$7 WHERE id=$8`,
    [nome, cpf, telefone, email, datanascimento, senha, adm, id]
  );
}

async function deleteUsuario(id) {
  await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
}

// PRODUTOS
async function selectProdutos() {
  const res = await pool.query('SELECT * FROM produtos');
  return res.rows;
}

async function selectProdutoById(id) {
  const res = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
  return res.rows[0];
}

async function insertProduto(produto) {
  const { nome, descricao, preco, imagem, estoque, id_categoria = null } = produto;
  const res = await pool.query(
    `INSERT INTO produtos (nome, descricao, preco, imagem, estoque, id_categoria)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nome, descricao, preco, imagem, estoque, id_categoria]
  );
  return res.rows[0];
}

async function updateProduto(id, data) {
  const { nome, descricao, preco, imagem, estoque, id_categoria } = data;
  await pool.query(
    `UPDATE produtos SET nome=$1, descricao=$2, preco=$3, imagem=$4, estoque=$5, id_categoria=$6 WHERE id=$7`,
    [nome, descricao, preco, imagem, estoque, id_categoria, id]
  );
}

async function deleteProduto(id) {
  await pool.query('DELETE FROM produtos WHERE id = $1', [id]);
}

// CATEGORIAS
async function selectCategorias() {
  const res = await pool.query('SELECT * FROM categoria');
  return res.rows;
}

async function insertCategoria(nome) {
  const res = await pool.query(
    'INSERT INTO categoria (nome) VALUES ($1) RETURNING *',
    [nome]
  );
  return res.rows[0];
}

async function updateCategoria(id, nome) {
  await pool.query('UPDATE categoria SET nome = $1 WHERE id = $2', [nome, id]);
}

async function deleteCategoria(id) {
  await pool.query('DELETE FROM categoria WHERE id = $1', [id]);
}

// VENDAS
async function selectVendas() {
  const res = await pool.query('SELECT * FROM venda');
  return res.rows;
}

async function insertVenda(data) {
  const { data_venda, numero_nf, subtotal, desconto, imposto, id_usuario } = data;
  const res = await pool.query(
    `INSERT INTO venda (data_venda, numero_nf, subtotal, desconto, imposto, id_usuario)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [data_venda, numero_nf, subtotal, desconto, imposto, id_usuario]
  );
  return res.rows[0];
}

async function updateVenda(id, data) {
  const { data_venda, numero_nf, subtotal, desconto, imposto, id_usuario } = data;
  await pool.query(
    `UPDATE venda SET data_venda=$1, numero_nf=$2, subtotal=$3, desconto=$4, imposto=$5, id_usuario=$6 WHERE id=$7`,
    [data_venda, numero_nf, subtotal, desconto, imposto, id_usuario, id]
  );
}

async function deleteVenda(id) {
  await pool.query('DELETE FROM venda WHERE id = $1', [id]);
}

// ITENS_VENDA
async function selectItensVenda() {
  const res = await pool.query('SELECT * FROM itens_venda');
  return res.rows;
}

async function insertItemVenda(data) {
  const { id_produto, id_venda, quantidade, valor_unit } = data;
  const res = await pool.query(
    `INSERT INTO itens_venda (id_produto, id_venda, quantidade, valor_unit)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [id_produto, id_venda, quantidade, valor_unit]
  );
  return res.rows[0];
}

async function updateItemVenda(id, data) {
  const { id_produto, id_venda, quantidade, valor_unit } = data;
  await pool.query(
    `UPDATE itens_venda SET id_produto=$1, id_venda=$2, quantidade=$3, valor_unit=$4 WHERE id=$5`,
    [id_produto, id_venda, quantidade, valor_unit, id]
  );
}

async function deleteItemVenda(id) {
  await pool.query('DELETE FROM itens_venda WHERE id = $1', [id]);
}

// ENDEREÇOS
async function selectEnderecos() {
  const res = await pool.query('SELECT * FROM endereco');
  return res.rows;
}

async function insertEndereco(data) {
  const { cep, numero, complemento, id_produto, id_usuario } = data;
  const res = await pool.query(
    `INSERT INTO endereco (cep, numero, complemento, id_produto, id_usuario)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [cep, numero, complemento, id_produto, id_usuario]
  );
  return res.rows[0];
}

async function updateEndereco(id, data) {
  const { cep, numero, complemento, id_produto, id_usuario } = data;
  await pool.query(
    `UPDATE endereco SET cep=$1, numero=$2, complemento=$3, id_produto=$4, id_usuario=$5 WHERE id=$6`,
    [cep, numero, complemento, id_produto, id_usuario, id]
  );
}

async function deleteEndereco(id) {
  await pool.query('DELETE FROM endereco WHERE id = $1', [id]);
}

module.exports = {
  selectUsuarios,
  selectUsuarioById,
  selectUsuarioByEmail,
  insertUsuario,
  updateUsuario,
  deleteUsuario,

  selectProdutos,
  selectProdutoById,
  insertProduto,
  updateProduto,
  deleteProduto,

  selectCategorias,
  insertCategoria,
  updateCategoria,
  deleteCategoria,

  selectVendas,
  insertVenda,
  updateVenda,
  deleteVenda,

  selectItensVenda,
  insertItemVenda,
  updateItemVenda,
  deleteItemVenda,

  selectEnderecos,
  insertEndereco,
  updateEndereco,
  deleteEndereco,
};


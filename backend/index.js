require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const db = require('./db');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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

async function createTables() {
  const sql = `
    CREATE TABLE IF NOT EXISTS categoria (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(30)
    );

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

    CREATE TABLE IF NOT EXISTS usuarios (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      cpf VARCHAR(11) UNIQUE NOT NULL,
      telefone BIGINT,
      datanascimento DATE,
      senha VARCHAR(255) NOT NULL,
      adm BOOLEAN NOT NULL DEFAULT false
    );

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

    CREATE TABLE IF NOT EXISTS itens_venda (
      id SERIAL PRIMARY KEY,
      id_produto INTEGER NOT NULL,
      id_venda INTEGER NOT NULL,
      quantidade INTEGER NOT NULL,
      valor_unit MONEY NOT NULL,
      FOREIGN KEY (id_produto) REFERENCES produtos (id) ON UPDATE CASCADE ON DELETE RESTRICT,
      FOREIGN KEY (id_venda) REFERENCES venda (id) ON UPDATE CASCADE ON DELETE CASCADE
    );

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

  await query(sql);
  console.log("Tabelas criadas com sucesso.");
}

createTables();

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

  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
app.get('/', (req, res) => res.json({ message: "Funcionando!!!" }));

// --- Usuarios ---
app.get('/usuarios', async (req, res) => {
  const usuarios = await db.selectUsuarios();
  res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
  const usuario = await db.selectUsuarioById(req.params.id);
  res.json(usuario);
});

app.post('/usuarios', async (req, res) => {
  try {
    const novoUsuario = await db.insertUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    console.error("Erro ao inserir usuário:", err);
    res.status(500).json({ error: "Erro ao inserir usuário" });
  }
});

app.patch('/usuarios/:id', async (req, res) => {
  await db.updateUsuario(req.params.id, req.body);
  res.sendStatus(200);
});

app.delete('/usuarios/:id', async (req, res) => {
  await db.deleteUsuario(req.params.id);
  res.sendStatus(204);
});

// --- Categoria ---
app.get('/categorias', async (req, res) => {
  const categorias = await db.selectCategorias();
  res.json(categorias);
});

app.post('/categorias', async (req, res) => {
  await db.insertCategoria(req.body);
  res.sendStatus(201);
});

// --- Produtos ---
app.get('/produtos', async (req, res) => {
  const produtos = await db.selectProdutos();
  res.json(produtos);
});

app.post('/produtos', async (req, res) => {
  try {
    console.log("📦 Produto recebido:", req.body);
    await db.insertProduto(req.body);
    res.sendStatus(201);
  } catch (err) {
    console.error("❌ Erro ao inserir produto:", err);
    res.status(500).json({ error: 'Erro ao inserir produto' });
  }
});

// --- Venda ---
app.get('/vendas', async (req, res) => {
  const vendas = await db.selectVendas();
  res.json(vendas);
});

app.post('/vendas', async (req, res) => {
  await db.insertVenda(req.body);
  res.sendStatus(201);
});

// --- Itens Venda ---
app.get('/itens_venda', async (req, res) => {
  const itens = await db.selectItensVenda();
  res.json(itens);
});

app.post('/itens_venda', async (req, res) => {
  await db.insertItemVenda(req.body);
  res.sendStatus(201);
});

// --- Endereco ---
app.get('/enderecos', async (req, res) => {
  const enderecos = await db.selectEnderecos();
  res.json(enderecos);
});

app.post('/enderecos', async (req, res) => {
  await db.insertEndereco(req.body);
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`✅ Backend is running on http://localhost:${port}`);
});
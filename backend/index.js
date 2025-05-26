require('dotenv').config();


const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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
  console.log("no arquivo index.js: " , req.body)
  await db.insertUsuario(req.body);
  res.sendStatus(201);
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
  console.log("imprimindo produtos no index.js: " , req.body)
  await db.insertProduto(req.body);
  res.sendStatus(201);
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


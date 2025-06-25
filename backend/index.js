require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Teste
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

// ---------- USUÁRIOS ----------
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await db.selectUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await db.selectUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

app.get('/usuarios/email/:email', async (req, res) => {
  try {
    const usuario = await db.selectUsuarioByEmail(req.params.email);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário por email' });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const novoUsuario = await db.insertUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

app.patch('/usuarios/:id', async (req, res) => {
  try {
    await db.updateUsuario(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    await db.deleteUsuario(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

// ---------- PRODUTOS ----------
app.get('/produtos', async (req, res) => {
  try {
    const produtos = await db.selectProdutos();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const produto = await db.selectProdutoById(req.params.id);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
});

app.post('/produtos', async (req, res) => {
  try {
    const novoProduto = await db.insertProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir produto' });
  }
});

app.patch('/produtos/:id', async (req, res) => {
  try {
    await db.updateProduto(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  try {
    await db.deleteProduto(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

// ---------- CATEGORIAS ----------
app.get('/categorias', async (req, res) => {
  try {
    const categorias = await db.selectCategorias();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
});

app.post('/categorias', async (req, res) => {
  try {
    const novaCategoria = await db.insertCategoria(req.body.nome);
    res.status(201).json(novaCategoria);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir categoria' });
  }
});

app.patch('/categorias/:id', async (req, res) => {
  try {
    await db.updateCategoria(req.params.id, req.body.nome);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});

app.delete('/categorias/:id', async (req, res) => {
  try {
    await db.deleteCategoria(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
});

// ---------- VENDAS ----------
app.get('/vendas', async (req, res) => {
  try {
    const vendas = await db.selectVendas();
    res.json(vendas);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vendas' });
  }
});

app.post('/vendas', async (req, res) => {
  try {
    const novaVenda = await db.insertVenda(req.body);
    res.status(201).json(novaVenda);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir venda' });
  }
});

app.patch('/vendas/:id', async (req, res) => {
  try {
    await db.updateVenda(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar venda' });
  }
});

app.delete('/vendas/:id', async (req, res) => {
  try {
    await db.deleteVenda(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar venda' });
  }
});

// ---------- ITENS_VENDA ----------
app.get('/itens_venda', async (req, res) => {
  try {
    const itens = await db.selectItensVenda();
    res.json(itens);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar itens da venda' });
  }
});

app.post('/itens_venda', async (req, res) => {
  try {
    const novoItem = await db.insertItemVenda(req.body);
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir item da venda' });
  }
});

app.patch('/itens_venda/:id', async (req, res) => {
  try {
    await db.updateItemVenda(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar item da venda' });
  }
});

app.delete('/itens_venda/:id', async (req, res) => {
  try {
    await db.deleteItemVenda(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar item da venda' });
  }
});

// ---------- ENDEREÇOS ----------
app.get('/enderecos', async (req, res) => {
  try {
    const enderecos = await db.selectEnderecos();
    res.json(enderecos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar endereços' });
  }
});

app.post('/enderecos', async (req, res) => {
  try {
    const novoEndereco = await db.insertEndereco(req.body);
    res.status(201).json(novoEndereco);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao inserir endereço' });
  }
});

app.patch('/enderecos/:id', async (req, res) => {
  try {
    await db.updateEndereco(req.params.id, req.body);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar endereço' });
  }
});

app.delete('/enderecos/:id', async (req, res) => {
  try {
    await db.deleteEndereco(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar endereço' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


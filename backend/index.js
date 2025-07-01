require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // seu módulo db.js para query no Postgres

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rota teste
app.get("/", (req, res) => {
  res.json({ message: "API funcionando com sucesso!" });
});

// USUÁRIOS
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await db.selectUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const novoUsuario = await db.insertUsuario(req.body);
    res.status(201).json(novoUsuario);
  } catch (err) {
    res.status(500).json({ error: "Erro ao inserir usuário" });
  }
});

// LOGIN simples (email e senha)
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios" });
  }
  try {
    const result = await db.query(
      "SELECT * FROM usuarios WHERE email = $1 AND senha = $2",
      [email, senha]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(401).json({ error: "Email ou senha incorretos" });
    }
  } catch (err) {
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// PRODUTOS
app.get("/produtos", async (req, res) => {
  try {
    const produtos = await db.selectProdutos();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await db.selectProdutoById(id);
    if (!produto) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

app.post("/produtos", async (req, res) => {
  try {
    const novoProduto = await db.insertProduto(req.body);
    res.status(201).json(novoProduto);
  } catch (err) {
    res.status(500).json({ error: "Erro ao inserir produto" });
  }
});

app.put('/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, preco, descricao, estoque, imagem } = req.body;

  try {
    const updateQuery = `
      UPDATE produtos 
      SET nome = $1, preco = $2, descricao = $3, estoque = $4, imagem = $5
      WHERE id = $6
      RETURNING *
    `;
    const values = [nome, preco, descricao, estoque, imagem, id];
    const result = await db.query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteProduto(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});



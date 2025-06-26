require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando com sucesso!" });
});

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
    const novo = await db.insertUsuario(req.body);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: "Erro ao inserir usuário" });
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

app.post("/produtos", async (req, res) => {
  try {
    await db.insertProduto(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: "Erro ao inserir produto" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});


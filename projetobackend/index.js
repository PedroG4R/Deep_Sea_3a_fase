require("dotenv").config();
const express = require("express");
const db = require("./db");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// Teste de rota principal
app.get('/', (req, res) => {
    res.json({ message: "Funcionando!!!" });
});

// Rota para listar TODOS os usuários
app.get('/usuarios', async (req, res) => {
    const usuarios = await db.selectCustomers(); // Certifique-se que essa função existe
    res.json(usuarios);
});

// Rota para listar UM usuário pelo ID
app.get('/usuarios/:id', async (req, res) => {
    const usuario = await db.selectCustomer(req.params.id);
    res.json(usuario);
});

// Rota para inserir novo usuário
app.post('/usuarios', async (req, res) => {
    await db.insertCustomer(req.body);
    res.sendStatus(201);
});

// Rota para editar/atualizar usuário
app.patch('/usuarios/:id', async (req, res) => {
    await db.updateCustomer(req.params.id, req.body);
    res.sendStatus(200);
});

// Rota para excluir usuário
app.delete('/usuarios/:id', async (req, res) => {
    await db.deleteCustomer(req.params.id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`✅ Backend is running on http://localhost:${port}`);
});


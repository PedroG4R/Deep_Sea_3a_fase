require("dotenv").config();
const express = require("express");
const db = require("./db");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "Funcionando!!!" });
});
app.get('/usuarios', async (req, res) => {
    const usuarios = await db.selectCustomers();
    res.json(usuarios);
});

app.get('/usuarios/:id', async (req, res) => {
    const usuario = await db.selectCustomer(req.params.id);
    res.json(usuario);
});

app.post('/usuarios', async (req, res) => {
    await db.insertCustomer(req.body);
    res.sendStatus(201);
});

app.patch('/usuarios/:id', async (req, res) => {
    await db.updateCustomer(req.params.id, req.body);
    res.sendStatus(200);
});

app.delete('/usuarios/:id', async (req, res) => {
    await db.deleteCustomer(req.params.id);
    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`✅ Backend is running on http://localhost:${port}`);
});


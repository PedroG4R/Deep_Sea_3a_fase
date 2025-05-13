
import Navbar from '../components/Navbar';
import './DashboardVendedor.css'
import React, { useState } from 'react';

const produtos = [
  {
    id: 1,
    nome: 'Mochila Com Saída USB Para Notebook 15.6" Modelo Soft ',
    imagem: 'public/mochila-notebook-soft6-197cd69dd563cb9a6116972984676841-1024-1024.png',
    descricao: 'Proteção imbatível: Com material durável, a mochila à prova dágua oferece a melhor proteção para seus itens, mantendo-os secos e seguros.Design moderno: Uma mochila elegante e discreta, feita com materiais de alta qualidade e simples de limpar.',
    preco: 19.99,
    estoque: 10
  },
  {
    id: 2,
    nome: 'Produto 2',
    imagem: 'https://via.placeholder.com/60',
    descricao: 'Descrição do Produto 2',
    preco: 29.99,
    estoque: 5
  },
  {
    id: 3,
    nome: 'Produto 3',
    imagem: 'https://via.placeholder.com/60',
    descricao: 'Descrição do Produto 3',
    preco: 39.99,
    estoque: 3
  },
  {
    id: 4,
    nome: 'Produto 4',
    imagem: 'https://via.placeholder.com/60',
    descricao: 'Descrição do Produto 4',
    preco: 49.99,
    estoque: 7
  },
];

const vendidos = Array(5).fill('★');
const contatos = Array(8).fill('👤');

function DashboardVendedor() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  return (
    <div className="dashboard">
       <div className='dashboard-container'>
        <Navbar />
        <h1> Dashboard do vendedor</h1>
    </div>
      <div className="section">
        <h2>Produtos à venda</h2>
        <div className="row">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="box"
              onClick={() => setProdutoSelecionado(produto)}
            >
              <img src={produto.imagem} alt={produto.nome} width="50" height="50" />
              <div className="info">
                <p>{produto.nome}</p>
                <p>R$ {produto.preco.toFixed(2)}</p>
                <p>Estoque: {produto.estoque}</p>
              </div>
            </div>
          ))}
          <div className="arrow">➡️</div>
        </div>

        {produtoSelecionado && (
          <div className="descricao-produto">
            <h3>{produtoSelecionado.nome}</h3>
            <p>{produtoSelecionado.descricao}</p>
            <p><strong>Preço:</strong> R$ {produtoSelecionado.preco.toFixed(2)}</p>
            <p><strong>Estoque:</strong> {produtoSelecionado.estoque}</p>
            <button className="btn">Comprar</button>
            <button className="btn">Adicionar ao carrinho</button>
          </div>
        )}
      </div>

      <Secao titulo="Produtos vendidos" itens={vendidos} />

      <div className="section">
        <h2>Seus contatos</h2>
        <div className="row">
          {contatos.map((c, i) => (
            <div key={i} className="circle">
              <div className="emoji">{c}</div>
              <div className="label">Perfil</div>
            </div>
          ))}
          <div className="arrow">➡️</div>
        </div>
      </div>
    </div>
  );
}

function Secao({ titulo, itens }) {
  return (
    <div className="section">
      <h2>{titulo}</h2>
      <div className="row">
        {itens.map((item, i) => (
          <div key={i} className="box">{item}</div>
        ))}
        <div className="arrow">➡️</div>
      </div>
    </div>
  );
}

export default DashboardVendedor;
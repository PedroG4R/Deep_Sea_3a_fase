import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';
import './Produto.css';

function Produto() {
  const [inputNome, setInputNome] = useState('');
  const [inputDescricao, setInputDescricao] = useState('');
  const [inputPreco, setInputPreco] = useState('');
  const [inputImagem, setInputImagem] = useState(null);
  const [inputEstoque, setInputEstoque] = useState('');

  const { adicionarProduto } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputImagem(imageUrl);
    }
  };

  const cadastrarProduto = async (e) => {
    e.preventDefault();
    if (!inputNome || !inputPreco) {
      alert('Nome e preço são obrigatórios');
      return;
    }

    const produto = {
      nome: inputNome,
      preco: Number(inputPreco),
      descricao: inputDescricao,
      estoque: Number(inputEstoque),
      imagem: inputImagem,
    };

    try {
      await adicionarProduto(produto);
      navigate('/catalogo');
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      alert('Erro ao cadastrar produto.');
    }
  };

  return (
    <div className="produto-container">
      <Navbar />
      <h2>Cadastro de Produto</h2>

      <form className="produto-form" onSubmit={cadastrarProduto}>
        <div className="input-group">
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Nome do produto"
            value={inputNome}
            onChange={(e) => setInputNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Preço:</label>
          <input
            type="number"
            placeholder="Preço (ex: 99.90)"
            step="0.01"
            value={inputPreco}
            onChange={(e) => setInputPreco(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Descrição:</label>
          <textarea
            placeholder="Descrição do produto"
            value={inputDescricao}
            onChange={(e) => setInputDescricao(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Estoque:</label>
          <input
            type="number"
            placeholder="Quantidade em estoque"
            value={inputEstoque}
            onChange={(e) => setInputEstoque(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Imagem:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagemChange}
          />
          {inputImagem && (
            <img
              src={inputImagem}
              alt="Prévia do produto"
              className="preview-image"
            />
          )}
        </div>

        <button type="submit" className="btn-produto">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Produto;

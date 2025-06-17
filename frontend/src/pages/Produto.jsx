import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';
import Card from '../pages/Card';
import './Produto.css';

function Produto() {
  const [inputNome, setInputNome] = useState('');
  const [inputDescricao, setInputDescricao] = useState('');
  const [inputPreco, setInputPreco] = useState('');
  const [inputImagem, setInputImagem] = useState(null);
  const [inputEstoque, setInputEstoque] = useState('');

  const { adicionarProduto } = useContext(GlobalContext);
  const navigate = useNavigate();

  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputImagem(imageUrl);
    }
  }

  async function cadastrarProduto() {
    if (!inputNome || !inputPreco) {
      alert('Por favor, preencha o nome e o preço do produto.');
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

      // Limpar os campos
      setInputNome('');
      setInputDescricao('');
      setInputPreco('');
      setInputEstoque('');
      setInputImagem(null);

      // Redirecionar para catálogo
      navigate('/catalogo');
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
      alert('Erro ao cadastrar produto. Tente novamente.');
    }
  }

  return (
    <div className="formCadastro">
      <Navbar />
      <h2 className="title-text">Cadastro de Produto</h2>

      <div className="inputContainer">
        <label>Nome do Produto:</label>
        <input
          type="text"
          value={inputNome}
          onChange={(e) => setInputNome(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <label>Preço:</label>
        <input
          type="number"
          value={inputPreco}
          onChange={(e) => setInputPreco(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <label>Descrição:</label>
        <input
          type="text"
          value={inputDescricao}
          onChange={(e) => setInputDescricao(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <label>Estoque:</label>
        <input
          type="number"
          value={inputEstoque}
          onChange={(e) => setInputEstoque(e.target.value)}
        />
      </div>

      <div className="inputContainer">
        <label>Imagem (upload):</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
        />
        {inputImagem && (
          <img
            src={inputImagem}
            alt="Prévia da imagem"
            style={{ width: '150px', marginTop: '10px' }}
          />
        )}
      </div>

      <button onClick={cadastrarProduto}>Cadastrar</button>
    </div>
  );
}

export default Produto;

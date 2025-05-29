import React, { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import './Produto.css';
import Navbar from '../components/Navbar';
import Card from '../pages/Card';

function Produto() {
  const [produtos, setProdutos] = useState([]);

  const [inputNome, setInputNome] = useState('');
  const [inputDescricao, setInputDescricao] = useState('');
  const [inputPreco, setInputPreco] = useState('');
  const [inputImagem, setInputImagem] = useState(null);
  const [inputEstoque, setInputEstoque] = useState('');

  const { adicionarProduto } = useContext(GlobalContext)

  function handleImagemChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputImagem(imageUrl);
    }
  }

  async function cadastrarProduto() {
    const produto = {
      nome: inputNome,
      preco: Number(inputPreco),
      descricao: inputDescricao,
      estoque: Number(inputEstoque),
      imagem: inputImagem, // Certifique-se que no back-end está como "imagem", não "img"
    };

    try {
      await adicionarProduto(produto); // ⬅️ salva no banco via back-end
    } catch (err) {
      console.error('Erro ao cadastrar produto:', err);
    }

    setInputNome('');
    setInputDescricao('');
    setInputPreco('');
    setInputEstoque('');
    setInputImagem(null);
  }

  return (
    <div className="formCadastro">
      <Navbar />
      <h2 className='title-text'>Cadastro de Produto</h2>

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
          type="text"
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

      <div className="lista-produtos">
        {produtos.map((produto) => (
          <Card 
            key={produto.id}
            img={produto.img}
            nome={produto.nome}
            preco={produto.preco}
            estoque={produto.estoque}
            descricao={produto.descricao}
          />
        ))}
      </div>
    </div>
  );
}

export default Produto;
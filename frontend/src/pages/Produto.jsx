import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';

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

  const cadastrarProduto = async () => {
    if (!inputNome || !inputPreco) return alert('Nome e preço são obrigatórios');

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
      console.error("Erro ao cadastrar produto:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Cadastro de Produto</h2>
      <input type="text" placeholder="Nome" value={inputNome} onChange={e => setInputNome(e.target.value)} />
      <input type="number" placeholder="Preço" value={inputPreco} onChange={e => setInputPreco(e.target.value)} />
      <input type="text" placeholder="Descrição" value={inputDescricao} onChange={e => setInputDescricao(e.target.value)} />
      <input type="number" placeholder="Estoque" value={inputEstoque} onChange={e => setInputEstoque(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleImagemChange} />
      {inputImagem && <img src={inputImagem} alt="Prévia" width={150} />}
      <button onClick={cadastrarProduto}>Cadastrar</button>
    </div>
  );
}

export default Produto;
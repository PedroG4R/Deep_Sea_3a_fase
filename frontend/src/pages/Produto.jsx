import React, { useState } from 'react';
import './Produto.css';
import Navbar from './components/Navbar'

const Produto = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [foto, setFoto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');

  const handleAdicionarProduto = (e) => {
    e.preventDefault();
    if (nome && descricao && preco && foto && categoria && localizacao) {
      const novoProduto = {
        id: Date.now(),
        nome,
        descricao,
        preco,
        foto,
        categoria,
        localizacao,
      };
      setProdutos([...produtos, novoProduto]);
      setNome('');
      setDescricao('');
      setPreco('');
      setFoto('');
      setCategoria('');
      setLocalizacao('');
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]);
  };

  return (
    <div className="container">
      <div className='dashboard-container'>
        <Navbar />
      
    </div>
      <h1>Comprar e Vender Produtos</h1>

      <form className="formulario" onSubmit={handleAdicionarProduto}>
        <input type="text" placeholder="Nome do Produto" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="text" placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <input type="text" placeholder="URL da Foto" value={foto} onChange={(e) => setFoto(e.target.value)} />
        <input type="text" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
        <input type="text" placeholder="Localização" value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} />
        <button type="submit">Adicionar Produto</button>
      </form>

      <h2>Produtos</h2>
      <div className="lista-produtos">
        {produtos.map((produto) => (
          <div className="card-produto" key={produto.id}>
            <img src={produto.foto} alt={produto.nome} />
            <h3>{produto.nome}</h3>
            <p><strong>Categoria:</strong> {produto.categoria}</p>
            <p><strong>Descrição:</strong> {produto.descricao}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p><strong>Localização:</strong> {produto.localizacao}</p>
            <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      <h2>Carrinho ({carrinho.length} itens)</h2>
      <ul className="carrinho-lista">
        {carrinho.map((item, index) => (
          <li key={index}>{item.nome} - R$ {item.preco}</li>
        ))}
      </ul>
    </div>
  );
};

export default Produto;

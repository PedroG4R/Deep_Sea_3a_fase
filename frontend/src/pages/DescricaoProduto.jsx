import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { GlobalContext } from '../contexts/GlobalContext';
import './DescricaoProduto.css';

function DescricaoProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { adicionarCarrinho } = useContext(GlobalContext);

  useEffect(() => {
    async function buscarProduto() {
      try {
        const res = await axios.get(`http://localhost:3000/produtos/${id}`);
        setProduto(res.data);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
      } finally {
        setLoading(false);
      }
    }
    buscarProduto();
  }, [id]);

  const excluirProduto = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      alert('Produto excluído com sucesso!');
      navigate('/catalogo');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      alert('Erro ao excluir produto.');
    }
  };

  const handleAdicionarCarrinho = () => {
    adicionarCarrinho({ ...produto, quantidade: 1 });
    navigate('/carrinho');
  };

  if (loading) return <p className="loading">Carregando produto...</p>;
  if (!produto)  return <p className="notfound">Produto não encontrado.</p>;

  return (
    <div className="descricao-produto">
      <Navbar />

      <button 
        className="btn-back" 
        onClick={() => navigate('/catalogo')}
      >
        ← Voltar ao Catálogo
      </button>

      <h2 className="titulo">{produto.nome}</h2>

      <img 
        className="produto-image" 
        src={produto.imagem} 
        alt={produto.nome} 
      />

      <p className="info"><strong>Preço:</strong> R$ {Number(produto.preco).toFixed(2)}</p>
      <p className="info"><strong>Descrição:</strong> {produto.descricao}</p>
      <p className="info"><strong>Estoque disponível:</strong> {produto.estoque}</p>

      <div className="acoes">
        <button className="btn btn-carrinho" onClick={handleAdicionarCarrinho}>
          Adicionar ao Carrinho
        </button>
        <button className="btn btn-comprar">
          Comprar Agora
        </button>
        <button className="btn btn-excluir" onClick={excluirProduto}>
          Excluir Produto
        </button>
        <button 
          className="btn btn-editar" 
          onClick={() => navigate(`/editarproduto/${id}`)}
        >
          Editar Produto
        </button>
      </div>
    </div>
  );
}

export default DescricaoProduto;




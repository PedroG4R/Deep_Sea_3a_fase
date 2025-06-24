import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function DescricaoProduto() {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarProduto() {
      try {
        const res = await axios.get(`http://localhost:3001/produtos/${id}`);
        setProduto(res.data);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
      } finally {
        setLoading(false);
      }
    }

    buscarProduto();
  }, [id]);

  if (loading) return <p>Carregando produto...</p>;
  if (!produto) return <p>Produto não encontrado.</p>;

  return (
    <div className="descricao-produto">
      <Navbar />
      <button onClick={() => navigate('/catalogo')} style={{ marginTop: '10px' }}>
        Voltar ao Catálogo
      </button>
      <h2>{produto.nome}</h2>
      <img src={produto.imagem} alt={produto.nome} style={{ width: '200px' }} />
      <p><strong>Preço:</strong> R$ {produto.preco}</p>
      <p><strong>Categoria:</strong> {produto.categoria || 'Sem categoria'}</p>
      <p><strong>Descrição:</strong> {produto.descricao}</p>
      <p><strong>Estoque disponível:</strong> {produto.estoque}</p>

      <div style={{ marginTop: '20px' }}>
        <button>Adicionar ao Carrinho</button>
        <button style={{ marginLeft: '10px' }}>Comprar Agora</button>
      </div>
    </div>
  );
}

export default DescricaoProduto;


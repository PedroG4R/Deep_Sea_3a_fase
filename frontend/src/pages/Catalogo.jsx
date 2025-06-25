import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProdutos();
  }, []);

  async function fetchProdutos() {
    try {
      const res = await axios.get('http://localhost:3000/produtos');
      setProdutos(res.data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  }

  async function excluirProduto(id) {
    const confirmar = confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      setProdutos(produtos.filter((produto) => produto.id !== id));
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      alert("Erro ao excluir produto. Veja o console.");
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Catálogo de Produtos</h1>
      {produtos.length === 0 && <p>Nenhum produto cadastrado.</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              width: '250px',
              borderRadius: '8px',
            }}
          >
            <h3>{produto.nome}</h3>
            <img
              src={produto.imagem}
              alt={produto.nome}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <p>Preço: R$ {produto.preco}</p>
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => navigate(`/descricao/${produto.id}`)}>
                Ver Detalhes
              </button>
              <button
                onClick={() => excluirProduto(produto.id)}
                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;



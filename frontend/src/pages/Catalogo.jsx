import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';

function Catalogo() {
  const { produtos, deletarProduto } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleExcluir = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await deletarProduto(id);
    }
  };

  return (
    <div>
      <Navbar />

      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {produtos.map((produto) => (
            <div
              key={produto.id}
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                width: '250px',
                borderRadius: '8px',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)'
              }}
            >
              <h3>{produto.nome}</h3>
              <img
                src={produto.imagem || 'https://via.placeholder.com/200'}
                alt={produto.nome}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
              />
              <p>Preço: R$ {Number(produto.preco).toFixed(2)}</p>

              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => navigate(`/descricao/${produto.id}`)}>
                  Ver Detalhes
                </button>

                <button onClick={() => navigate(`/editarproduto/${produto.id}`)}>
                  Editar
                </button>

                <button
                  onClick={() => handleExcluir(produto.id)}
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;


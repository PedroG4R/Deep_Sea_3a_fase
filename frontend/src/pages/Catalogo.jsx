import React, { useContext, useEffect } from 'react';
import './Catalogo.css';
import Navbar from '../components/Navbar';
import Card from './Card';
import { GlobalContext } from '../contexts/GlobalContext';

const Catalogo = () => {
  const { produtos, fetchProdutos, loading } = useContext(GlobalContext);

  useEffect(() => {
    fetchProdutos(); // Garante que os produtos estejam atualizados ao entrar na página
  }, []);

  return (
    <div className="catalogo">
      <Navbar />
      <h2>Catálogo de Produtos</h2>

      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div className="produtos-lista">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <Card
                key={produto.id}
                id={produto.id}
                img={produto.imagem}
                nome={produto.nome}
                preco={produto.preco}
                estoque={produto.estoque}
                descricao={produto.descricao}
                categoria={produto.categoria}
              />
            ))
          ) : (
            <p>Nenhum produto disponível.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalogo;

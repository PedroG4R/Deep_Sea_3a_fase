import './Catalogo.css';
import React, { useContext } from 'react';
import Produto from './Produto';
import Card from './Card'; 
import Navbar from '../components/Navbar';
import { GlobalContext } from '../contexts/GlobalContext';

const Catalogo = () => {
  const { produtos } = useContext(GlobalContext);

  return (
    <div className="catalogo">
      <Navbar />
      <h2>Catálogo de Produtos</h2>

      <div className="produtos-lista">
        {produtos && produtos.length > 0 ? (
          produtos.map((produto) => (
            <Card 
              key={produto.id}
              img={produto.imagem}
              nome={produto.nome}
              preco={produto.preco}
              estoque={produto.estoque}
              descricao={produto.descricao}
            />
          ))
        ) : (
          <p>Nenhum produto disponível.</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
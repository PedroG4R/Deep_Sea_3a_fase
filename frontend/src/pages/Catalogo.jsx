
import './Catalogo.css'
import React, { useState } from 'react';
import Produto from './Produto';
import Navbar from '../components/Navbar';

const Catalogo = () => {
  
  const [produtos] = useState([
    {
      id: 1,
      nome: 'Camiseta Preta',
      descricao: 'Camiseta básica preta 100% algodão',
      preco: 59.9,
     
    },
    {
      id: 2,
      nome: 'Tênis Esportivo',
      descricao: 'Tênis ideal para corrida e caminhadas',
      preco: 199.9,
     
    },
    {
      id: 3,
      nome: 'Mochila Escolar',
      descricao: 'Mochila resistente com vários compartimentos',
      preco: 89.9,
      
    },
  ]);

  return (
    <div className="catalogo">
      <Navbar/>
      <h2>Catálogo de Produtos</h2>

      <div className="produtos-lista">
        
        {produtos.map((produto) => (
          <Produto key={produto.id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
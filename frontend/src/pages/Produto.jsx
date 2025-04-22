import React from 'react';

const Produto = ({ produto }) => {
  return (
    <div className="produto">
      {/* Imagem do produto */}
      <img src={produto.imagem} alt={produto.nome} />

      {/* Nome do produto */}
      <h3>{produto.nome}</h3>

      {/* Descrição curta */}
      <p>{produto.descricao}</p>

      {/* Preço formatado */}
      <p>Preço: R$ {produto.preco.toFixed(2)}</p>

      {/* Botão para simular adicionar ao carrinho */}
      <button>Adicionar ao Carrinho</button>
    </div>
  );
};

export default Produto;
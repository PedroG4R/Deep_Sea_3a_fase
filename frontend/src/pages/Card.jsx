import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';

const Card = ({ id, img, nome, preco, estoque, descricao }) => {
  const { deletarProduto } = useContext(GlobalContext);

  const handleDelete = () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deletarProduto(id);
    }
  };

  return (
    <div className="card">
      <img src={img} alt={nome} />
      <h3>{nome}</h3>
      <p>{descricao}</p>
      <p>Preço: R$ {preco}</p>
      <p>Estoque: {estoque}</p>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
};

export default Card;
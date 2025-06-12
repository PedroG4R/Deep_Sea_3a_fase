import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';

const Card = ({ id, img, nome, preco, estoque, descricao, categoria }) => {
  const { deletarProduto } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      deletarProduto(id);
    }
  };

  const abrirDescricao = () => {
    navigate(`/produto/${id}`, {
      state: {
        produto: {
          id,
          nome,
          preco,
          descricao,
          estoque,
          imagem: img,
          categoria
        }
      }
    });
  };

  return (
    <div className="card" onClick={abrirDescricao} style={{ cursor: 'pointer' }}>
      <img src={img} alt={nome} />
      <h3>{nome}</h3>
      <p>{descricao}</p>
      <p>Preço: R$ {preco}</p>
      <p>Estoque: {estoque}</p>
      <p>Categoria: {categoria}</p>
      <button onClick={handleDelete}>Excluir</button>
    </div>
  );
};

export default Card;
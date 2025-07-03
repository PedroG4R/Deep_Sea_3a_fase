import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import './Card.css'; 

const Card = ({ id, img, nome, preco, estoque, descricao, categoria }) => {
  const { deletarProduto } = useContext(GlobalContext);
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmar = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirmar) return;

    try {
      await deletarProduto(id);
      alert('Produto excluído com sucesso!');
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      alert('Erro ao excluir o produto.');
    }
  };

  const abrirDescricao = () => {
    navigate(`/descricao/${id}`);
  };

  return (
    <div className="card" onClick={abrirDescricao} style={cardEstilo}>
      <img
        src={img || 'https://via.placeholder.com/200x150?text=Sem+imagem'}
        alt={nome}
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/200x150?text=Imagem+inválida';
        }}
      />
      <h3>{nome}</h3>
      <p>{descricao}</p>
      <p><strong>Preço:</strong> R$ {preco}</p>
      <p><strong>Estoque:</strong> {estoque}</p>
      <p><strong>Categoria:</strong> {categoria || 'Não especificada'}</p>
      <button onClick={handleDelete} style={botaoEstilo}>
        Excluir
      </button>
    </div>
  );
};

export default Card;


const cardEstilo = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  width: '250px',
  marginBottom: '20px',
  backgroundColor: '#f9f9f9',
};

const botaoEstilo = {
  marginTop: '10px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  padding: '8px 12px',
  cursor: 'pointer',
};

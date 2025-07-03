import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './EditarProduto.css';


function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: '',
    preco: '',
    descricao: '',
    estoque: '',
    imagem: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduto() {
      try {
        const res = await axios.get(`http://localhost:3000/produtos/${id}`);
        setProduto({
          nome: res.data.nome,
          preco: res.data.preco,
          descricao: res.data.descricao,
          estoque: res.data.estoque,
          imagem: res.data.imagem || '',
        });
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
        alert('Erro ao carregar produto.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProduto((prev) => ({ ...prev, imagem: imageUrl }));
      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!produto.nome || !produto.preco) {
      alert('Nome e preço são obrigatórios.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/produtos/${id}`, produto);
      alert('Produto atualizado com sucesso!');
      navigate(`/descricao/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      alert('Erro ao atualizar produto.');
    }
  };

  if (loading) return <p>Carregando produto...</p>;

  return (
    <div className="editar-produto-container">
      <Navbar />
      <h2>Editar Produto</h2>

      <form onSubmit={handleSubmit} className="form-editar-produto">
        <label>Nome:</label>
        <input
          type="text"
          name="nome"
          value={produto.nome}
          onChange={handleChange}
          required
        />

        <label>Preço:</label>
        <input
          type="number"
          name="preco"
          step="0.01"
          value={produto.preco}
          onChange={handleChange}
          required
        />

        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={produto.descricao}
          onChange={handleChange}
        />

        <label>Estoque:</label>
        <input
          type="number"
          name="estoque"
          value={produto.estoque}
          onChange={handleChange}
        />

        <label>Imagem:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImagemChange}
        />
        {produto.imagem && (
          <img
            src={produto.imagem}
            alt="Prévia"
            style={{ width: '150px', marginTop: '10px' }}
          />
        )}

        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarProduto;

// src/contexts/GlobalContext.jsx
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [itensVenda, setItensVenda] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carrinho, setCarrinho] = useState([]);

  // 🔁 Fetch de dados
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error.message);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar produtos:', error.message);
    }
  };

  // ➕ Adição
  const adicionarUsuario = async (novoUsuario) => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', novoUsuario);
      setUsuarios((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar usuário:', error.message);
    }
  };

  const adicionarProduto = async (novoProduto) => {
    try {
      const response = await axios.post('http://localhost:3000/produtos', novoProduto);
      setProdutos((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error.message);
    }
  };

  // ✏️ Edição
  const editarProduto = async (id, dadosAtualizados) => {
    try {
      const response = await axios.put(`http://localhost:3000/produtos/${id}`, dadosAtualizados);
      setProdutos((prev) =>
        prev.map((produto) => (produto.id === id ? response.data : produto))
      );
    } catch (error) {
      console.error('❌ Erro ao editar produto:', error.message);
    }
  };

  // ❌ Remoção
  const deletarProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
    }
  };

  // 🛒 Carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  // 🚀 Carregamento inicial
  useEffect(() => {
    const carregarDados = async () => {
      await Promise.all([fetchUsuarios(), fetchProdutos()]);
      setLoading(false);
    };
    carregarDados();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        usuarios,
        fetchUsuarios,
        adicionarUsuario,

        produtos,
        fetchProdutos,
        adicionarProduto,
        editarProduto,
        deletarProduto,

        categorias,
        vendas,
        itensVenda,
        enderecos,

        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,

        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider, GlobalContext };


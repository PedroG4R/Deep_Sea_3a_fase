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

  // Fetch
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
      console.log("response =====>>>>>> ", response)
      setProdutos(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar produtos:', error.message);
    }
  };

  // Adicionar usuário com retorno booleano para sucesso/falha
  const adicionarUsuario = async (novoUsuario) => {
    // Verifica duplicidade localmente (melhora experiência)
    const existe = usuarios.some(
      (u) =>
        u.email.trim().toLowerCase() === novoUsuario.email.trim().toLowerCase() ||
        u.nome.trim().toLowerCase() === novoUsuario.nome.trim().toLowerCase()
    );

    if (existe) {
      alert('Usuário com esse nome ou email já existe!');
      return false; // falha
    }

    try {
      const response = await axios.post('http://localhost:3000/usuarios', novoUsuario);
      setUsuarios((prev) => [...prev, response.data]);
      return true; // sucesso
    } catch (error) {
      console.error('❌ Erro ao adicionar usuário:', error.message);
      alert('Erro ao cadastrar usuário, tente novamente.');
      return false;
    }
  };

  // Demais funções (adicionarProduto, editarProduto, deletarProduto, carrinho...) continuam iguais

  const adicionarProduto = async (novoProduto) => {
    try {
      const response = await axios.post('http://localhost:3000/produtos', novoProduto);
      setProdutos((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error.message);
    }
  };

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

  const deletarProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
    }
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (id) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== id));
  };

  // Carregamento inicial
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

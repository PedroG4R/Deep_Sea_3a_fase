import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  // Buscar todos os usuários
  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const res = await axios.get('http://localhost:3000/usuarios');
        setUsuarios(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }

    buscarUsuarios();
  }, []);

  // Buscar todos os produtos
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const res = await axios.get('http://localhost:3000/produtos');
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    }

    buscarProdutos();
  }, []);

  // Adicionar novo usuário
  const adicionarUsuario = async (novoUsuario) => {
    try {
      const res = await axios.post('http://localhost:3000/usuarios', novoUsuario);
      setUsuarios((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao adicionar usuário:", err);
    }
  };

  // Adicionar novo produto
  const adicionarProduto = async (novoProduto) => {
    try {
      const res = await axios.post('http://localhost:3000/produtos', novoProduto);
      setProdutos((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  // Adicionar ao carrinho
  const adicionarCarrinho = (produto) => {
    setCarrinho((prev) => {
      const produtoExistente = prev.find(item => item.id === produto.id);
      if (produtoExistente) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        return prev.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se for novo, adiciona com quantidade 1
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  return (
    <GlobalContext.Provider value={{
      usuarios,
      setUsuarios,
      usuarioLogado,
      setUsuarioLogado,
      adicionarUsuario,
      produtos,
      setProdutos,
      adicionarProduto,
      carrinho,
      setCarrinho,
      adicionarCarrinho
    }}>
      {children}
    </GlobalContext.Provider>
  );
};





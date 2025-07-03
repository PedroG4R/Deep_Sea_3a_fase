import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  
  useEffect(() => {
    async function buscarUsuarios() {
      try {
        const res = await axios.get("http://localhost:3000/usuarios");
        setUsuarios(res.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    }
    buscarUsuarios();
  }, []);

  
  useEffect(() => {
    async function buscarProdutos() {
      try {
        const res = await axios.get("http://localhost:3000/produtos");
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    }
    buscarProdutos();
  }, []);

  
  const adicionarUsuario = async (novoUsuario) => {
    try {
      const res = await axios.post("http://localhost:3000/usuarios", novoUsuario);
      setUsuarios((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao adicionar usuário:", err);
    }
  };

  
  const adicionarProduto = async (novoProduto) => {
    try {
      const res = await axios.post("http://localhost:3000/produtos", novoProduto);
      setProdutos((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  
  const editarProduto = async (id, produtoAtualizado) => {
    try {
      const res = await axios.put(`http://localhost:3000/produtos/${id}`, produtoAtualizado);
      setProdutos((prev) =>
        prev.map((produto) => (produto.id === id ? res.data : produto))
      );
    } catch (err) {
      console.error("Erro ao editar produto:", err);
    }
  };

  
  const deletarProduto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`);
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  };

  
  const adicionarCarrinho = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === produto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      } else {
        return [...prev, { ...produto, quantidade: 1 }];
      }
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        usuarios,
        setUsuarios,
        usuarioLogado,
        setUsuarioLogado,
        adicionarUsuario,
        produtos,
        setProdutos,
        adicionarProduto,
        editarProduto,
        deletarProduto,
        carrinho,
        setCarrinho,
        adicionarCarrinho,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

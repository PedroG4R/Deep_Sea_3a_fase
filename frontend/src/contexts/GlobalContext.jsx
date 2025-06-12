import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioLogado, setUsuarioLogado] = useState(null); // ✅ NOVO
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [vendas, setVendas] = useState([])
  const [itensVenda, setItensVenda] = useState([])
  const [enderecos, setEnderecos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/usuarios')
      setUsuarios(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error.message);
    } finally {
      setLoading(false);
    }
  };

  
  const adicionarUsuario = async (novoUsuario) => {
    try {

      const response = await axios.post(
        "http://localhost:3000/usuarios",
        novoUsuario
      );
      setUsuarios((prevUsuarios) => [...prevUsuarios, response.data]);

    } catch (error) {
      console.error('❌ Erro ao adicionar usuário:', error.message);
    }
  };

  const deletarUsuario = async (id) => {
    try {
      await anxios.delete('http://localhost:3000/usuarios/%{id}');
      setUsuarios((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error.message);
    }
  };

  const fetchProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar produtos:', error.message);
    }
  };

  const adicionarProduto = async (novoProduto) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/produtos",
        novoProduto
      );
      setProdutos((prevProdutos) => [...prevProdutos, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error.message);
    }
  };

  const deletarProduto = async (id) => {
    try {
      await fetch(`http://localhost:3001/produtos/${id}`, {
        method: 'DELETE',
      });
  
      setProdutos((prev) => prev.filter((produto) => produto.id !== id));
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categorias");
      setCategorias(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar categorias:', error.message);
    }
  };

  const adicionarCategoria = async (novaCategoria) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/categorias",
        novaCategoria
      );
      setCategorias((prevCategorias) => [...prevCategorias, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar categoria:', error.message);
    }
  };

  const fetchVendas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/vendas');
      setVendas(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar vendas:', error.message);
    }
  };

  const adicionarVenda = async (novaVenda) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/vendas',
         novaVenda
        );
      setVendas((prevVendas) => [...prevVendas, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar venda:', error.message);
    }
  };

  const fetchItensVenda = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itens_venda');
      setItensVenda(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar itens da venda:', error.message);
    }
  };

  const adicionarItemVenda = async (novoItemVenda) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/itensvenda',
         novoItemVenda
        );
      setItensVenda((prevItensVenda) => [...prevItensVenda, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar item da venda:', error.message);
    }
  };

  const fetchEnderecos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enderecos');
      setEnderecos(response.data);
    } catch (error) {
      console.error('❌ Erro ao buscar endereços:', error.message);
    }
  };

  const adicionarEndereco = async (novoEndereco) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/enderecos', 
        novoEndereco
      );
      setEnderecos((prevEnderecos) => [...prevEnderecos, response.data]);
    } catch (error) {
      console.error('❌ Erro ao adicionar endereço:', error.message);
    }
  };

  useEffect(() => {
    const carregarDados = async () => {
      await Promise.all([
        fetchUsuarios(),
        fetchProdutos(),
        fetchCategorias(),
        fetchVendas(),
        fetchItensVenda(),
        fetchEnderecos()
      ])
      setLoading(false)
    }

    carregarDados()
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        usuarios,
        adicionarUsuario,
        usuarioLogado,
        setUsuarioLogado,
        deletarUsuario,
        produtos,
        adicionarProduto,
        deletarProduto,
        categorias,
        adicionarCategoria,
        vendas,
        adicionarVenda,
        itensVenda,
        adicionarItemVenda,
        enderecos,
        adicionarEndereco,
        loading,
        fetchUsuarios,
        fetchProdutos,
        fetchCategorias,
        fetchVendas,
        fetchItensVenda,
        fetchEnderecos
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])
  const [produtos, setProdutos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [vendas, setVendas] = useState([])
  const [itensVenda, setItensVenda] = useState([])
  const [enderecos, setEnderecos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios')
      setUsuarios(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error.message)
    }
  }

  const adicionarUsuario = async (novoUsuario) => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', novoUsuario)
      setUsuarios((prev) => [...prev, response.data])
    } catch (error) {
      console.error('❌ Erro ao adicionar usuário:', error.message)
    }
  }

  const fetchProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos')
      setProdutos(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar produtos:', error.message)
    }
  }

  const adicionarProduto = async (novoProduto) => {
    try {
      const response = await axios.post('http://localhost:3000/produtos', novoProduto)
      setProdutos((prev) => [...prev, response.data])
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error.message)
    }
  }

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
      const response = await axios.get('http://localhost:3000/categorias')
      setCategorias(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar categorias:', error.message)
    }
  }

  const adicionarCategoria = async (novaCategoria) => {
    try {
      const response = await axios.post('http://localhost:3000/categorias', novaCategoria)
      setCategorias((prev) => [...prev, response.data])
    } catch (error) {
      console.error('❌ Erro ao adicionar categoria:', error.message)
    }
  }

  const fetchVendas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/vendas')
      setVendas(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar vendas:', error.message)
    }
  }

  const adicionarVenda = async (novaVenda) => {
    try {
      const response = await axios.post('http://localhost:3000/vendas', novaVenda)
      setVendas((prev) => [...prev, response.data])
    } catch (error) {
      console.error('❌ Erro ao adicionar venda:', error.message)
    }
  }

  const fetchItensVenda = async () => {
    try {
      const response = await axios.get('http://localhost:3000/itens_venda')
      setItensVenda(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar itens da venda:', error.message)
    }
  }

  const adicionarItemVenda = async (novoItem) => {
    try {
      const response = await axios.post('http://localhost:3000/itens_venda', novoItem)
      setItensVenda((prev) => [...prev, response.data])
    } catch (error) {
      console.error('❌ Erro ao adicionar item da venda:', error.message)
    }
  }

  const fetchEnderecos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/enderecos')
      setEnderecos(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar endereços:', error.message)
    }
  }

  const adicionarEndereco = async (novoEndereco) => {
    try {
      const response = await axios.post('http://localhost:3000/enderecos', novoEndereco)
      setEnderecos((prev) => [...prev, response.data])
    } catch (error) {
      console.error('❌ Erro ao adicionar endereço:', error.message)
    }
  }

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

import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios')
      setUsuarios(response.data)
    } catch (error) {
      console.error('❌ Erro ao buscar usuários:', error.message)
    } finally {
      setLoading(false)
    }
  }

  const adicionarUsuario = async (novoUsuario) => {
    try {
      const response = await axios.post('http://localhost:3000/usuarios', novoUsuario)
      setUsuarios((prev) => [...prev, { ...novoUsuario, id: response.data?.id || prev.length + 1 }])
    } catch (error) {
      console.error('❌ Erro ao adicionar usuário:', error.message)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  return (
    <GlobalContext.Provider value={{ usuarios, adicionarUsuario, loading, fetchUsuarios }}>
      {children}
    </GlobalContext.Provider>
  )
}
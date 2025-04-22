import { createContext, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])

  const adicionarUsuario = (novoUsuario) => {
    setUsuarios((prev) => [...prev, novoUsuario])
  }

  return (
    <GlobalContext.Provider value={{ usuarios, adicionarUsuario }}>
      {children}
    </GlobalContext.Provider>
  )
}
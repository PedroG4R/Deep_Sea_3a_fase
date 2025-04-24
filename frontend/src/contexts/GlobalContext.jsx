import { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext()

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() =>
    console.log(usuarios)
    ,[usuarios])

  const adicionarUsuario = (novoUsuario) => {
    setUsuarios((prev) => [...prev, novoUsuario])
  }

  return (
    <GlobalContext.Provider value={{ usuarios, adicionarUsuario }}>
      {children}
    </GlobalContext.Provider>
  )
}
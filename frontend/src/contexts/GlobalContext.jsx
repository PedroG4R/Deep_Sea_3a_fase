import { createContext, useState } from "react";

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {
const [usuarioLogado, setUsuarioLogado] = useState(null)
let idadeUsuario = '55'

    return(
        <GlobalContext.Provider value={{
            usuarioLogado,
            setUsuarioLogado,
            idadeUsuario
            }}>
            {children}
        </GlobalContext.Provider>
    )
}
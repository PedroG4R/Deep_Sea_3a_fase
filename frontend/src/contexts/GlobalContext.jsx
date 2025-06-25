import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

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

  // Função opcional para cadastrar novo usuário
  const adicionarUsuario = async (novoUsuario) => {
    try {
      const res = await axios.post('http://localhost:3000/usuarios', novoUsuario);
      setUsuarios((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao adicionar usuário:", err);
    }
  };

  return (
    <GlobalContext.Provider value={{
      usuarios,
      setUsuarios,
      usuarioLogado,
      setUsuarioLogado,
      adicionarUsuario
    }}>
      {children}
    </GlobalContext.Provider>
  );
};





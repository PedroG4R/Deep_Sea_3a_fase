import React, { useState, useContext } from 'react'
import Navbar from './components/Navbar'
import './Login.css'
import { GlobalContext } from '../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom';

function Login() {
  const { usuarios } = useContext(GlobalContext)
  const [nome, setNome] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
   
    const usuarioEncontrado = usuarios.find(user =>
      user.nome === nome && user.senha === senha
    )
    
    if (usuarioEncontrado) {
      alert('Login bem sucedido.')
    } else {
      alert('Nome ou senha incorretos.')
    }
    navigate('/')
  }
  return (
    <div className='login-container'>
        <Navbar />
        <h1>Login</h1>
 
        <label>Nome</label>
        <input
         type="text"
         value={nome}
         onChange={(e) => setNome(e.target.value)}
        />

        <label>Senha</label>
        <input
         type="password"
         value={senha}
         onChange={(e) => setSenha(e.target.value)} />

        <button className='btn-entrar' onClick={handleLogin}>Entrar</button>
        <button className='btn-cadastro' onClick={() => navigate('/cadastro')}>Não tenho uma conta</button>

    </div>
  )
}

export default Login
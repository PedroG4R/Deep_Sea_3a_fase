import React, { useState, useContext } from 'react';
import './Login.css';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Login() {
  const { setUsuarioLogado } = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    console.log('Tentando login com:', email, senha); // Verifica se chegou aqui

    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      const usuarios = response.data;

      const usuarioEncontrado = usuarios.find(
        (u) =>
          u.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
          u.senha === senha
      );

      if (usuarioEncontrado) {
        setUsuarioLogado(usuarioEncontrado);
        alert('Login bem-sucedido!');
        navigate('/perfil');
      } else {
        alert('Email ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className='login-container'>
      <Navbar />
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button className='btn-entrar' type="submit">Entrar</button>
      </form>

      <button className='btn-cadastro' onClick={() => navigate('/cadastro')}>
        Não tenho uma conta
      </button>
    </div>
  );
}

export default Login;

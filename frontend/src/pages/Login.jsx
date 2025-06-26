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
    e.preventDefault();
    console.log('Tentando login com:', email, senha);

    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        senha,
      });

      setUsuarioLogado(response.data);
      alert('Login bem-sucedido!');
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Email ou senha incorretos.');
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



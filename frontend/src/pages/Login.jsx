import React, { useState, useContext } from 'react';
import './Login.css';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Login() {
  const { usuarios, setUsuarioLogado } = useContext(GlobalContext);
  console.log("useContext(GlobalContext) =====>>>>> ", useContext(GlobalContext));
  
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // evita recarregar a página no submit

    const usuarioEncontrado = usuarios.find(
      (u) => u.nome.trim() === nome.trim() && u.senha.trim() === senha.trim()
    );

    if (usuarioEncontrado) {
      setUsuarioLogado(usuarioEncontrado);
      alert('Login bem sucedido.');
      navigate('/perfil');
    } else {
      alert('Nome ou senha incorretos.');
      // Não navega para outro lugar se der erro
    }
  };

  return (
    <div className='login-container'>
      <Navbar />
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label>Nome</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
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

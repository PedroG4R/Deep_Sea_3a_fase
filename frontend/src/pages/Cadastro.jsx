import React, { useState, useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';
import Navbar from '../components/Navbar';

function Cadastro() {
  const { adicionarUsuario } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    datanascimento: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    const novoUsuario = {
      nome: formData.nome,
      cpf: formData.cpf,
      telefone: formData.telefone,
      email: formData.email,
      datanascimento: formData.datanascimento,
      senha: formData.senha,
    };

    try {
      await adicionarUsuario(novoUsuario);
      alert('Usuário cadastrado com sucesso!');
      navigate('/login');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar. Verifique os dados ou tente novamente.');
    }
  };

  const isFormValid = Object.values(formData).every((v) => v.trim() !== '');

  return (
    <div className="cadastro-container">
      <Navbar />
      <h2 className="title-text">Cadastro</h2>

      <form onSubmit={handleCadastro}>
        <label>Nome</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />

        <label>CPF</label>
        <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />

        <label>Telefone</label>
        <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Data de Nascimento</label>
        <input type="date" name="datanascimento" value={formData.datanascimento} onChange={handleChange} required />

        <label>Senha</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />

        <label>Confirmar senha</label>
        <input
          type="password"
          name="confirmarSenha"
          value={formData.confirmarSenha}
          onChange={handleChange}
          required
        />

        <button
          className={`btn-cadastrar ${isFormValid ? '' : 'btn-disabled'}`}
          type="submit"
          disabled={!isFormValid}
        >
          Cadastrar
        </button>
      </form>

      <button className="btn-login" onClick={() => navigate('/login')}>
        Já tenho uma conta
      </button>
    </div>
  );
}

export default Cadastro;




import React, { useState, useContext } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'
import Navbar from '../components/Navbar';

function Cadastro() {
  const navigate = useNavigate()
  const { adicionarUsuario } = useContext(GlobalContext)

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    nascimento: '',
    senha: '',
    confirmarSenha: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target 
    setFormData({ ...formData, [name]: value })
  }

  const handleCadastro = (e) => {
    e.preventDefault(); // Evita recarregamento da página

    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.')
      return
    }

    const novoUsuario = {
      nome: formData.nome,
      cpf: formData.cpf,
      telefone: formData.telefone,
      email: formData.email,
      datanascimento: formData.nascimento,  // corrigido
      senha: formData.confirmarSenha
    };
    
    adicionarUsuario(novoUsuario)
    alert('Usuário cadastrado com sucesso!')
    navigate('/login')

    setFormData({
      nome: '',
      cpf: '',
      telefone: '',
      email: '',
      nascimento: '',
      senha: '',
      confirmarSenha: '',
    })
  }

  const isFormValid = Object.values(formData).every((value) => value.trim() !== '')

  return (
    <div className='cadastro-container'>
      <Navbar />
      <h2 className='title-text'>Cadastro</h2>

      <form onSubmit={handleCadastro}>
        <label>Nome</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />

        <label>CPF</label>
        <input type="number" name="cpf" value={formData.cpf} onChange={handleChange} />

        <label>Telefone</label>
        <input type="number" name="telefone" value={formData.telefone} onChange={handleChange} />

        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />

        <label>Data de Nascimento</label>
        <input type="date" name="nascimento" value={formData.nascimento} onChange={handleChange} />

        <label>Senha</label>
        <input type="password" name="senha" value={formData.senha} onChange={handleChange} />

        <label>Confirmar senha</label>
        <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} />

        <button 
          className={`btn-cadastrar ${isFormValid ? '' : 'btn-disabled'}`} 
          type="submit" 
          disabled={!isFormValid}
        >
          Cadastrar
        </button>
      </form>

      <button className='btn-login' onClick={() => navigate('/login')}>Já tenho uma conta</button>
    </div>
  )
}

export default Cadastro



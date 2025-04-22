import React, { useState } from 'react'
import Navbar from './components/Navbar'
import './Cadastro.css'

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    nascimento: '',
    senha: '',
    confirmarSenha: '',
  })
  
  const [usuarios, setUsuarios] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target 
    setFormData({...formData, [name]: value})
  }
  
  const handleCadastro = () => {
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem.')
      return
    }

    setUsuarios([...usuarios, {
      nome: formData.nome,
      senha: formData.confirmarSenha
    }])

    console.log('Usuários:', usuarios)
    alert('Usuário cadastrado com sucesso!')
  }


  return (
    <div className='cadastro-container'>
        <Navbar />
        <h2 className='title-text'>Cadastro</h2>

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

        <button className='btn-cadastrar' onClick={handleCadastro}>Cadastrar</button>
    </div>
  )
}

// localStorage.setItem('usuarios', JSON.stringify([...usuarios, {
//   nome: formData.nome,
//   senha: formData.confirmarSenha
// }]))

export default Cadastro
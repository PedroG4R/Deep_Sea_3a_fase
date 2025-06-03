import React, { useContext } from 'react'
import './Perfil.css'
import { GlobalContext } from '../contexts/GlobalContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function Perfil() {
  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUsuarioLogado(null)
    navigate('/login')
  }

  const handleDelete = () => {
    // Aqui você pode implementar a exclusão definitiva no seu contexto ou banco de dados
    alert('Conta deletada com sucesso!')
    setUsuarioLogado(null)
    navigate('/cadastro')
  }

  if (!usuarioLogado) {
    navigate('/login')
    return null
  }

  return (
    <div className="perfil-container">
      <Navbar />
      <div className="perfil-box">
        <h1 className="titulo">DEEP () SEA</h1>
        <h2>Meu Perfil:</h2>

        <div className="perfil-esquerda">
          <button className="btn-voltar" onClick={() => navigate(-1)}>←</button>

          <div className="foto-perfil">👤</div>

          <button className="btn-editar">Editar</button>

          <div className="dados">
            <p><strong>Nome:</strong> {usuarioLogado.nome}</p>
            <p><strong>Idade:</strong> {usuarioLogado.nascimento}</p>
            <p><strong>E-mail:</strong> {usuarioLogado.email}</p>
            <p><strong>Descrição:</strong></p>
            <p className="descricao">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
          </div>

          <button className="btn-deletar" onClick={handleDelete}>Deletar conta</button>
        </div>

        <div className="perfil-direita">
          <div className="produtos">
            <p><strong>Produtos vendendo/Últimas compras:</strong></p>
            <div className="produtos-grid">
              <div className="add-produto">+</div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="produto">★</div>
              ))}
              <div className="scroll">→</div>
            </div>
          </div>

          <div className="interesses">
            <p><strong>Com base no seu interesse:</strong></p>
            <div className="interesses-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="interesse">★</div>
              ))}
            </div>
            <button className="btn-mais">MAIS</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil

import React, { useContext, useEffect } from 'react';
import './Perfil.css';
import { GlobalContext } from '../contexts/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Perfil() {
  const { usuarioLogado, setUsuarioLogado, deletarUsuario } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuarioLogado) {
      navigate('/login');
    }
  }, [usuarioLogado, navigate]);

  if (!usuarioLogado) return null;

  const handleLogout = () => {
    setUsuarioLogado(null);
    navigate('/login');
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Tem certeza que deseja deletar sua conta?");
    if (confirm) {
      await deletarUsuario(usuarioLogado.id);
      setUsuarioLogado(null);
      alert("Conta deletada com sucesso.");
      navigate('/cadastro');
    }
  };

  return (
    <div className="perfil-container">
      <Navbar />
      <div className="perfil-box">
      <div className="titulo-container">
       <h1 className="titulo">DEEP () SEA</h1>
       <h2 className="subtitulo">Meu Perfil:</h2>
      </div>

        <div className="perfil-esquerda">
          <button className="btn-voltar" onClick={() => navigate(-1)}>←</button>

          <div className="foto-perfil">👤</div>

          <button className="btn-editar">Editar</button>

          <div className="dados">
            <p><strong>Nome:</strong> {usuarioLogado.nome}</p>
            <p><strong>Data de nascimento:</strong> {usuarioLogado.nascimento}</p>
            <p><strong>E-mail:</strong> {usuarioLogado.email}</p>
            <p><strong>Descrição:</strong></p>
            <p className="descricao">~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~</p>
          </div>

          <button className="btn-deletar" onClick={handleDelete}>Deletar conta</button>
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>

        <div className="perfil-direita">
          <div className="produtos">
            <p><strong>Produtos vendendo / Últimas compras:</strong></p>
            <div className="produtos-grid">
              <div className="add-produto">+</div>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="produto">★</div>
              ))}
              <button className="btn-mais" onClick={() => navigate('/catalogo')}>→</button>
            </div>
          </div>
          
          <div className="interesses">
            <p><strong>Com base no seu interesse:</strong></p>
            <div className="interesses-grid">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="interesse">★</div>
              ))}
            </div>
            <button className="btn-mais" onClick={() => navigate('/catalogo')}>MAIS</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;


import React from 'react';

import './PainelADM.css';
import Navbar from '../components/Navbar';

function PainelADM() {
  return (
    <div className="paineladm-container">
      <Navbar />
      <div className="panel-content">
        <h1 className="panel-title">DEEP () SEA</h1>

        <div className="section">
          <div className="section-header">
            <span>MAIS VENDIDOS</span>
            <span className="highlight">SEMANA</span>
          </div>
          <div className="icon-row">
            {[...Array(7)].map((_, idx) => (
              <button key={idx} className="icon-box">★</button>
            ))}
            <button className="arrow-button">→</button>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span>PRODUTOS/USUÁRIOS BANIDOS</span>
          </div>
          <div className="icon-row">
            {[...Array(7)].map((_, idx) => (
              <button key={idx} className={`icon-box ${idx % 2 === 0 ? 'star' : 'user'}`}>
                {idx % 2 === 0 ? '★' : '👤'}
              </button>
            ))}
            <button className="arrow-button">→</button>
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span>NOVOS USUÁRIOS</span>
          </div>
          <div className="icon-row">
            {[...Array(7)].map((_, idx) => (
              <button key={idx} className="icon-circle">
                <div className="profile-icon">👤</div>
                <span className="profile-label">Perfil</span>
              </button>
            ))}
            <button className="arrow-button">→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PainelADM;

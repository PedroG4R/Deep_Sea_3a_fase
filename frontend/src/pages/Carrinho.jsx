import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import Navbar from '../components/Navbar';
import './Carrinho.css';

function Carrinho() {
  const { carrinho, setCarrinho } = useContext(GlobalContext);

  // Aumenta quantidade
  const aumentarQuantidade = (id) => {
    setCarrinho((prev) =>
      prev.map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
      )
    );
  };

  // Diminui quantidade, remove se chegar a 0
  const diminuirQuantidade = (id) => {
    setCarrinho((prev) =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter(item => item.quantidade > 0)
    );
  };

  // Remove item
  const removerItem = (id) => {
    setCarrinho((prev) => prev.filter(item => item.id !== id));
  };

  // Calcula total do carrinho
  const totalGeral = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  if (carrinho.length === 0)
    return (
      <div className="carrinho-container">
        <Navbar />
        <h1>Seu carrinho está vazio.</h1>
      </div>
    );

  return (
    <div className="carrinho-container">
      <Navbar />
      

      <table className="carrinho-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço unitário</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Remover</th>
          </tr>
        </thead>
        <tbody>
          {carrinho.map((item) => (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>R$ {Number(item.preco).toFixed(2)}</td>
              <td>
                <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantidade}</span>
                <button onClick={() => aumentarQuantidade(item.id)}>+</button>
              </td>
              <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
              <td>
                <button onClick={() => removerItem(item.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Total Geral: R$ {totalGeral.toFixed(2)}</h2>
    </div>
  );
}

export default Carrinho;

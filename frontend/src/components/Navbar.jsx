import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import { useEffect } from "react";

function Navbar() {
  const location = useLocation();

  const isCadastroPage = location.pathname === "/cadastro";
  const isLoginPage = location.pathname === "/login";
  const isHomepage = location.pathname === "/";
  const isCarrinhoPage = location.pathname === "/carrinho";
  const isCatalogoPage = location.pathname === "/catalogo";
  const isDashboardVendedorPage = location.pathname === "/dashboardvendedor";
  const isDeletarContaPage = location.pathname === "/deletarconta";
  const isDescricaoProdutoPage = location.pathname === "/descricaoproduto";
  const isPagamentoPage = location.pathname === "/pagamento";
  const isPainelADMPage = location.pathname === "/paineladm";
  const isPerfilPage = location.pathname === "/perfil";
  const isProdutoPage = location.pathname ==="/produto";
  useEffect( ()=>{
    console.log(isHomepage)
  })
  
  return (
    <nav className="navbar-container">
      {isHomepage ? (
        <>
          <Link className="link" to="/perfil">Perfil</Link>
          <Link className="link" to="/catalogo">Catálogo</Link>
          <Link className="link" to="/descricaoproduto">Descrição do Produto</Link>
          <Link className="link" to="/cadastro">Cadastro</Link>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/Paineladm">PerfilADM</Link>
          <Link className="link" to="/Produto">Produto</Link>

        </>
      ) : isCarrinhoPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/pagamento">Pagamento</Link>
        </>
      ) : isCatalogoPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/carrinho">Carrinho</Link>
          <Link className="link" to="/descricaoproduto">Descrição do Produto</Link>
          <Link className="link" to="/perfil">Perfil</Link>
        </>
      ) : isDashboardVendedorPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/descricaoproduto">Descrição do Produto</Link>
          <Link className="link" to="/perfil">Perfil</Link>
        </>
      ) : isDeletarContaPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/cadastro">Cadastro</Link>
        </>
      ) : isDescricaoProdutoPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/carrinho">Carrinho</Link>
          <Link className="link" to="/pagamento">Pagamento</Link>
        </>
      ) : isPagamentoPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
        </>
      ) : isPainelADMPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/perfil">Perfil</Link>
          <Link className="link" to="/descricaoproduto">Descrição do Produto</Link>
        </>
      ) : isPerfilPage ? (
        <>
          <Link className="link" to="/">Homepage</Link>
          <Link className="link" to="/deletarconta">Deletar Conta</Link>
          <Link className="link" to="/descricaoproduto">Descrição do Produto</Link>
          <Link className="link" to="/catalogo">Catálogo</Link>
        </> 
      ) : isProdutoPage ? (
        <>
          <Link className="link" to="/perfil">Perfil</Link>
          <Link className="link" to="/catalogo">Catálogo</Link>
          <Link className="link" to="/descricaoproduto">Descrição do Produto</Link>
          <Link className="link" to="/cadastro">Cadastro</Link>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/Paineladm">PerfilADM</Link>
        </>
      ) : null}

      <h1 className="text-title">Deep () Sea</h1>
    </nav>
  );
}

export default Navbar;
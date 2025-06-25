import { createBrowserRouter } from "react-router-dom"; 
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Carrinho from "../pages/Carrinho";
import Catalogo from "../pages/Catalogo";
import DashboardVendedor from "../pages/DashboardVendedor";
import DeletarConta from "../pages/DeletarConta";
import Pagamento from "../pages/Pagamento";
import PainelADM from "../pages/PainelADM";
import Perfil from "../pages/Perfil";
import Produto from "../pages/Produto";
import DescricaoProduto from "../pages/DescricaoProduto";

const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "/login", element: <Login />},
    {path: "/cadastro", element: <Cadastro />},
    {path: "/carrinho", element: <Carrinho />},
    {path: "/catalogo", element: <Catalogo />},
    {path: "/dashboardvendedor", element: <DashboardVendedor />},
    {path: "/deletarconta", element: <DeletarConta />},
    {path: "/descricao/:id", element: <DescricaoProduto />},
    {path: "/login", element: <Login />},
    {path: "/pagamento", element: <Pagamento />},
    {path: "/Paineladm", element: <PainelADM />},
    {path: "/perfil", element: <Perfil />},
    {path: "/produto", element: <Produto />},
])

export default router;
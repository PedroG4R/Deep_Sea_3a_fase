import { createBrowserRouter } from "react-router-dom"; 
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Carrinho from "../pages/Carrinho";
import Catálogo from "../pages/Catálogo";
import DashboardVendedor from "../pages/DashboardVendedor";
import DeletarConta from "../pages/DeletarConta";
import Pagamento from "../pages/Pagamento";
import PainelADM from "../pages/painelADM";
import Perfil from "../pages/Perfil";
import DescriçãoProduto from "../pages/DescriçãoProduto";

const router = createBrowserRouter([
    {path: "/", element: <Homepage />},
    {path: "/login", element: <Login />},
    {path: "/cadastro", element: <Cadastro />},
    {path: "/carrinho", element: <Carrinho />},
    {path: "/catalogo", element: <Catálogo />},
    {path: "/dashboardvendedor", element: <DashboardVendedor />},
    {path: "/deletarconta", element: <DeletarConta />},
    {path: "/descricaoproduto", element: <DescriçãoProduto />},
    {path: "/login", element: <Login />},
    {path: "/pagamento", element: <Pagamento />},
    {path: "/paineladm", element: <PainelADM />},
    {path: "/perfil", element: <Perfil />},
])

export default router;
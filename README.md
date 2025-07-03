# S.A-3a-Fase
Repositório para o projeto de S.A nomeado Deep Sea, um sistema de e-commerce que utiliza o mesmo formato para vender diferentes tipos de produtos, tendo uma estética única no mercado. (terceira fase)

Membros da equipe:
https://github.com/PedroG4R
https://github.com/theojouki
https://github.com/Philiposobjj

Requisitos funcionais do projeto:
- Cadastro de usuário 
- Cadastro de produto
- Carrinho e check-out
- Perfil

Requisitos desejáveis:

- Situação do pedido
- Envio e logística

Protótipos:
https://www.figma.com/design/AB2QoCwVcZMc2RQa7sTxQT/Deep-Sea?node-id=0-1&p=f&t=AHG5DEVbBr5Nzo6t-0

![Image](https://github.com/user-attachments/assets/7d324443-bd4b-461b-a02b-633f31dd0846)

![Image](https://github.com/user-attachments/assets/f46bbf9b-befe-4434-ad95-1b538f6dc97a)

![Image](https://github.com/user-attachments/assets/7b03e20b-8530-4246-856b-4d42c713802c)

![Image](https://github.com/user-attachments/assets/cab0b04a-123f-4412-a12b-786a431c5135)

![Image](https://github.com/user-attachments/assets/6c052da2-3efe-4695-b16c-d6221cdbdc8e)

![Image](https://github.com/user-attachments/assets/497f7b45-4fb0-40f2-9fdd-548a44562b19



#  Backend - DeepSea E-commerce

 Descrição

Este projeto representa o backend do sistema de e-commerce **DeepSea**, desenvolvido em **Node.js** com banco de dados **PostgreSQL**. Ele provê funcionalidades essenciais para gerenciar:

- Usuários
- Produtos
- Categorias
- Vendas e Itens da Venda
- Endereços

Toda a comunicação com o banco é feita utilizando a biblioteca `pg`, e as variáveis sensíveis são carregadas com o `dotenv`.

---

 Funcionalidades

 Cadastro e autenticação de usuários  
 Gerenciamento de produtos com imagens e categorias  
 Registro e edição de vendas e itens vendidos  
 Endereçamento vinculado a usuários e/ou produtos  
 Estrutura pronta para integração com frontend (ex: React)

---

 Estrutura de Pastas (resumida)

```
 backend/
 ─  database.js        # Todas as funções de banco de dados
 ─  .env               # Variáveis de ambiente
 ─  index.js           # Ponto de entrada da aplicação (opcional)
 ─  README.md          # Documentação do projeto
```

---

 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/deepsea-backend.git
   ```

2. Acesse a pasta do projeto:
   ```bash
   cd deepsea-backend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

---

 Execução

Crie um arquivo `.env` na raiz do projeto com as configurações do banco:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=senai
DB_NAME=deepsea
```

Depois, execute o projeto:

```bash
node index.js
```

Ou, para desenvolvimento contínuo:

```bash
npx nodemon index.js
```

---

Dependências

| Pacote       | Descrição                                |
|--------------|-------------------------------------------|
| `pg`         | Cliente PostgreSQL para Node.js           |
| `dotenv`     | Carregamento de variáveis de ambiente     |
| `nodemon`    | Reinício automático durante o desenvolvimento (dev) |

Instale com:

```bash
npm install pg dotenv
npm install --save-dev nodemon
```

---

DER - Diagrama Entidade Relacionamento

```
USUARIOS (
  id PK,
  nome,
  cpf,
  telefone,
  email,
  datanascimento,
  senha,
  adm
)

PRODUTOS (
  id PK,
  nome,
  descricao,
  preco,
  imagem,
  estoque,
  id_categoria FK → CATEGORIA.id
)

CATEGORIA (
  id PK,
  nome
)

VENDA (
  id PK,
  data_venda,
  numero_nf,
  subtotal,
  desconto,
  imposto,
  id_usuario FK → USUARIOS.id
)

ITENS_VENDA (
  id PK,
  id_produto FK → PRODUTOS.id,
  id_venda FK → VENDA.id,
  quantidade,
  valor_unit
)

ENDERECO (
  id PK,
  cep,
  numero,
  complemento,
  id_produto FK → PRODUTOS.id,
  id_usuario FK → USUARIOS.id
)


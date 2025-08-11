# 🍔 FoodCatalog - Backend

Este repositório representa o **backend de um sistema de catálogo digital para estabelecimentos do segmento food**, como restaurantes, lanchonetes e food trucks. A aplicação permite a exposição de produtos, gestão de pedidos, captação de leads (prospects) e integração com canais de comunicação como WhatsApp e Telegram.

Como o repositório original é privado, este documento serve como **portfólio técnico**, descrevendo a arquitetura, tecnologias, funcionalidades e minha atuação no desenvolvimento do projeto.

---

## 🏗️ Visão Geral

O sistema foi desenvolvido para **automatizar o acesso ao cardápio** e facilitar o processo de pedido por clientes, eliminando a necessidade de atendimento manual inicial. O cliente acessa um link personalizado (ex: `meunegocio.com/cardapio`) e pode:

- Visualizar o cardápio dinâmico
- Fazer pedidos diretamente
- Enviar intenção de compra via WhatsApp
- Ser registrado como prospect para futuras campanhas

O backend é uma **API REST leve e eficiente**, construída com Node.js e Express, com banco de dados MySQL e integrações em tempo real com ferramentas de comunicação.

---

## 🔧 Tecnologias Utilizadas

- **Node.js + Express** – Backend em JavaScript com arquitetura baseada em rotas e controllers.
- **MySQL** – Banco de dados relacional para armazenamento de produtos, pedidos, negócios e leads.
- **JWT (JSON Web Token)** – Autenticação segura para rotas privadas.
- **Axios** – Para requisições HTTP em integrações externas.
- **CORS** – Gerenciamento de políticas de acesso entre origens.
- **Dotenv** – Gerenciamento de variáveis de ambiente.
- **Nodemon** – Recarga automática durante o desenvolvimento.
- **Docker (opcional)** – Containerização para ambientes de desenvolvimento e produção.

---

## 📂 Arquitetura e Estrutura

A aplicação segue uma arquitetura simples e escalável, baseada em **controllers e rotas**, com separação clara de responsabilidades:


### Controllers

- `AuthController` – Autenticação de usuários (rotas privadas).
- `BusinessController` – Gerencia informações do estabelecimento (nome, logo, URL amigável, etc).
- `OrdersController` – Gestão de pedidos: criação, listagem e atualização.
- `ProspectsController` – Captura e listagem de leads interessados.
- `WhatsController` – Integração com WhatsApp para envio de mensagens de pedido.
- `TelegramController` – Notificações automáticas para a equipe via Telegram.

---

## 🌐 Endpoints Principais (API REST)

### Públicos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/auth` | Autentica usuário (JWT) |
| `GET`  | `/business` | Lista todos os negócios |
| `GET`  | `/business/:url` | Retorna dados de um negócio por URL amigável |
| `GET`  | `/orders` | Lista todos os pedidos |
| `POST` | `/orders` | Cria um novo pedido |
| `PATCH`| `/orders/:id` | Atualiza status de um pedido |
| `GET`  | `/orders/roles.category` | Retorna categorias e papéis (usado no frontend) |
| `GET`  | `/prospects` | Retorna lista de prospects |
| `POST` | `/pedido` | Envia mensagem no WhatsApp com detalhes do pedido |
| `POST` | `/telegram` | Envia notificação para grupo no Telegram |
| `GET`  | `/teste` | Endpoint de teste para integração WhatsApp |

---

## 🔄 Integrações

### WhatsApp
- Ao enviar um pedido, o sistema gera uma mensagem formatada e abre o WhatsApp Web com o texto pré-preenchido.
- Pode ser expandido para usar APIs oficiais (como Meta Business) no futuro.

### Telegram
- Recebe notificações automáticas sempre que um novo pedido ou lead é registrado.
- Útil para monitoramento em tempo real sem necessidade de painel administrativo complexo.

---

## 🔐 Segurança e Autenticação

- Autenticação via **JWT** para rotas privadas.
- Uso de `cors` configurado com origens permitidas.
- Variáveis sensíveis gerenciadas com `.env`.
- Senhas armazenadas com hash **MD5** (com possibilidade de upgrade para `bcrypt` em versões futuras).

---

## 🚀 Gerenciamento e Execução

```json
"scripts": {
  "dev": "nodemon src/server.js",
  "start": "node src/server.js"
}

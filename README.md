# Orders Manager

## Descrição
`Orders Manager` é uma aplicação Node.js desenvolvida para gerenciar pedidos de compra. O sistema possui funcionalidades para criar, atualizar, buscar e processar pagamentos de pedidos, além de se integrar com um serviço de pagamento externo (`order_payment`). O sistema também valida informações de pagamento, como dados de cartão de crédito, e utiliza um banco de dados SQL para armazenar as informações.

## Tecnologias Utilizadas
- **Node.js**
- **TypeScript**
- **Express**
- **MySQL** (Banco de Dados)
- **RabbitMQ** (Mensageria para integração com o sistema de pagamento)
- **Redis** (Cache)
- **AMQP** (Protocolo para comunicação com o sistema de pagamento `order_payment`)
- **Jest** (Testes unitários)
- **Nodemon** (Ambiente de desenvolvimento)

## Funcionalidades
- **Gerenciamento de Pedidos**: Criação, atualização, busca por código e listagem de pedidos.
- **Validação de Cartões**: Validação das informações de pagamento antes do processamento.
- **Pagamentos**: Integração com o sistema de pagamento externo `order_payment`.
- **Mensageria**: Publicação de mensagens de pedidos de pagamento usando RabbitMQ.
- **Suporte a múltiplos status de pedido**: Listagem e filtragem de pedidos por status e datas.
  
## Estrutura do Projeto
- **/config**: Arquivos de configuração do container de injeção de dependências, servidor Express, e mensageria.
- **/controllers**: Controladores responsáveis por receber requisições HTTP e interagir com os serviços.
- **/services**: Contém a lógica de negócios da aplicação.
- **/models**: Definições dos modelos de dados (e.g., `Order`, `Product`, `Customer`).
- **/dto**: Objetos de transferência de dados (DTOs) para comunicações entre as camadas.
- **/repositories**: Responsáveis por interagir com o banco de dados.
- **/utils**: Utilitários como manipulação de datas e UUIDs.
  
## Configuração e Execução

### Pré-requisitos
- Node.js (v18 ou superior)
- MySQL
- RabbitMQ
- Redis
- TypeScript (compilado com `tsc`)

### Instalação
1. Clone o repositório:
   ```
   git clone git@github.com:Matheus-Freitas0/orders-manager.git

2.Instale as dependências:

    npm install

3.Configure o banco de dados MySQL e RabbitMQ.

4.Crie um arquivo .env com as variáveis de ambiente necessárias (exemplo: dados de conexão com banco de dados, fila de mensagens, etc).

## Scripts

Compilar o projeto:

    npm run build

Iniciar o servidor em produção:

    npm start

Iniciar o servidor em modo de desenvolvimento:

    npm run start:dev

Rodar testes unitários:

    npm test

Rotas Principais

# Pedido (Order)

POST /orders: Cria um novo pedido.

GET /orders/:code: Retorna os detalhes de um pedido pelo código.

GET /orders: Lista todos os pedidos com opções de filtragem (por status, data, etc.).

POST /orders/pay: Processa o pagamento de um pedido.

# Produto (Product)

POST /products: Cria um novo produto. 

GET /products/:code: Busca um produto pelo código.

GET /products: Lista todos os produtos.

PUT /products/:code: Atualiza as informações de um produto.

DELETE /products/:code: Remove um produto.

# Cliente (Customer)

POST /customers: Cria um novo cliente.

GET /customers/:document: Busca um cliente pelo documento (CPF/CNPJ).

# Sistema de Pagamento (order_payment)

https://github.com/Matheus-Freitas0/order-payment

O sistema está integrado com o serviço externo order_payment, que é responsável por processar os pagamentos. As requisições de pagamento são enviadas através do RabbitMQ.

Validação de Cartão
O sistema possui um validador de cartão de crédito que verifica a validade dos dados antes de enviar a requisição para o sistema de pagamento.

## Contribuição 

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença
Este projeto está licenciado sob a licença ISC.

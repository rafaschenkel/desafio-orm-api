# Desafio de API

Este projeto é a solução para um desafio da **[Growdev](https://www.growdev.com.br)**, onde o objetivo era criar uma API RESTful utilizando Prisma ORM. A API foi construída com **TypeScript**, **Express** e **Prisma**, e foi testada utilizando o **Postman**.

## Funcionalidades

- **API RESTful** construída com **Express**.
- Utiliza **TypeScript** para segurança de tipos e recursos modernos do JavaScript.
- **Prisma ORM** para interação com o banco de dados de maneira eficiente e segura.
- A estrutura de código foi organizada em diferentes pastas para manter a arquitetura limpa e modular. A pasta **database** contém classes como **JogoRepository** e **PersonagemRepository**, responsáveis pelas consultas ao banco de dados. Além disso, o projeto inclui pastas para **controllers**, **middlewares**, **routes** e **dtos**, cada uma com sua função específica no processamento das requisições e respostas.
- Endpoints da API testados e documentados utilizando o **Postman**.

## Tecnologias Utilizadas

- **Node.js** (com Express)
- **TypeScript** (para segurança de tipos e JavaScript moderno)
- **Prisma ORM** (para interação com o banco de dados)
- **Postman** (para testar os endpoints da API)
- **Express** (para construção da API RESTful)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/rafaschenkel/desafio-orm-api.git
   cd desafio-orm-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

   ```bash
   DATABASE_URL="sua_string_de_conexao_do_banco_de_dados"
   PORT="porta_de_conexão"
   ```

4. Execute as migrações do Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

## Endpoints da API

A API oferece os seguintes endpoints:

### Rota de Jogos

- **GET /jogos** - Retorna todos os jogos.
- **POST /jogos** - Cria um novo jogo.
- **GET /jogos/:idJogo** - Retorna um jogo específico pelo ID.
- **PUT /jogos/:idJogo** - Atualiza um jogo pelo ID.
- **DELETE /jogos/:idJogo** - Deleta um jogo pelo ID.

### Rota de Personagens

- **GET /jogos/:idJogo/personagens** - Retorna todos os personagens pelo ID do jogo informado.
- **POST /jogos/:idJogo/personagens** - Cria um novo personagem pelo ID do jogo informado.
- **GET /jogos/:idJogo/personagens/:idPersonagem** - Retorna um personagem específico pelo ID do personagem e ID do jogo informado.
- **PUT /jogos/:idJogo/personagens/:idPersonagem** - Atualiza um personagem pelo ID do personagem e ID do jogo informado.
- **DELETE /jogos/:idJogo/personagens/:idPersonagem** - Deleta um personagem pelo ID do personagem e ID do jogo informado.

Você pode consultar a coleção do Postman para ver exemplos detalhados de requisições e respostas para cada um desses endpoints. [Documentação](https://documenter.getpostman.com/view/26878125/2sAYkDML3Q)

## Testes

Todos os endpoints da API foram testados utilizando **Postman**. Você pode importar a coleção do Postman fornecida para testar a API.

## Estrutura de Pastas

A estrutura do código está organizada da seguinte forma:

- **src/**
  - **config/** - Comtém a instância do **PrismaClient** e a função que trata os erros.
  - **controllers/** - Contém todos os controladores da API, responsáveis por gerenciar as requisições e respostas.
  - **database/** - Contém as classes de repositório, como **JogoRepository** e **PersonagemRepository**, responsáveis pela interação com o banco de dados.
  - **dtos/** - Contém as definições dos modelos do Prisma, representando as tabelas no banco de dados.
  - **middlewares/** - Contém funções middleware que são executadas antes de chegar aos controladores, como validações.
  - **routes/** - Define todas as rotas da API, conectando os endpoints aos controladores.
  - **utils/** - Contém funções auxiliares, sendo usadas pelos controllers e middlewares.

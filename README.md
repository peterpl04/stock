# Lato Estoque

Sistema de controle de estoque para tablets Android com React Native (Expo) + backend Node.js/Express + PostgreSQL (Railway) com Prisma.

## 1) Estrutura do projeto

```text
stock/
  backend/
    prisma/
      schema.prisma
    src/
      controllers/
      middlewares/
      prisma/
      repositories/
      routes/
      services/
      types/
      utils/
      app.ts
      server.ts
    .env.example
    package.json
    tsconfig.json
  frontend/
    src/
      components/
      hooks/
      navigation/
      screens/
      services/
      store/
      theme/
      types/
    .env.example
    App.tsx
    app.json
    babel.config.js
    index.js
    package.json
    tsconfig.json
  README.md
```

## 2) Backend completo

### Stack
- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL (Railway)
- JWT para autenticacao
- Zod para validacao

### Rotas implementadas
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/POST/PUT/DELETE /api/products`
- `GET/POST/PUT/DELETE /api/categories`
- `GET/POST/PUT/DELETE /api/suppliers`
- `GET/POST /api/stock-movements`
- `GET /api/dashboard/summary`

### Recursos implementados
- Arquitetura em camadas: controllers, services, repositories
- Middleware de autenticacao JWT
- Middlewares de seguranca (helmet, rate-limit, cors)
- Validacao de payload com Zod
- Paginacao e filtros basicos
- Calculo de dashboard
- Movimentacao de estoque com ajuste transacional de quantidade

## 3) Frontend (Expo) completo

### Stack
- React Native com Expo
- TypeScript
- React Navigation (stack + drawer)
- Redux Toolkit
- Axios
- Tema escuro padrao

### Telas principais
- Login
- Cadastro
- Dashboard
- Produtos
- Categorias
- Fornecedores
- Movimentacoes
- Relatorios (filtro por data)

### Recursos implementados
- Persistencia de sessao com AsyncStorage
- Drawer lateral otimizado para tablet
- Cards no dashboard
- CRUD basico de produtos/categorias/fornecedores
- Registro de entrada/saida de estoque
- Cache offline basico para listagem de produtos

## 4) Banco de dados (Prisma + Railway)

Modelo Prisma em `backend/prisma/schema.prisma` com tabelas:
- `User`
- `Product`
- `Category`
- `Supplier`
- `StockMovement`

Relacionamentos:
- Product -> Category
- Product -> Supplier
- StockMovement -> Product
- StockMovement -> User

## 5) Como rodar o backend

1. Entre na pasta:

```bash
cd backend
```

2. Instale dependencias:

```bash
npm install
```

3. Crie arquivo `.env` com base em `.env.example`.

Importante: substitua os placeholders por valores reais. Se deixar `HOST:PORT` literal, o Prisma retorna `P1013 invalid port number`.

4. Gere cliente Prisma e rode migration:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Suba API:

```bash
npm run dev
```

API disponivel em `http://localhost:4000`.

## 6) Como conectar ao Railway (PostgreSQL)

1. No Railway, crie um projeto com plugin PostgreSQL.
2. Copie a string de conexao (`DATABASE_URL`) do painel.
3. Cole no `.env` do backend:

```env
DATABASE_URL="postgresql://usuario:senha@host.railway.internal:5432/railway?schema=public"
JWT_SECRET="seu-segredo-forte"
```

Observacoes importantes sobre a URL:
- Nao use `HOST` e `PORT` literais; use os valores reais do Railway.
- Se a senha tiver caracteres especiais (`@`, `:`, `/`, `#`, `%`), encode com URL encoding.
- Se o Railway fornecer parametros extras (ex.: `sslmode=require`), mantenha esses parametros.

4. Rode migrations novamente:

```bash
npm run prisma:migrate
```

Se aparecer `P1013`, valide rapidamente se a URL tem este padrao:

```text
postgresql://usuario:senha@host:5432/database?schema=public
```

## 7) Como rodar o frontend (Expo)

1. Entre na pasta:

```bash
cd frontend
```

2. Instale dependencias:

```bash
npm install
```

3. Crie `.env` com base em `.env.example`.

Para emulador Android (Android Studio), mantenha:

```env
EXPO_PUBLIC_API_URL=http://10.0.2.2:4000/api
```

4. Inicie o app:

```bash
npm run start
```

5. No terminal do Expo:
- pressione `a` para abrir no Android Emulator
- ou use `npm run android`

## 8) Como testar no Android Studio

1. Abra Android Studio e inicie um Virtual Device (tablet recomendado).
2. Garanta backend rodando em `localhost:4000`.
3. Rode Expo no frontend e abra no emulador (`a`).
4. Valide:
- cadastro/login
- criacao de categorias e fornecedores
- criacao de produtos
- movimentacoes de entrada e saida
- dashboard e relatorio

## 9) Extras incluidos

- Campo de `barcode` no produto
- Campo `imageUrl` para imagem de produto
- Cache local simples (modo offline basico) para produtos

## Observacoes

- O scanner de codigo de barras foi preparado via dependencia `expo-barcode-scanner` e pode ser expandido para uma tela dedicada.
- Para ambiente de producao, recomenda-se adicionar testes automatizados, logging estruturado, refresh token e politicas de permissao por perfil de usuario.

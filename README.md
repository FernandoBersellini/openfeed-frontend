# Openfeed — Frontend

Cliente web do Openfeed, um app de posts simples com tags, comentários e curtidas.

Este repositório contém apenas o frontend. Para a documentação da API (entidades, endpoints, DTOs, autenticação, rate limiting etc.), veja o README do backend.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router

## Rodando o projeto

```bash
npm install
npm run dev
```

A aplicação espera a API rodando em `http://localhost:8080/api/v1` (ver `src/utils/api.ts`).

Outros scripts:

```bash
npm run build    # typecheck + build de produção
npm run lint     # eslint
npm run preview  # preview do build de produção
```

## Estrutura

```
src/
├── components/   # componentes de UI (Post, CommentSection, Auth, forms, etc.)
├── context/      # AuthContext — estado de autenticação compartilhado
├── hooks/        # useAuth, usePosts, useComments — lógica de dados e chamadas à API
├── utils/        # cliente axios (api.ts) e storage de autenticação
```

## Autenticação

O token JWT retornado pelo backend é persistido em `localStorage` (`src/utils/authStorage.ts`) e injetado automaticamente em cada requisição via interceptor do Axios (`src/utils/api.ts`). O logout invalida o token no backend (`POST auth/sair`) além de limpar o estado local.

## Features implementadas

- Cadastro e login
- Logout com revogação de token
- Criar, editar e excluir posts (com tags)
- Comentar, editar e excluir comentários
- Curtir/descurtir posts e comentários

## Convenções

Padrão de nomeação: camelCase
Idioma: Português

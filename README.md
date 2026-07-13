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

A URL da API é configurada via variáveis de ambiente (ver `.env`):

```
VITE_LOCAL_BACKEND_URL=http://localhost:8080
VITE_PROD_BACKEND_URL=https://open-feed.fly.dev
```

Em desenvolvimento (`npm run dev`) o cliente usa `VITE_LOCAL_BACKEND_URL`; em build de produção usa `VITE_PROD_BACKEND_URL` (ver `src/utils/api.ts`).

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
├── utils/        # cliente axios (api.ts)
```

## Autenticação

A sessão é mantida via cookie HttpOnly setado pelo backend no login (`POST /auth/entrar`) — o token de sessão nunca fica acessível ao JavaScript do frontend. O estado de autenticação é restaurado a cada carregamento da página via `GET /auth/me` (`src/hooks/useAuth.ts`).

Como frontend e backend estão em origens diferentes (Vercel e Fly.io), a proteção CSRF usa o padrão double-submit: o backend retorna o token CSRF tanto em um cookie (`XSRF-TOKEN`) quanto no corpo das respostas de `/auth/entrar` e `/auth/me` (campo `csrfToken`), já que o frontend não consegue ler cookies de outra origem via `document.cookie`. O token é mantido em memória (nunca em `localStorage`) e reenviado automaticamente como header `X-XSRF-TOKEN` em cada requisição (`src/utils/api.ts`). Mais detalhes em [`csrf-token-in-response-body.md`](./csrf-token-in-response-body.md).

O logout invalida a sessão no backend (`POST /auth/sair`) além de limpar o estado local.

## Deploy

O projeto é implantado na Vercel. `vercel.json` configura o rewrite necessário para SPA (todas as rotas servem `index.html`, evitando 404 em navegações diretas). A variável `VITE_PROD_BACKEND_URL` deve estar configurada no painel da Vercel (Environment Variables), já que o `.env` local não é versionado.

## Features implementadas

- Cadastro e login
- Logout com revogação de token
- Criar, editar e excluir posts (com tags)
- Comentar, editar e excluir comentários
- Curtir/descurtir posts e comentários

## Convenções

Padrão de nomeação: camelCase
Idioma: Português

Ready for review
Select text to add comments on the plan
Plano: criar usePosts e useAuth como hooks customizados
Contexto
O usuário quer entender como extrair lógica de componentes em hooks customizados, separando estado/efeitos da estilização/JSX. O projeto Openfeed já tem essa lógica espalhada em Content.tsx (estado de posts em useState + mock posts.ts) e uma pasta src/hooks/ recém-criada com authHook.ts vazio, sinalizando intenção de adicionar autenticação.

O backend Spring (rodando em http://localhost:8080) já está parcialmente implementado para posts. Testamos os endpoints reais via curl e o contrato efetivo diverge do README em vários pontos (método HTTP, path, nomes de campo). O plano usa o contrato confirmado por teste direto, não o README, como fonte da verdade para usePosts. Auth (/criar-conta, /entrar) retornou 404 — ainda não implementado no backend — então useAuth será mock local por enquanto, desenhado para trocar de implementação sem mudar sua interface pública (esse é o ponto pedagógico principal).

Contrato real do backend (confirmado via curl)
Base: http://localhost:8080/api/v1

GET /posts/retornar-postagens/{userId} → 200, array de {id, titulo, conteudo, tag: string|null, dataPostagem} (tag em UPPERCASE, ex. "CINEMA")
POST /posts/criar-postagem → body {titulo, conteudo, tag?, idUsuario} (idUsuario obrigatório) → 201, body é string simples "Post salvo com sucesso" (sem o objeto criado — precisa refetch)
PATCH /posts/atualizar-postagem/{id} → body {titulo?, conteudo?, tag?, idUsuario} (idUsuario obrigatório mesmo em update parcial) → 200, string "Post atualizado"
DELETE /posts/deletar-postagem/{id}?idUsuario={idUsuario} → 200, string "Post deletado"
Tags assumidas (mesma lista do README, em UPPERCASE): VIDEOGAMES, CINEMA, ESPORTES, LAZER, COMIDA, VIAGENS.

Auth (/criar-conta, /entrar) → 404, não implementado ainda. useAuth não deve chamar a rede.

Arquivos a criar
src/utils/api.ts — instância axios única

import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});
src/hooks/usePosts.ts

Tipo de domínio em inglês Post {id, title, content, tag?: string | null, createdAt}, mapeado a partir do DTO real (titulo, conteudo, dataPostagem) por uma função mapToPost privada ao arquivo. Isso evita renomear props em Post.tsx/PostFormModal.tsx/Content.tsx e ilustra a tradução DTO → modelo de domínio na borda do hook.
Assinatura: usePosts(userId: number) retornando { posts, isLoading, error, refetch, createPost, updatePost, deletePost }.
createPost/updatePost/deletePost chamam o endpoint e depois refetch() (sem optimistic update, já que create/update não retornam o objeto).
Único estado isLoading/error compartilhado entre as operações é suficiente aqui.
src/hooks/useAuth.ts (substitui src/hooks/authHook.ts — renomear, não deixar os dois arquivos)

Assinatura: useAuth() retornando { user, isAuthenticated, isLoading, error, login, logout }.
Mock local: usuário fixo {id: 3, name: "Usuário Teste", email: "teste@example.com"} (id 3 é o usuário testado no backend), auto-logado por padrão (sem tela de login nesta etapa) ou recuperável de localStorage.
Nenhum import de axios neste arquivo — a ausência é intencional: quando o backend de auth existir, só o interior do hook muda, não quem o consome.
Rename via git mv src/hooks/authHook.ts src/hooks/useAuth.ts seguido da escrita do conteúdo (nome atual não segue a convenção use* exigida pelo eslint-plugin-react-hooks, já presente no projeto).
Arquivos a modificar
src/components/Post.tsx

Adicionar tag?: string | null a PostProps e renderizar como badge pequeno opcional.
Adicionar botão "Excluir" chamando uma prop onDelete: () => void passada por Content.tsx (que internamente chama deletePost(id) do hook).
Manter likeCount local intacto (fora de escopo).
src/components/PostFormModal.tsx

Adicionar estado tag (useState<string>("")) e um <select> opcional com as 6 tags em UPPERCASE.
onSubmit passa a ser (title: string, content: string, tag?: string) => void, enviando tag || undefined.
Resetar tag junto com title/content ao submeter/fechar.
src/components/Content.tsx

Remover useState(initialPosts) e o import de posts.ts.
const { user } = useAuth(); e const { posts, isLoading, error, createPost, deletePost } = usePosts(user.id); (já que useAuth mock está sempre logado, user nunca é null aqui).
handleAddPost torna-se wrapper fino chamando createPost({ title, content, tag }).
Renderizar estados de loading/erro de forma simples antes da lista (<p>Carregando...</p> / mensagem de erro).
Passar onDelete={() => deletePost(post.id)} para cada Post.
Remover o useEffect de debug (console.log(postList)).
Não modificado
src/utils/posts.ts fica como está (vira código morto, sem necessidade de deletar agora).

Sequenciamento
src/utils/api.ts
Renomear authHook.ts → useAuth.ts, implementar mock
src/hooks/usePosts.ts
Post.tsx (tag + botão excluir)
PostFormModal.tsx (select de tag)
Content.tsx (wiring final dos dois hooks)
Verificação
npm run build (roda tsc -b) — checar erros de tipo, especialmente verbatimModuleSyntax (usar import type para tipos) e imports não usados (remover initialPosts).
npm run dev, abrir no browser com o backend já rodando em localhost:8080:
Carregar a página deve disparar GET /api/v1/posts/retornar-postagens/3 e renderizar os posts retornados (com tag quando houver).
Criar post via modal (com e sem tag) deve fechar o modal e a lista deve atualizar com o novo post após refetch.
Clicar "Excluir" em um post deve chamar o DELETE e remover o post da lista após refetch.
Add Comment
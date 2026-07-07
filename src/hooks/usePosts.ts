import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../utils/api";

export interface Post {
    id: number;
    title: string;
    content: string;
    tag?: string | null;
    createdAt: string;
    totalLikes: number;
    likedByCurrentUser: boolean;
}

export interface CreatePostInput {
    title: string;
    content: string;
    tag?: string;
}

export interface UpdatePostInput {
    title?: string;
    content?: string;
    tag?: string;
}

interface ApiPostDTO {
    id: number;
    titulo: string;
    conteudo: string;
    tag: string | null;
    dataPostagem: string;
    totalLikes: number;
    usuarioAtualCurtiu: boolean;
}

interface ApiLikeDTO {
    totalLikes: number;
    usuarioAtualCurtiu: boolean;
}

interface UsePostsResult {
    posts: Post[];
    isLoading: boolean;
    isCreating: boolean;
    deletingId: number | null;
    error: string | null;
    refetch: () => Promise<void>;
    createPost: (input: CreatePostInput) => Promise<void>;
    updatePost: (id: number, input: UpdatePostInput) => Promise<void>;
    deletePost: (id: number) => Promise<void>;
    toggleLike: (id: number) => Promise<void>;
}

function mapToPost(dto: ApiPostDTO): Post {
    return {
        id: dto.id,
        title: dto.titulo,
        content: dto.conteudo,
        tag: dto.tag,
        createdAt: dto.dataPostagem,
        totalLikes: dto.totalLikes,
        likedByCurrentUser: dto.usuarioAtualCurtiu,
    };
}

export function usePosts(userId: number): UsePostsResult {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const latestRequestId = useRef(0);

    const refetch = useCallback(async () => {
        const requestId = ++latestRequestId.current;
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiPostDTO[]>(`/posts/retornar-postagens/${userId}`);
            if (requestId !== latestRequestId.current) return;
            setPosts((response.data ?? []).map(mapToPost));
        } catch {
            if (requestId !== latestRequestId.current) return;
            setError("Não foi possível carregar os posts");
        } finally {
            if (requestId === latestRequestId.current) setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount, not a render-triggered cascade
        refetch();
    }, [refetch]);

    async function createPost(input: CreatePostInput) {
        setError(null);
        setIsCreating(true);
        try {
            await api.post("/posts/criar-postagem", {
                titulo: input.title,
                conteudo: input.content,
                tag: input.tag,
                idUsuario: userId,
            });
            await refetch();
        } catch {
            setError("Não foi possível criar o post");
        } finally {
            setIsCreating(false);
        }
    }

    async function updatePost(id: number, input: UpdatePostInput) {
        setError(null);
        try {
            await api.patch(`/posts/atualizar-postagem/${id}`, {
                titulo: input.title,
                conteudo: input.content,
                tag: input.tag,
                idUsuario: userId,
            });
            await refetch();
        } catch {
            setError("Não foi possível atualizar o post");
        }
    }

    async function deletePost(id: number) {
        setError(null);
        setDeletingId(id);
        try {
            await api.delete(`/posts/deletar-postagem/${id}`, {
                params: { idUsuario: userId },
            });
            await refetch();
        } catch {
            setError("Não foi possível excluir o post");
        } finally {
            setDeletingId(null);
        }
    }

    async function toggleLike(id: number) {
        const previousPosts = posts;
        setPosts((current) =>
            current.map((post) =>
                post.id === id
                    ? {
                          ...post,
                          likedByCurrentUser: !post.likedByCurrentUser,
                          totalLikes: post.totalLikes + (post.likedByCurrentUser ? -1 : 1),
                      }
                    : post
            )
        );
        try {
            const response = await api.post<ApiLikeDTO>(`/posts/interagir-com-postagem/${id}`);
            setPosts((current) =>
                current.map((post) =>
                    post.id === id
                        ? { ...post, totalLikes: response.data.totalLikes, likedByCurrentUser: response.data.usuarioAtualCurtiu }
                        : post
                )
            );
        } catch {
            setPosts(previousPosts);
            setError("Não foi possível curtir o post");
        }
    }

    return { posts, isLoading, isCreating, deletingId, error, refetch, createPost, updatePost, deletePost, toggleLike };
}

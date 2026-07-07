import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../utils/api";

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    userId: number;
    username: string;
    totalLikes: number;
    likedByCurrentUser: boolean;
}

interface ApiCommentDTO {
    idComentario: number;
    conteudo: string;
    dataComentario: string;
    idUsuario: number;
    username: string;
    totalLikes: number;
    usuarioAtualCurtiu: boolean;
}

interface ApiLikeDTO {
    totalLikes: number;
    usuarioAtualCurtiu: boolean;
}

interface UseCommentsResult {
    comments: Comment[];
    isLoading: boolean;
    isCreating: boolean;
    editingId: number | null;
    deletingId: number | null;
    error: string | null;
    refetch: () => Promise<void>;
    createComment: (content: string) => Promise<void>;
    updateComment: (id: number, content: string) => Promise<void>;
    deleteComment: (id: number) => Promise<void>;
    toggleLike: (id: number) => Promise<void>;
}

function mapToComment(dto: ApiCommentDTO): Comment {
    return {
        id: dto.idComentario,
        content: dto.conteudo,
        createdAt: dto.dataComentario,
        userId: dto.idUsuario,
        username: dto.username,
        totalLikes: dto.totalLikes,
        likedByCurrentUser: dto.usuarioAtualCurtiu,
    };
}

export function useComments(postId: number): UseCommentsResult {
    const [comments, setComments] = useState<Comment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const latestRequestId = useRef(0);

    const refetch = useCallback(async () => {
        const requestId = ++latestRequestId.current;
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get<ApiCommentDTO[]>(`/comentarios/retornar-comentarios/${postId}`);
            if (requestId !== latestRequestId.current) return;
            setComments((response.data ?? []).map(mapToComment));
        } catch {
            if (requestId !== latestRequestId.current) return;
            setError("Não foi possível carregar os comentários");
        } finally {
            if (requestId === latestRequestId.current) setIsLoading(false);
        }
    }, [postId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount, not a render-triggered cascade
        refetch();
    }, [refetch]);

    async function createComment(content: string) {
        setError(null);
        setIsCreating(true);
        try {
            await api.post(`/comentarios/criar-comentario/${postId}`, { conteudo: content });
            await refetch();
        } catch {
            setError("Não foi possível criar o comentário");
        } finally {
            setIsCreating(false);
        }
    }

    async function updateComment(id: number, content: string) {
        setError(null);
        setEditingId(id);
        try {
            await api.patch(`/comentarios/editar-comentario/${id}`, { conteudo: content });
            await refetch();
        } catch {
            setError("Não foi possível atualizar o comentário");
        } finally {
            setEditingId(null);
        }
    }

    async function deleteComment(id: number) {
        setError(null);
        setDeletingId(id);
        try {
            await api.delete(`/comentarios/deletar-comentario/${id}`);
            await refetch();
        } catch {
            setError("Não foi possível excluir o comentário");
        } finally {
            setDeletingId(null);
        }
    }

    async function toggleLike(id: number) {
        const previousComments = comments;
        setComments((current) =>
            current.map((comment) =>
                comment.id === id
                    ? {
                          ...comment,
                          likedByCurrentUser: !comment.likedByCurrentUser,
                          totalLikes: comment.totalLikes + (comment.likedByCurrentUser ? -1 : 1),
                      }
                    : comment
            )
        );
        try {
            const response = await api.post<ApiLikeDTO>(`/comentarios/interagir-com-comentario/${id}`);
            setComments((current) =>
                current.map((comment) =>
                    comment.id === id
                        ? { ...comment, totalLikes: response.data.totalLikes, likedByCurrentUser: response.data.usuarioAtualCurtiu }
                        : comment
                )
            );
        } catch {
            setComments(previousComments);
            setError("Não foi possível curtir o comentário");
        }
    }

    return {
        comments,
        isLoading,
        isCreating,
        editingId,
        deletingId,
        error,
        refetch,
        createComment,
        updateComment,
        deleteComment,
        toggleLike,
    };
}

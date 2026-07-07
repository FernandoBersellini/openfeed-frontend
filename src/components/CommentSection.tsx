import { useState } from "react";
import Spinner from "./Spinner";
import CommentItem from "./CommentItem";
import { useComments } from "../hooks/useComments";

interface CommentSectionProps {
    postId: number;
}

function CommentSection({ postId }: CommentSectionProps) {
    const {
        comments,
        isLoading,
        isCreating,
        editingId,
        deletingId,
        error,
        createComment,
        updateComment,
        deleteComment,
        toggleLike,
    } = useComments(postId);
    const [content, setContent] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!content.trim()) return;
        await createComment(content);
        setContent("");
    }

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300">Comentários</h3>

            {isLoading && <p className="text-sm text-gray-500 dark:text-gray-400">Carregando comentários...</p>}
            {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
            {!isLoading && comments.length === 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500">Nenhum comentário ainda.</p>
            )}

            <div className="flex flex-col gap-2">
                {comments.map((comment) => (  
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        isEditing={editingId === comment.id}
                        isDeleting={deletingId === comment.id}
                        onUpdate={(newContent) => updateComment(comment.id, newContent)}
                        onDelete={() => deleteComment(comment.id)}
                        onToggleLike={() => toggleLike(comment.id)}
                    />
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva um comentário..."
                    rows={2}
                    className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-800 dark:text-gray-100 dark:bg-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                    type="submit"
                    disabled={isCreating}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 self-end"
                >
                    {isCreating && <Spinner />}
                    {isCreating ? "Enviando..." : "Comentar"}
                </button>
            </form>
        </div>
    );
}

export default CommentSection;

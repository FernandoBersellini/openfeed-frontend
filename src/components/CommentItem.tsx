import { useState } from "react";
import Spinner from "./Spinner";
import type { Comment } from "../hooks/useComments";

interface CommentItemProps {
    comment: Comment;
    isEditing?: boolean;
    isDeleting?: boolean;
    onUpdate: (content: string) => Promise<void>;
    onDelete: () => void;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function CommentItem({ comment, isEditing, isDeleting, onUpdate, onDelete }: CommentItemProps) {
    const [isEditingForm, setIsEditingForm] = useState(false);
    const [content, setContent] = useState(comment.content);


    async function handleSave() {
        if (!content.trim()) return;
        await onUpdate(content);
        setIsEditingForm(false);
    }

    function handleCancel() {
        setContent(comment.content);
        setIsEditingForm(false);
    }

    if (isEditingForm) {
        return (
            <div className="border border-gray-200 rounded-lg p-3 flex flex-col gap-2">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={2}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={handleCancel}
                        disabled={isEditing}
                        className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 text-sm hover:bg-gray-100 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isEditing}
                        className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-sm font-semibold hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isEditing && <Spinner />}
                        {isEditing ? "Salvando..." : "Salvar"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-1">
                <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => setIsEditingForm(true)}
                    className="text-xs text-blue-500 hover:text-blue-600 cursor-pointer transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={onDelete}
                    disabled={isDeleting}
                    className="text-xs text-red-500 hover:text-red-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isDeleting ? "Excluindo..." : "Excluir"}
                </button>
            </div>
        </div>
    );
}

export default CommentItem;

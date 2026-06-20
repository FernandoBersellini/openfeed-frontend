import { useState } from "react";

const AVAILABLE_TAGS = ["VIDEOGAMES", "CINEMA", "ESPORTES", "LAZER", "COMIDA", "VIAGENS"];

interface PostFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (title: string, content: string, tag?: string) => void;
}

function PostFormModal({ isOpen, onClose, onSubmit }: PostFormModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");

    if (!isOpen) return null;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;
        onSubmit(title, content, tag || undefined);
        setTitle("");
        setContent("");
        setTag("");
        onClose();
    }

    function handleOverlayClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            onClick={handleOverlayClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 animate-[fadeIn_0.2s_ease-out]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Novo Post</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none cursor-pointer transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="post-title" className="text-sm font-semibold text-gray-600">
                            Título
                        </label>
                        <input
                            id="post-title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Digite o título do post"
                            className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="post-content" className="text-sm font-semibold text-gray-600">
                            Conteúdo
                        </label>
                        <textarea
                            id="post-content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Digite o conteúdo do post"
                            rows={4}
                            className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="post-tag" className="text-sm font-semibold text-gray-600">
                            Tag (opcional)
                        </label>
                        <select
                            id="post-tag"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        >
                            <option value="">Nenhuma</option>
                            {AVAILABLE_TAGS.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end mt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer transition-colors"
                        >
                            Publicar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostFormModal;

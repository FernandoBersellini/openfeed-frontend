import Spinner from "./Spinner";
import CommentSection from "./CommentSection";

interface PostProps {
    id: number;
    title: string;
    content: string;
    tag?: string | null;
    createdAt: string;
    totalLikes: number;
    likedByCurrentUser: boolean;
    isDeleting?: boolean;
    onDelete: () => void;
    onEdit: () => void;
    onToggleLike: () => void;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function Post(props: PostProps) {
    return (
        <section className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start">
                <span className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500">{props.tag}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{formatDate(props.createdAt)}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{props.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{props.content}</p>
            <div className="flex gap-2">
                <button
                    onClick={props.onToggleLike}
                    aria-pressed={props.likedByCurrentUser}
                    className={`px-4 py-2 rounded cursor-pointer transition-colors flex items-center gap-2 border ${
                        props.likedByCurrentUser
                            ? "bg-pink-500 text-white border-pink-500 hover:bg-pink-600"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                    {props.likedByCurrentUser ? "♥" : "♡"} {props.totalLikes}
                </button>
                <button
                    onClick={props.onEdit}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
                >
                    Editar
                </button>
                <button
                    onClick={props.onDelete}
                    disabled={props.isDeleting}
                    className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {props.isDeleting && <Spinner />}
                    {props.isDeleting ? "Excluindo..." : "Excluir"}
                </button>
            </div>
            <CommentSection postId={props.id} />
        </section>
    )
}

export default Post;
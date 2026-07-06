import Spinner from "./Spinner";
import CommentSection from "./CommentSection";

interface PostProps {
    id: number;
    title: string;
    content: string;
    tag?: string | null;
    createdAt: string;
    isDeleting?: boolean;
    onDelete: () => void;
    onEdit: () => void;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function Post(props: PostProps) {
    return (
        <section className="border border-gray-300 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start">
                <span className="text-xs font-semibold uppercase text-gray-400">{props.tag}</span>
                <span className="text-xs text-gray-400">{formatDate(props.createdAt)}</span>
            </div>
            <h2 className="text-xl font-bold mb-2">{props.title}</h2>
            <p className="text-gray-700 mb-2">{props.content}</p>
            <div className="flex gap-2">
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
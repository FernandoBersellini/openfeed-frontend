interface PostButtonProps {
    onClick: () => void;
}

export default function PostButton({ onClick }: PostButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-500 dark:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer transition-colors"
        >
            + Novo Post
        </button>
    )
}
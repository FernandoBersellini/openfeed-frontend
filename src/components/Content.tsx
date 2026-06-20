import { useState } from "react";
import Post from "./Post";
import PostFormModal from "./PostFormModal";
import { useAuth } from "../hooks/useAuth";
import { usePosts } from "../hooks/usePosts";

function Content() {
    const { user } = useAuth();
    const { posts, isLoading, error, createPost, deletePost } = usePosts(user?.id ?? 0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleAddPost(title: string, content: string, tag?: string) {
        createPost({ title, content, tag });
    }

    return (
        <main className="w-2/5 m-auto py-6">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-600 cursor-pointer transition-colors"
                >
                    + Novo Post
                </button>
            </div>

            {isLoading && <p className="text-gray-500 mb-4">Carregando...</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {posts.map((post) => (
                <Post
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    tag={post.tag}
                    onDelete={() => deletePost(post.id)}
                />
            ))}

            <PostFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddPost}
            />
        </main>
    )
}

export default Content;

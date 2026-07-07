import { useState } from "react";
import Post from "./Post";
import PostFormModal from "./PostFormModal";
import { useAuth } from "../context/useAuth";
import { usePosts, type Post as PostData } from "../hooks/usePosts";
import PostButton from "./PostButton";

function Content() {
    const { user } = useAuth();
    const { posts, isLoading, isCreating, deletingId, error, createPost, updatePost, deletePost, toggleLike } = usePosts(user?.id ?? 0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<PostData | null>(null);

    async function handleAddPost(title: string, content: string, tag?: string) {
        await createPost({ title, content, tag });
    }

    async function handleEditPost(title: string, content: string, tag?: string) {
        if (!editingPost) return;
        await updatePost(editingPost.id, { title, content, tag });
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingPost(null);
    }

    return (
        <main className="w-2/5 m-auto py-6">
            <div className="flex justify-end mb-4">
                {posts.length > 0 && (
                    <PostButton
                        onClick={() => setIsModalOpen(true)}
                    />
                )}
            </div>

            {isLoading && <p className="text-gray-500 dark:text-gray-400 mb-4">Carregando...</p>}
            {error && <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>}
            {!isLoading && !error && posts.length === 0 && (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-4">Nenhum post ainda, vamos mudar isso!</p>
                    <PostButton
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            )}

            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    tag={post.tag}
                    createdAt={post.createdAt}
                    totalLikes={post.totalLikes}
                    likedByCurrentUser={post.likedByCurrentUser}
                    isDeleting={deletingId === post.id}
                    onDelete={() => deletePost(post.id)}
                    onEdit={() => setEditingPost(post)}
                    onToggleLike={() => toggleLike(post.id)}
                />
            ))}

            <PostFormModal
                key={editingPost?.id ?? "new"}
                isOpen={isModalOpen || editingPost !== null}
                isSubmitting={isCreating}
                initialTitle={editingPost?.title}
                initialContent={editingPost?.content}
                initialTag={editingPost?.tag}
                onClose={closeModal}
                onSubmit={editingPost ? handleEditPost : handleAddPost}
            />
        </main>
    )
}

export default Content;

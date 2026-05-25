import { useEffect, useState } from "react";
import Post from "./Post";
import PostFormModal from "./PostFormModal";
import { posts as initialPosts } from "../utils/posts";

function Content() {
    const [postList, setPostList] = useState(initialPosts);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleAddPost(title: string, content: string) {
        const newPost = {
            id: postList.length > 0 ? Math.max(...postList.map(p => p.id)) + 1 : 1,
            title,
            content,
        };
        setPostList([newPost, ...postList]);
    }

    useEffect(() => {
        console.log(postList);
    }, [postList]);

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

            {postList.map((post) => (
                <Post key={post.id} title={post.title} content={post.content} />
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

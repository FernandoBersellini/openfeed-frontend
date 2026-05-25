import { useState } from "react";

interface PostProps {
    title: string;
    content: string;
}

function Post(props: PostProps) {
    const [likeCount, setLikeCount] = useState(0);

    return (
        <section className="border border-gray-300 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{props.title}</h2>
            <p className="text-gray-700 mb-2">{props.content}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button onClick={() => setLikeCount(likeCount + 1)} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors">Like</button>
                    <button onClick={() => setLikeCount(likeCount - 1)} className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition-colors">Dislike</button>
                </div>
                <p>Like count: {likeCount}</p>
            </div>
        </section>
    )
}

export default Post;
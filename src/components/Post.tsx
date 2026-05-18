function Post() {
    return (
        <section className="border border-gray-300 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Titulo do Post</h2>
            <p className="text-gray-700 mb-2">Conteudo do post...</p>
            <div className="flex gap-2">
                <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors">Like</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-600 transition-colors">Dislike</button>
            </div>
        </section>
    )
}

export default Post;
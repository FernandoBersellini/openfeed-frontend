import Nav from "./Nav";

function Header() {
    return (
        <header className="w-2/5 m-auto mt-5 mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Aplicativo de posts</h1>
            <Nav />
        </header>
    )
}

export default Header
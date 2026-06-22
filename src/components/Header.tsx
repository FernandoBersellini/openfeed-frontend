import { useAuthState } from "../hooks/useAuth"

function Header() {
    const { logout } = useAuthState()
    return (
        <header className="w-2/5 m-auto mt-5 mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold">OpenFeed</h1>
            <button onClick={logout} className="w-24 cursor-pointer h-14 bg-red-700 rounded-md border-none flex justify-center items-center ml-8 text-white font-bold transition-all duration-300 hover:bg-red-800">
                Sair
            </button>
        </header>
    )
}

export default Header
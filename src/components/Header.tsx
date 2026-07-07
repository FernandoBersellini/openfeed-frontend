import { useAuth } from "../context/useAuth"
import ThemeSwitch from "./ThemeSwitch"

function Header() {
    const { logout } = useAuth()
    return (
        <header className="w-2/5 m-auto mt-5 mb-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">OpenFeed</h1>
            <div className="flex items-center">
                <ThemeSwitch />
                <button onClick={logout} className="w-24 cursor-pointer h-14 bg-red-700 rounded-md border-none flex justify-center items-center ml-4 text-white font-bold transition-all duration-300 hover:bg-red-800">
                    Sair
                </button>
            </div>
        </header>
    )
}

export default Header
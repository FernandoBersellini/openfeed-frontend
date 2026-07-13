import { useAuth } from "../context/useAuth"
import ThemeSwitch from "./ThemeSwitch"

function Header() {
    const { logout } = useAuth()
    return (
        <header className="flex flex-col gap-3 sm:flex-row w-2/5 m-auto mt-5 mb-8 justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">OpenFeed</h1>
            <div className="flex items-center">
                <ThemeSwitch />
                <button
                    onClick={logout}
                    aria-label="Sair"
                    title="Sair"
                    className="cursor-pointer h-14 w-14 bg-red-700 rounded-md border-none flex justify-center items-center ml-4 text-white transition-all duration-300 hover:bg-red-800"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header
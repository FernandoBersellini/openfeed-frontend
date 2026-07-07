import { useTheme } from "../context/useTheme"

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === "dark"

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            title={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
            className="cursor-pointer h-14 w-14 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xl flex justify-center items-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
            {isDark ? "🌙" : "☀️"}
        </button>
    )
}

import { useState } from "react";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
    isLoading: boolean;
    error: string | null;
    onSwitchToSignUp: () => void;
}

function LoginForm({ onSubmit, isLoading, error, onSwitchToSignUp }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim() || !password.trim()) return;
        onSubmit(email, password);
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Entrar</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="login-email" className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Email
                    </label>
                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-4 py-2.5 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="login-password" className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                        Senha
                    </label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="border border-gray-300 dark:border-gray-600 dark:bg-gray-900 rounded-lg px-4 py-2.5 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-lg bg-blue-500 dark:bg-blue-600 text-white font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? "Entrando..." : "Entrar"}
                </button>
            </form>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-6 text-center">
                Não tem uma conta?{" "}
                <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="text-blue-500 dark:text-blue-400 font-semibold hover:underline cursor-pointer"
                >
                    Cadastre-se
                </button>
            </p>
        </div>
    );
}

export default LoginForm;

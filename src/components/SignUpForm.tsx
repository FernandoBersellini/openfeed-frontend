import { useState } from "react";

interface SignUpFormProps {
    onSubmit: (email: string, password: string, username?: string) => void;
    isLoading: boolean;
    error: string | null;
    onSwitchToLogin: () => void;
}

function SignUpForm({ onSubmit, isLoading, error, onSwitchToLogin }: SignUpFormProps) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email.trim() || !password.trim()) return;
        onSubmit(email, password, username || undefined);
    }

    return (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Criar conta</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="signup-username" className="text-sm font-semibold text-gray-600">
                        Username (opcional)
                    </label>
                    <input
                        id="signup-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Digite seu username"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="signup-email" className="text-sm font-semibold text-gray-600">
                        Email
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="signup-password" className="text-sm font-semibold text-gray-600">
                        Senha
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-5 py-2.5 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                </button>
            </form>

            <p className="text-sm text-gray-600 mt-6 text-center">
                Já tem uma conta?{" "}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-blue-500 font-semibold hover:underline cursor-pointer"
                >
                    Entrar
                </button>
            </p>
        </div>
    );
}

export default SignUpForm;

import { useEffect, useState } from "react";
import { api, setXsrfToken } from "../utils/api";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    csrfToken?: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username?: string) => Promise<void>;
    logout: () => Promise<void>;
}

export function useAuthState(): AuthState {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        api.get<AuthUser>("/auth/me")
            .then((response) => {
                setXsrfToken(response.data.csrfToken ?? null);
                setUser(response.data);
            })
            .catch(() => setUser(null))
            .finally(() => setIsLoading(false));
    }, []);

    async function login(email: string, password: string) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post<AuthUser>("/auth/entrar", { email, password });
            setXsrfToken(response.data.csrfToken ?? null);
            setUser(response.data);
        } catch {
            setError("Email ou senha inválidos");
        } finally {
            setIsLoading(false);
        }
    }

    async function signUp(email: string, password: string, username?: string) {
        setIsLoading(true);
        setError(null);
        try {
            await api.post("/auth/criar-conta", { email, password, username });
            await login(email, password);
        } catch {
            setError("Não foi possível criar a conta");
            setIsLoading(false);
        }
    }

    async function logout() {
        try {
            await api.post("/auth/sair");
        } catch {
            // ignora falha na revogação da sessão; o logout local prossegue de qualquer forma
        }
        setXsrfToken(null);
        setUser(null);
    }

    return {
        user,
        isAuthenticated: user !== null,
        isLoading,
        error,
        login,
        signUp,
        logout,
    };
}

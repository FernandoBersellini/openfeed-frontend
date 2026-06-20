import { useEffect, useState } from "react";
import { api } from "../utils/api";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
}

interface UseAuthResult {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username?: string) => Promise<void>;
    logout: () => void;
}

const STORAGE_KEY = "authUser";

// TODO: remover quando existir uma tela de login real
const AUTO_LOGIN_CREDENTIALS = { email: "testehook@example.com", password: "senha1234" };

function loadStoredUser(): AuthUser | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
}

export function useAuth(): UseAuthResult {
    const [user, setUser] = useState<AuthUser | null>(loadStoredUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login(email: string, password: string) {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post<AuthUser>("/auth/entrar", { email, password });
            setUser(response.data);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
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

    function logout() {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    }

    useEffect(() => {
        if (!user) {
            login(AUTO_LOGIN_CREDENTIALS.email, AUTO_LOGIN_CREDENTIALS.password);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

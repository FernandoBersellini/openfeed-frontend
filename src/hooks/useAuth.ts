import { useState } from "react";
import { api } from "../utils/api";

export interface AuthUser {
    id: number;
    username: string;
    email: string;
}

export interface AuthState {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, username?: string) => Promise<void>;
    logout: () => void;
}

const STORAGE_KEY = "authUser";

function loadStoredUser(): AuthUser | null {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
}

export function useAuthState(): AuthState {
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
        window.location.href = "/auth";
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

import { useContext } from "react";
import { AuthContext } from "./authContextObject";
import type { AuthState } from "../hooks/useAuth";

export function useAuth(): AuthState {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}

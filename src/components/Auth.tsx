import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useAuth } from "../context/AuthContext";

function Auth() {
    const { login, signUp, isLoading, error } = useAuth();
    const [mode, setMode] = useState<"login" | "signup">("login");

    return (
        <div className="flex-1 flex items-center justify-center py-6">
            {mode === "login" ? (
                <LoginForm
                    onSubmit={login}
                    isLoading={isLoading}
                    error={error}
                    onSwitchToSignUp={() => setMode("signup")}
                />
            ) : (
                <SignUpForm
                    onSubmit={signUp}
                    isLoading={isLoading}
                    error={error}
                    onSwitchToLogin={() => setMode("login")}
                />
            )}
        </div>
    );
}

export default Auth;

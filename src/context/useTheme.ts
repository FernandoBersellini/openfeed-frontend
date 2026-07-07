import { useContext } from "react";
import { ThemeContext, type ThemeState } from "./themeContextObject";

export function useTheme(): ThemeState {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
    }
    return context;
}

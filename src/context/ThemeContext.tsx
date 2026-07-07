import type { ReactNode } from "react";
import { useThemeState } from "../hooks/useTheme";
import { ThemeContext } from "./themeContextObject";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useThemeState();
    return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

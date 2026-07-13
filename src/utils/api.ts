import axios from "axios";

const baseURL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : import.meta.env.VITE_LOCAL_BACKEND_URL;

export const api = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: true,
});

// The XSRF-TOKEN cookie is set by a different origin (the API), so frontend JS
// can never read it via document.cookie. The backend also returns the token
// in the /auth/entrar and /auth/me response bodies; we hold it here in memory
// (never persisted) and echo it back as a header on every request.
let xsrfToken: string | null = null;

export function setXsrfToken(token: string | null) {
    xsrfToken = token;
}

api.interceptors.request.use((config) => {
    if (xsrfToken) {
        config.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
    return config;
});
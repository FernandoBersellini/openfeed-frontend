import axios from "axios";

const baseURL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : import.meta.env.VITE_LOCAL_BACKEND_URL;

export const api = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: true,
});

function readCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

api.interceptors.request.use((config) => {
    const xsrfToken = readCookie("XSRF-TOKEN");
    if (xsrfToken) {
        config.headers["X-XSRF-TOKEN"] = xsrfToken;
    }
    return config;
});
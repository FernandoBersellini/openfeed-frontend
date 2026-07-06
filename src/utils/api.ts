import axios from "axios";
import { AUTH_STORAGE_KEY } from "./authStorage";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use((config) => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
        const { token } = JSON.parse(stored);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

import axios from "axios";

const baseURL = import.meta.env.PROD
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : import.meta.env.VITE_LOCAL_BACKEND_URL;

export const api = axios.create({
    baseURL: `${baseURL}/api/v1`,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});
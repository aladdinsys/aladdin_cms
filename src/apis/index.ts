import axios from "axios";
import { getCookie } from "@/utils/cookie";
import { ACCESS_TOKEN_COOKIE } from "@/constants/auth";

const accessToken = getCookie(ACCESS_TOKEN_COOKIE);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    validateStatus: (status) => status >= 200 && status < 400,
});

api.interceptors.request.use((config) => {
    const accessToken = getCookie(ACCESS_TOKEN_COOKIE);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => error.response,
);

export default api;

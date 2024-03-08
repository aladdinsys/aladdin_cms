import axios from "axios";
import {getCookie, removeCookie, setCookie} from "@/utils/cookie";
import {ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE} from "@/constants/auth";
import {Response} from "@/apis/types";
import {SignInResponse} from "@/apis/types/auth";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    validateStatus: (status) => status >= 200 && status < 400,
});

api.interceptors.request.use((config) => {
    const token = getCookie(ACCESS_TOKEN_COOKIE) ?? getCookie(REFRESH_TOKEN_COOKIE);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
api.interceptors.response.use(
    (response) => response,
    (error) => errorHandler({...error}),
);

const errorHandler = async (error: any) => {
    if (error.response.status === 401 || error.response.status === 403) {

        const res = await refreshToken();

        if(res === 'OK') {
            return api.request(error.config);
        }
    }

    if( error.response.status === 400) {
        return await Promise.reject(error.response.data.message);
    }

    const errorMsg = `Error from : ${error.config.url}\n`
        + `status : ${error.response.status} \n`
        + `message: ${error.response.statusText}`;
    return Promise.reject(errorMsg)
}


async function refreshToken() {
    removeCookie(ACCESS_TOKEN_COOKIE);

    return api.post<Response<SignInResponse>>('/auth/refresh-token', {})
        .then((res) => {
            const response = res.data;
            setCookie(ACCESS_TOKEN_COOKIE, response.result?.accessToken, {
                    path: '/',
                    maxAge: 86400 * 1000,
                },
            );
            setCookie(REFRESH_TOKEN_COOKIE, response.result?.refreshToken, {
                    path: '/',
                    maxAge: 86400 * 1000,
                },
            );

            return 'OK';
        })
        .catch((error) => error);
}

export default api;

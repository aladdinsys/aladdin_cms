'use client';

import useAuthState from "@/store/UserState";
import Link from "next/link";
import {refreshToken} from "@/apis";
import {useEffect} from "react";
import {getCookie, removeCookie, setCookie} from "@/utils/cookie";
import {ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE} from "@/constants/auth";
import Button from "@/components/atoms/Button";

export default function Nav() {

    const {
        name,
        setAuth,
        resetAuth
    } = useAuthState();

    useEffect(() => {
        if(!name && getCookie(REFRESH_TOKEN_COOKIE)) {
            refreshToken().then((res) => {
                const {
                    status,
                    result
                } = res;

                if(status === 'OK') {
                    setCookie(ACCESS_TOKEN_COOKIE, res.result?.accessToken, {
                            path: '/',
                            maxAge: 1000 * 60 * 60,
                        },
                    );
                    setCookie(REFRESH_TOKEN_COOKIE, res.result?.refreshToken, {
                            path: '/',
                            maxAge: 1000 * 60 * 60 * 24,
                        },
                    );

                    setAuth(res.result);
                }
            });
        }
    }, []);

    const handleLogout = () => {
        resetAuth();

        removeCookie(ACCESS_TOKEN_COOKIE);
        removeCookie(REFRESH_TOKEN_COOKIE);
    }



    return (
        <div className="relative bg-gray-900 p-8 flex flex-row justify-between items-center text-violet-50">
                <div
                    className={"flex-1 flex flex-row gap-2"}>
                    <Link href={"/"}>Home</Link>
                    <Link href={"/survey/forms"}>설문 목록</Link>
                    <Link href={"/survey/result"}>설문 결과</Link>
                </div>
                <div className={"flex-1 self-end flex justify-end flex-row gap-4"}>
                    {name ?
                        <div className={"flex"}>
                            <Button onClick={handleLogout}>{name} 로그 아웃</Button>
                        </div>
                        :
                        <Link href={"/auth/sign-in"}>로그 인</Link>}
                </div>
        </div>
    )
}
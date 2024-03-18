'use client'

import React, { useRef} from "react";
import Button from "@/components/atoms/Button";
import {useRouter} from 'next/navigation'
import useUserState from "@/store/UserState";

import { signIn as signInApi } from "@/apis/auth";
import { setCookie} from "@/utils/cookie";
import {ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE} from "@/constants/auth";

const SignInForm = () => {

    const router = useRouter();
    const { setAuth } = useUserState();

    const userIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onPasswordKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            await signIn();
        }
    }

    const signIn = async () => {
        const userId = userIdRef.current?.value!;
        const password = passwordRef.current?.value!;

        const body = await signInApi({userId, password});

        const response = body.data;
        if(response.status !== 'OK') {
            return;
        }

        setCookie(ACCESS_TOKEN_COOKIE, response.result.accessToken, {
                path: '/',
                maxAge: 86400 * 1000,
            },
        );
        setCookie(REFRESH_TOKEN_COOKIE, response.result.refreshToken, {
                path: '/',
                maxAge: 86400 * 1000,
            },
        );

        setAuth(response.result);

        router.replace('/');
        router.refresh();
    }


    return (
        <div className={"py-4 min-h-[30rem] flex flex-col gap-2"}>
            <label
                className={"block mb-2 font-bold"}
                htmlFor={"userId"}>
                사용자 아이디
                <input
                    className={inputClassName} id={"userId"} color={"gray"} type={"text"} name={"userId"}  ref={userIdRef} />
            </label>
            <label
                className={"block mb-2 font-bold"}
                htmlFor={"password"}>
                비밀 번호
                <input
                    className={inputClassName} id={"password"} type={"password"} name={"password"} ref={passwordRef} onKeyDown={onPasswordKeyDown} />
            </label>
            <Button onClick={signIn} >
                로그인
            </Button>
        </div>
    )
}

const inputClassName = `bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select-none border`;

export default SignInForm;
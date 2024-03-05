'use client'

import {FormEvent, useRef} from "react";
import Button from "@/components/atoms/Button";
import InputField from "@/components/molecule/InputField";
import {redirect, useRouter} from 'next/navigation'
import useAuthState from "@/store/AuthState";

import { signIn as signInApi } from "@/apis/auth";
import {setCookie} from "@/utils/cookie";
import {ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE} from "@/constants/auth";

const SignInForm = () => {

    const router = useRouter()

    const { setAuth } = useAuthState();

    const userIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onPasswordKeyDown = async (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        if(event.key !== 'Enter') return;
        await signIn();
    }

    const signIn = async () => {
        const userId = userIdRef.current?.value!;
        const password = passwordRef.current?.value!;

        const body = await signInApi({userId, password});

        const response = body.data;
        if(response.status !== 'OK') {
            alert(response.message);
            return;
        }

        setCookie(ACCESS_TOKEN_COOKIE, response.result.accessToken, {
                path: '/',
                maxAge: 60000,
            },
        );
        setCookie(REFRESH_TOKEN_COOKIE, response.result.refreshToken, {
                path: '/',
                maxAge: 86400 * 1000,
            },
        );

        router.replace('/');
        router.refresh();
    }

    return (
        <div className={"py-4 min-h-[30rem] flex flex-col gap-2"}>
            <InputField color={"gray"} type={"text"} name={"userId"} label={"사용자 아이디"} ref={userIdRef} />
            <InputField type={"password"} name={"password"} label={"비밀 번호"} ref={passwordRef} onKeyDown={onPasswordKeyDown} />
            <Button onClick={signIn} >
                로그인
            </Button>
        </div>
    )
}

export default SignInForm;
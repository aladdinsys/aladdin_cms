'use client'

import {FormEvent, useEffect, useRef} from "react";
import Button from "@/components/atoms/Button";
import InputField from "@/components/molecule/InputField";
import {useRouter} from 'next/navigation'
import useUserState from "@/store/UserState";

import { signIn as signInApi } from "@/apis/auth";
import {removeCookie, setCookie} from "@/utils/cookie";
import {ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE} from "@/constants/auth";

const SignInForm = () => {

    const router = useRouter();
    const userState = useUserState();

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

        userState.setAuth(response.result);

        router.replace('/');
        router.refresh();
    }

    useEffect(() => {
        userState.signOut();
        removeCookie(ACCESS_TOKEN_COOKIE, {path: '/'});
        removeCookie(REFRESH_TOKEN_COOKIE, {path: '/'});

    },[userState.signOut])

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
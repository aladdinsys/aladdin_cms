'use client'

import {FormEvent, useRef} from "react";
import Button from "@/components/atoms/Button";
import InputField from "@/components/molecule/InputField";
import * as auth from "@/services/auth";
import { useRouter } from 'next/navigation'
import useAuthState from "@/store/AuthState";

const SignInForm = () => {

    const router = useRouter()

    const { setAuth } = useAuthState();

    const userIdRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onPasswordKeyDown = (event: FormEvent<HTMLInputElement>) => {
        // @ts-ignore
        if(event.key !== 'Enter') return;
        signIn();
    }

    const signIn = () => {
        const userId = userIdRef.current?.value!;
        const password = passwordRef.current?.value!;

        const result = auth.signIn({userId, password});
        result.then((response) => {

            setAuth(response);
            router.push('/');

        }).catch((error) => {
            console.error(error);
        });
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
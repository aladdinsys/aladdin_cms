'use client';

import useAuthState from "@/store/AuthState";
import { useRouter } from 'next/navigation'

export default function Nav() {

    const router = useRouter()

    const { 
        accessToken, 
        name,
        signOut
    } = useAuthState();

    function onSingOutHandler() {
        signOut();
        router.push('auth/sign-in');
    }



    return (
        <div className="relative bg-gray-900 p-8 flex flex-row justify-between items-center text-violet-50">
            { accessToken !== '' ?
                <>
                    <div className={"flex-1 flex justify-center"}>
                        메뉴
                    </div>
                    <button onClick={onSingOutHandler}>
                        {name} Sing out
                    </button>
                </>
                :
                <div className={"flex-1 self-end text-right"}>
                    <button onClick={onSingOutHandler}>
                        로그인
                    </button>
                </div>
            }
        </div>
    )
}
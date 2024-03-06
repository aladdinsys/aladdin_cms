'use client';

import useAuthState from "@/store/UserState";
import Link from "next/link";

export default function Nav() {

    const {
        name,
    } = useAuthState();

    return (
        <div className="relative bg-gray-900 p-8 flex flex-row justify-between items-center text-violet-50">
                <Link href={"/"}>Home</Link>
                <Link href={"/user"}>유저들</Link>
                <div className={"flex-1 self-end flex justify-end flex-row gap-4"}>
                    <Link href={"/user/my"}>My</Link>
                    {name ?
                        <span>
                            {name}
                            <Link href={"/auth/sign-in"}>로그 아웃</Link>
                        </span>
                        :
                        <Link href={"/auth/sign-in"}>로그 인</Link>}
                </div>
        </div>
    )
}
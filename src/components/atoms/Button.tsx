'use client'

import {FormEvent, ReactNode} from "react";
import {twMerge} from "tailwind-merge";

type ButtonProps = {
    children: ReactNode;
    color?: string;
    onClick: (event: FormEvent<HTMLButtonElement>) => void;
}

const colorClasses:{[key:string]: string} = {
    primary: 'bg-blue-500 text-white ',
    red:'bg-red-500 text-white',
    green:'bg-green-500 text-white',
    purple:'bg-purple-500 text-white',
    gray:'bg-gray-300 text-black'
}

const Button = ({children, color = 'primary', onClick}: ButtonProps) => {

    return (
        <button type="button"
                className={twMerge(
                    "border rounded-md py-2 px-4 focus:outline-none text-center text-sm font-semibold",
                    colorClasses[color]
                )}
                onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;
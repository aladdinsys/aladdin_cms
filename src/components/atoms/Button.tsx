'use client'

import {FormEvent, ReactNode} from "react";
import {twMerge} from "tailwind-merge";

type ButtonProps = {
    children: ReactNode;
    color?: string;
    className?: string;
    onClick: (event: FormEvent<HTMLButtonElement>) => void;
}

const colorClasses:{[key:string]: string} = {
    primary: 'bg-blue-500 text-white ',
    red:'bg-red-500 text-white',
    green:'bg-green-500 text-white',
    purple:'bg-purple-500 text-white',
    gray:'bg-gray-100 text-black',

    "reversed:red": 'bg-white text-red-500'
}

const Button = ({children, color = 'primary', className, onClick}: ButtonProps) => {

    return (
        <button type="button"
                className={twMerge(
                    "border rounded-md py-2 px-4 focus:outline-none text-center text-sm font-semibold select-none",
                    className,
                    colorClasses[color]
                )}
                onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;
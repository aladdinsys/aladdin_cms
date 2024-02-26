'use client'

import {FormEvent, ReactNode} from "react";

type ButtonProps = {
    children: ReactNode;
    onClick: (event: FormEvent<HTMLButtonElement>) => void;
}

const Button = ({children, onClick}: ButtonProps) => {

    return (
        <button type="button" className="btn btn-primary" onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;
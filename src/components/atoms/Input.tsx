'use client'

import {FormEvent, ForwardedRef, forwardRef} from "react";

type InputProps = {
    type: string;
    name: string;
    className?: string;
    props?: any;
    onKeyDown?: (event: FormEvent<HTMLInputElement>) => void;
}

const Input = forwardRef((
                {type,  name, className, onKeyDown}: InputProps,
                ref: ForwardedRef<HTMLInputElement>
            ) => {
                return (
                    <input type={type} className={className} ref={ref} name={name} onKeyDown={onKeyDown} />
                )
    });

Input.displayName = 'Input';

export default Input;
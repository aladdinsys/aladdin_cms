'use client'

import {FormEvent, ForwardedRef, forwardRef} from "react";
import {twMerge} from "tailwind-merge";

type InputProps = {
    id: string;
    type: string;
    name: string;
    value?: string;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    props?: any;
    onKeyDown?: (event: FormEvent<HTMLInputElement>) => void;
    onChange?: (event: FormEvent<HTMLInputElement>) => void;
}

const Input = forwardRef((
                {
                    id,
                    type,
                    name,
                    value,
                    className,
                    onKeyDown,
                    onChange,
                    placeholder,
                    readOnly
                }: InputProps,
                ref: ForwardedRef<HTMLInputElement>
            ) => {
                return (
                    <input
                        id={id ?? name}
                        type={type}
                        className={twMerge(
                            `bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select-none border`,
                            className
                        )}
                        ref={ref}
                        name={name}
                        onKeyDown={onKeyDown}
                        onChange={onChange}
                        placeholder={placeholder ?? '입력 하세요'}
                        defaultValue={value ?? ''}
                        readOnly={readOnly}
                    />
                )
    });

Input.displayName = 'Input';

export default Input;
import Input from "@/components/atoms/Input";
import {FormEvent, ForwardedRef, forwardRef} from "react";
import {twMerge} from "tailwind-merge";

type InputFieldProps = {
    type: string;
    name: string;
    label: string;
    value?: string;
    color?: string;
    onKeyDown?: (event: FormEvent<HTMLInputElement>) => void;
}


const colorClasses: {[key: string]: string} = {
    gray: 'border-gray-200 focus:border-gray-400',
    violet: 'border-violet-200 focus:border-violet-400',
}

const InputField = forwardRef(
    (
                {type, name, label, value, color = 'violet', onKeyDown}: InputFieldProps,
                ref: ForwardedRef<HTMLInputElement>
            ) => {

        const defaultClass: string = "p-2 focus:outline-none";

        return (
            <div className={twMerge(
                defaultClass,
                colorClasses[color]
            )}>
                <label htmlFor={name}>{label}</label>
                <Input id={name} type={type} name={name} ref={ref} defaultValue={value} onKeyDown={onKeyDown} />
            </div>
        )
})

InputField.displayName = 'InputField';
export default InputField;
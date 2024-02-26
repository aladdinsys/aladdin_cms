import Input from "@/components/atoms/Input";
import {FormEvent, ForwardedRef, forwardRef} from "react";
import classNames from "classnames";

type InputFieldProps = {
    type: string;
    name: string;
    label: string;
    color?: string;
    onKeyDown?: (event: FormEvent<HTMLInputElement>) => void;
}


const colorClasses: {[key: string]: string} = {
    gray: 'border-gray-200 focus:border-gray-400',
    violet: 'border-violet-200 focus:border-violet-400',
}

const InputField = forwardRef(
    (
                {type, name, label, color = 'violet', onKeyDown}: InputFieldProps,
                ref: ForwardedRef<HTMLInputElement>
            ) => {

        const defaultClass: string = "p-2 focus:outline-none";

        return (
            <div className={classNames(defaultClass, colorClasses[color])}>
                <label htmlFor={name}>{label}</label>
                <Input type={type} name={name} ref={ref} onKeyDown={onKeyDown} />
            </div>
        )
})

InputField.displayName = 'InputField';
export default InputField;
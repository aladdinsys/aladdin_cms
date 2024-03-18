import Input from "@/components/atoms/Input";
import {FormEvent, ForwardedRef, forwardRef} from "react";
import {twMerge} from "tailwind-merge";

type InputFieldProps = {
    id: string;
    type: string;
    name: string;
    label: string;
    value?: string;
    color?: string;
    placeholder?: string;
    className?: string;
    readOnly?: boolean;
    onChange?: (event: FormEvent<HTMLInputElement>) => void;
}


const colorClasses: {[key: string]: string} = {
    gray: 'border-gray-200 focus:border-gray-400',
    violet: 'border-violet-200 focus:border-violet-400',
}

const InputField = forwardRef(
    (
                {
                    type,
                    id,
                    name,
                    label,
                    value,
                    color = 'violet',
                    className,
                    onChange,
                    placeholder,
                    readOnly
                }: InputFieldProps,
                ref: ForwardedRef<HTMLInputElement>
            ) => {

        const defaultClass: string = "p-2 focus:outline-none";

        return (
            <div className={twMerge(
                defaultClass,
                colorClasses[color]
            )}>
                <label className="block mb-2 font-bold" htmlFor={id}>{label}</label>
                <Input className={className} id={id} type={type} name={name} value={value} ref={ref} onChange={onChange} placeholder={placeholder} readOnly={readOnly} />
            </div>
        )
})

InputField.displayName = 'InputField';
export default InputField;
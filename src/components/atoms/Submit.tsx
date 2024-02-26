'use client'

import {FormEvent, ReactNode} from "react";

type SubmitProps = {
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLButtonElement>) => void;
}

const Submit = ({children, onSubmit}: SubmitProps) => {

    return (
        <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
            {children}
        </button>
    )
}

export default Submit;
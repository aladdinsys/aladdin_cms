import {ReactNode} from "react";

export default function Contents({children }: {children: ReactNode}) {
    return (
        <main>
            {children}
        </main>
    )
}


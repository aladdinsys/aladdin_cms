import {ReactNode} from "react";

export default function Contents({children }: {children: ReactNode}) {
    return (
        <main className={"w-full flex justify-center px-4"}>
            {children}
        </main>
    )
}


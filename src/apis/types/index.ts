import {ReactNode} from "react";

export type ChildrenProps = {
    children: ReactNode;
}

export type Response<T> = {
    "timestamp": string;
    "status": string;
    "message": string;
    "result": T;
}
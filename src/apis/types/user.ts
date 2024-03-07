export type UserRequest = {
    name: string;
    email: string;
    code: string;
}

export type UserResponse = {
    userId: string;
    name: string;
    email: string;
    code: string;
    role: string;
}
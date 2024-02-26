export type SignInRequest = {
    userId: string;
    password: string;
}

export type SignInResponse = {
    accessToken: string;
    refreshToken: string;
    role: string;
    name: string;
    code: string;
}
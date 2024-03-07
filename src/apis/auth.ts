import { Response } from "@/apis/types";
import {SignInRequest, SignInResponse} from "@/apis/types/auth";
import api from "@/apis/index";

async function signIn(data: SignInRequest) {
    return api.post<Response<SignInResponse>>('/auth/sign-in', data)
        .then((response) => response)
        .catch((error) => error);
}


export { signIn };
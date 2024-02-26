import {post} from "@/services/fetch";
import {Response} from "@/types";
import {SignInRequest, SignInResponse} from "@/types/auth";

async function signIn(data: SignInRequest): Promise<SignInResponse> {

    const response = await post<Response<SignInResponse>>('/auth/sign-in', data);

    if(response.status !== 'OK') {
        throw new Error(response.message);
    }

    return response.result;
}

export { signIn };
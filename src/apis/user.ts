import api from "@/apis/index";
import { Response } from "@/apis/types";
import {UserResponse} from "@/apis/types/user";

async function getUsers() {
    return api.get<Response<UserResponse[]>>('/users')
        .then((response) => response)
        .catch((error) => error);
}

async function getMyInfo() {
    return api.get<Response<UserResponse>>('/my-info')
        .then((response) => {
            console.log('Response', response);
        })
        .catch((error) => error);
}

export { getUsers, getMyInfo };
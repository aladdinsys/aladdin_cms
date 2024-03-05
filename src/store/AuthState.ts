import { create } from 'zustand';
import { SignInResponse } from "@/apis/types/auth";

type AuthState = {
    accessToken: string;
    refreshToken: string;
    name: string;
    code: string;
    role: string;
    signOut: () => void;
    setAuth: (response: SignInResponse) => void;
    setAccessToken: (accessToken: string) => void;
    setName: (name: string) => void;
    setCode: (code: string) => void;
    setRole: (role: string) => void;
}

const useAuthState = create<AuthState>((set) => ({
    accessToken: '',
    refreshToken: '',
    name: '',
    code: '',
    role: '',

    signOut: () => set({
        accessToken: '', refreshToken: '', name: '', code: '', role: ''
    }),
    setAuth: (response: SignInResponse) => set({
        accessToken: response.accessToken, refreshToken: response.refreshToken, name: response.name, code: response.code, role: response.role
    }),
    setAccessToken: (accessToken: string) => set({ accessToken }),
    setName: (name: string) => set({ name }),
    setCode: (code: string) => set({ code }),
    setRole: (role: string) => set({ role }),


}));

export default useAuthState;
import { create } from 'zustand';
import { SignInResponse } from "@/apis/types/auth";

type UserState = {
    name: string;
    code: string;
    role: string;
    signOut: () => void;
    setAuth: (response: SignInResponse) => void;
    setName: (name: string) => void;
    setCode: (code: string) => void;
    setRole: (role: string) => void;
}

const useUserState = create<UserState>((set) => ({
    name: '',
    code: '',
    role: '',
    signOut: () => set({
        name: '', code: '', role: ''
    }),
    setAuth: (response: SignInResponse) => set({
       name: response.name, code: response.code, role: response.role
    }),
    setName: (name: string) => set({ name }),
    setCode: (code: string) => set({ code }),
    setRole: (role: string) => set({ role }),
}));

export default useUserState;
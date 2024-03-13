import { create } from 'zustand';
import { SignInResponse } from "@/apis/types/auth";

type Actions = {
    setAuth: (response: SignInResponse) => void;
    setName: (name: string) => void;
    setCode: (code: string) => void;
    setRole: (role: string) => void;
    
    resetAuth: () => void;
}

type State = {
    name: string;
    code: string;
    role: string;
}

const initialState: State = {
    name: '',
    code: '',
    role: '',
}

const useUserState = create<State & Actions>((set) => ({
    ...initialState,
    setAuth: (response: SignInResponse) => set({
       name: response.name, code: response.code, role: response.role
    }),
    setName: (name: string) => set({ name }),
    setCode: (code: string) => set({ code }),
    setRole: (role: string) => set({ role }),

    resetAuth: () => {
        set(initialState)
    }
}));

export default useUserState;
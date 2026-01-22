import { create } from 'zustand';
import axios from 'axios';
import { register } from '../services/login.service';

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

interface RegisterState {
    formData: RegisterDto;
    loading: boolean;
    error: string | null;
    success: boolean;
    setFormData: (data: Partial<RegisterDto>) => void;
    resetForm: () => void;
    register: (data: RegisterDto) => Promise<void>;
}

const initialFormData: RegisterDto = {
    name: '',
    email: '',
    password: '',
};

export const useRegisterStore = create<RegisterState>((set) => ({
    formData: initialFormData,
    loading: false,
    error: null,
    success: false,

    setFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data },
        })),

    resetForm: () =>
        set({
            formData: initialFormData,
            error: null,
            success: false,
        }),

    register: async (data: RegisterDto) => {
        set({ loading: true, error: null, success: false });
        try {
            await register(data);
            set({ loading: false, success: true });
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
            set({ loading: false, error: errorMessage });
        }
    },
}));

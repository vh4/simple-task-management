import { create } from 'zustand';
import { login } from '../services/login.service';

interface LoginStore {
    formData: {
        email: string;
        password: string;
    };
    loading: boolean;
    error: string | null;
    success: boolean;
    setFormData: (data: Partial<LoginStore['formData']>) => void;
    resetForm: () => void;
    login: (data: LoginStore['formData']) => Promise<void>;
}

export const useLoginStore = create<LoginStore>((set) => ({
    formData: {
        email: '',
        password: '',
    },
    loading: false,
    error: null,
    success: false,
    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
    resetForm: () => set({ formData: { email: '', password: '' }, error: null, success: false }),
    login: async (data: LoginStore['formData']) => {
        set({ loading: true, error: null, success: false });
        try {
            await login({ email: data.email, password: data.password });
            set({ loading: false, success: true });
        } catch (error: any) {
            console.log(error);
            const errorMessage = error.response?.data?.error || 'Login failed';
            set({ loading: false, error: errorMessage });
        }
    },
}));

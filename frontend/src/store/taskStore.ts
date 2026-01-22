import { create } from 'zustand';
import { Task } from '@/app/home/columns';
import { createTask, deleteTask, getTasks, updateTask, CreateTaskRequest, UpdateTaskRequest } from '../services/task.service';

interface TaskStore {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    createTask: (data: CreateTaskRequest) => Promise<void>;
    updateTask: (id: string, data: UpdateTaskRequest) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
    tasks: [],
    loading: false,
    error: null,
    fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
            const tasks = await getTasks();
            set({ tasks, loading: false });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Failed to fetch tasks';
            set({ error: errorMessage, loading: false });
        }
    },
    createTask: async (data) => {
        set({ loading: true, error: null });
        try {
            const newTask = await createTask(data);
            set((state) => ({ tasks: [...state.tasks, newTask], loading: false }));
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Failed to create task';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },
    updateTask: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const updatedTask = await updateTask(id, data);
            set((state) => ({
                tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
                loading: false,
            }));
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Failed to update task';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },
    deleteTask: async (id) => {
        set({ loading: true, error: null });
        try {
            await deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((t) => t.id !== id),
                loading: false,
            }));
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Failed to delete task';
            set({ error: errorMessage, loading: false });
            throw error;
        }
    },
}));

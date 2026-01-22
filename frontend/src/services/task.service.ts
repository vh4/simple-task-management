import axiosInstance from "@/api/middleware";
import { Task } from "@/app/home/columns";

export interface CreateTaskRequest {
    title: string;
    description: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    deadline?: Date | null;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    status?: "PENDING" | "IN_PROGRESS" | "COMPLETED";
    deadline?: Date | null;
}

export const getTasks = async (): Promise<Task[]> => {
    const response = await axiosInstance.get<Task[]>("/task");
    return response.data;
};

export const createTask = async (data: CreateTaskRequest): Promise<Task> => {
    const response = await axiosInstance.post<Task>("/task", data);
    return response.data;
};

export const updateTask = async (id: string, data: UpdateTaskRequest): Promise<Task> => {
    const response = await axiosInstance.put<Task>(`/task/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/task/${id}`);
};

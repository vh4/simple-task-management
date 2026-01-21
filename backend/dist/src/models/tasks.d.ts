import type { TaskDto } from "../dto/tasks.dto.js";
export declare const createTask: (taskData: TaskDto) => Promise<{
    id: string;
    description: string;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const updateTask: (id: string, taskData: TaskDto) => Promise<{
    id: string;
    description: string;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const deleteTask: (id: string) => Promise<{
    id: string;
    description: string;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getTaskById: (id: string) => Promise<{
    id: string;
    description: string;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const getTasks: () => Promise<{
    id: string;
    description: string;
    title: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}[]>;
//# sourceMappingURL=tasks.d.ts.map
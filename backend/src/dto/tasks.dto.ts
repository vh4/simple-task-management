export enum TaskStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export interface TaskDto {
    task_id?: string;
    user_id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    deadline?: Date;
    created_by: string;
}
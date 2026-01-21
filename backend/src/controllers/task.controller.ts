import { taskValidation } from "../validation/task.validation.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../models/tasks.js";
import type { Request, Response } from "express";
import type { TaskDto } from "../dto/tasks.dto.js";

export const createTaskService = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskData: TaskDto = req.body;

        const result: any = taskValidation.safeParse(taskData);

        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }

        const task = await createTask(result.data);
        return res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            error: "Failed to create task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const getTaskService = async (req: Request, res: Response): Promise<any> => {
    try {
        const tasks = await getTasks();
        return res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({
            error: "Failed to fetch tasks",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const updateTaskService = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = req.params.id;
        const taskData: TaskDto = req.body;

        const result: any = taskValidation.safeParse(taskData);

        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }

        const task = await updateTask(taskId as string, result.data);

        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            error: "Failed to update task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const deleteTaskService = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = req.params.id;
        const task = await deleteTask(taskId as string);

        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({
            error: "Failed to delete task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const getTaskByIdService = async (req: Request, res: Response): Promise<any> => {
    try {
        const taskId = req.params.id;
        const task = await getTaskById(taskId as string);

        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }

        return res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({
            error: "Failed to fetch task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

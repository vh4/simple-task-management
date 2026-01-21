var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { taskValidation } from "../validation/task.validation.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../models/tasks.js";
export const createTaskService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskData = req.body;
        const result = taskValidation.safeParse(taskData);
        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }
        const task = yield createTask(result.data);
        return res.status(201).json(task);
    }
    catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({
            error: "Failed to create task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const getTaskService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield getTasks();
        return res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({
            error: "Failed to fetch tasks",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const updateTaskService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const taskData = req.body;
        const result = taskValidation.safeParse(taskData);
        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }
        const task = yield updateTask(taskId, result.data);
        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({
            error: "Failed to update task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const deleteTaskService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield deleteTask(taskId);
        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({
            error: "Failed to delete task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const getTaskByIdService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield getTaskById(taskId);
        if (!task) {
            return res.status(404).json({
                error: "Task not found",
            });
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.error("Error fetching task:", error);
        return res.status(500).json({
            error: "Failed to fetch task",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
//# sourceMappingURL=task.controller.js.map
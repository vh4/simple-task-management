import { prisma } from "../databases/connection.js";
import type { TaskDto } from "../dto/tasks.dto.js";

export const createTask = async (taskData: TaskDto) => {
    const task = await prisma.task.create({
        data: taskData
    })
    return task
}

export const updateTask = async (id: string, taskData: TaskDto) => {
    const task = await prisma.task.update({
        where: {
            id
        },
        data: taskData
    })
    return task
}

export const deleteTask = async (id: string) => {
    const task = await prisma.task.delete({
        where: {
            id
        }
    })
    return task
}

export const getTaskById = async (id: string) => {
    const task = await prisma.task.findUnique({
        where: {
            id
        }
    })
    return task
}

export const getTasks = async () => {
    const tasks = await prisma.task.findMany()
    return tasks
}


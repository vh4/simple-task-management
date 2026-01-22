import { prisma } from "../databases/connection.js";
import type { TaskDto } from "../dto/tasks.dto.js";


export const createTask = async (taskData: TaskDto) => {
    const task = await prisma.task.create({
        data: {
            title: taskData.title,
            description: taskData.description,
            deadline: taskData.deadline,
            status: taskData.status,
            user: {
                connect: { id: taskData.user_id }
            },
            createdBy: {
                connect: { id: taskData.created_by }
            }
        },
        include: {
            user: { select: { id: true, name: true, email: true } },
            createdBy: { select: { id: true, name: true, email: true } }
        }
    });

    return task;
};


export const updateTask = async (id: string, taskData: TaskDto) => {
    const task = await prisma.task.update({
        where: {
            id
        },
        data: taskData,
        include: {
            user: {
                select: { id: true, name: true, email: true }
            },
            createdBy: {
                select: { id: true, name: true, email: true }
            }
        }
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
        },
        include: {
            user: {
                select: { id: true, name: true, email: true }
            },
            createdBy: {
                select: { id: true, name: true, email: true }
            }
        }
    })
    return task
}

export const getTasks = async () => {
    const tasks = await prisma.task.findMany({
        include: {
            user: {
                select: { id: true, name: true, email: true }
            },
            createdBy: {
                select: { id: true, name: true, email: true }
            }
        }
    })
    return tasks
}


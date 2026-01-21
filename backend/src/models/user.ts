import { prisma } from "../databases/connection.js";
import type { UserDto } from "../dto/users.dto.js";

export const createUser = async (userData: UserDto) => {
    const user = await prisma.user.create({
        data: userData
    })
    return user
}

export const getUserByIdOrEmail = async (params: string): Promise<UserDto | null> => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { id: params },
                { email: params },
            ],
        },
        select: {
            name: true,
            email: true,
            password: true,
        }
    });

    return user;
};

export const getUsers = async () => {
    const users = await prisma.user.findMany()
    return users
}

export const updateUser = async (id: string, userData: UserDto) => {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: userData
    })
    return user
}

export const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({
        where: {
            id
        }
    })
    return user
}
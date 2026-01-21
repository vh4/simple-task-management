import type { Request, Response } from "express";
import { createUser, deleteUser, getUserByIdOrEmail, getUsers, updateUser } from "../models/user.js";
import { userValidation } from "../validation/user.validation.js";
import type { UserDto } from "../dto/users.dto.js";
import bcrypt from "bcrypt";

export const createUserService = async (req: Request, res: Response): Promise<any> => {
    try {
        const userData: UserDto = req.body;

        const result: any = userValidation.safeParse(userData);

        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }

        const data: UserDto = {
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        }

        data.password = await bcrypt.hash(data.password, 10);

        const user = await createUser(data);
        return res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            error: "Failed to create user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const getUserService = async (req: Request, res: Response): Promise<any> => {
    try {
        const user = await getUserByIdOrEmail(req.params.id as string);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            error: "Failed to fetch user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const getUsersService = async (req: Request, res: Response): Promise<any> => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            error: "Failed to fetch users",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const updateUserService = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const userData: UserDto = req.body;

        const result: any = userValidation.safeParse(userData);

        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }

        const data: UserDto = {
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        }

        data.password = await bcrypt.hash(data.password, 10);

        const user = await updateUser(userId as string, data);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            error: "Failed to update user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const deleteUserService = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const user = await deleteUser(userId as string);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            error: "Failed to delete user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

export const getUserByIdService = async (req: Request, res: Response): Promise<any> => {
    try {
        const userId = req.params.id;
        const user = await getUserByIdOrEmail(userId as string);

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            error: "Failed to fetch user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};

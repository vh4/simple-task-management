var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, deleteUser, getUserByIdOrEmail, getUsers, updateUser } from "../models/user.js";
import { userValidation } from "../validation/user.validation.js";
import bcrypt from "bcrypt";
export const createUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = userValidation.safeParse(userData);
        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }
        const data = {
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        };
        data.password = yield bcrypt.hash(data.password, 10);
        const user = yield createUser(data);
        return res.status(201).json(user);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            error: "Failed to create user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const getUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield getUserByIdOrEmail(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            error: "Failed to fetch user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const getUsersService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield getUsers();
        return res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({
            error: "Failed to fetch users",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const updateUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const result = userValidation.safeParse(userData);
        if (!result.success) {
            return res.status(400).json({
                error: result.error,
            });
        }
        const data = {
            name: result.data.name,
            email: result.data.email,
            password: result.data.password,
        };
        data.password = yield bcrypt.hash(data.password, 10);
        const user = yield updateUser(userId, data);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({
            error: "Failed to update user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const deleteUserService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield deleteUser(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
            error: "Failed to delete user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
export const getUserByIdService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield getUserByIdOrEmail(userId);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
            error: "Failed to fetch user",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
//# sourceMappingURL=user.controller.js.map
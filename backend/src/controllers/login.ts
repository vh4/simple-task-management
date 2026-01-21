import type { Request, Response } from "express";
import { getUserByIdOrEmail } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const LoginController = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password }: { email: string; password: string } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required",
            });
        }

        const user = await getUserByIdOrEmail(email);
        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                error: "Invalid password",
            });
        }

        // create token jwt and send it to client
        const token = jwt.sign(user, process.env.JWT_SECRET as string);
        return res.status(200).json({
            token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            error: "Login failed",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
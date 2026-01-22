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

        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET as string, {
            expiresIn: "60s",
        });

        const refreshToken = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET as string, {
            expiresIn: "15m",
        });

        const isDev = process.env.NODE_ENV !== "production";

        console.log(`[Login] Setting cookies for user ${user.id}. isDev: ${isDev}`);

        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: !isDev,
            maxAge: 60 * 1000,
            sameSite: isDev ? 'lax' : 'none'
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: !isDev,
            maxAge: 15 * 60 * 1000,
            sameSite: isDev ? 'lax' : 'none'
        });


        return res.status(200).json({
            token,
            refreshToken,
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            error: "Login failed",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export const refreshTokenController = async (req: Request, res: Response): Promise<any> => {
    try {
        const token = req.cookies?.refreshToken;

        console.log("[Refresh] Attempting token refresh. Cookie present:", !!token);

        if (!token) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Refresh token is required - No cookie found",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        if (!decoded) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Invalid refresh token payload",
            });
        }

        const accessToken = jwt.sign({ id: decoded.id, email: decoded.email, name: decoded.name }, process.env.JWT_SECRET as string, {
            expiresIn: "60s",
        });

        const isDev = process.env.NODE_ENV !== "production";

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: !isDev,
            maxAge: 60 * 1000,
            sameSite: isDev ? 'lax' : 'none'
        });

        console.log("[Refresh] Access token refreshed successfully");

        return res.status(200).json({
            accessToken,
        });

    } catch (error) {
        console.error("Error during token refresh:", error);
        return res.status(401).json({
            error: "Unauthorized",
            message: "Invalid or expired refresh token",
        });
    }
}
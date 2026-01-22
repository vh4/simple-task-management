import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export const userMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies?.accessToken;

    if (!token) {
        console.log("[AuthMiddleware] No token found in headers or cookies");
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (typeof decoded === "string") {
            console.log("[AuthMiddleware] Token decoded as string, expected object");
            return res.status(401).json({ error: "Invalid token payload" });
        }

        req.user = decoded;

        next();
    } catch (error) {
        console.log("[AuthMiddleware] JWT Verification failed:", error instanceof Error ? error.message : "Invalid token");
        return res.status(401).json({ error: "Unauthorized" });
    }
}; 

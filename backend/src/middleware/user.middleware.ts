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
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (typeof decoded === "string") {
            return res.status(401).json({ error: "Invalid token payload" });
        }

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({ error: "Unauthorized" });
    }
}; 

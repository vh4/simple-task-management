import type { Request, Response } from "express";
import logger from "../helpers/logger.js";

export const requestLogMiddleware = (req: Request, res: Response, next: Function) => {
    logger.info("Request Log =>", {
        body: JSON.stringify(req.body),
        query: JSON.stringify(req.query),
        params: JSON.stringify(req.params),
        method: req.method,
        url: req.url,
    });
    next();
}
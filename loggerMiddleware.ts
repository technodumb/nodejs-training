import { Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: Function) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;

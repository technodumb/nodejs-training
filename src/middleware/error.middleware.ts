import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";

const errorLoggerMiddleware = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    console.error(err.stack);
    res.status(status).send(message);
};

export default errorLoggerMiddleware;

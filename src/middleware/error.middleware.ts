import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/http.exception";

const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (error instanceof HttpException) {
            const errorObject = {
                error: error.message,
                statusCode: error.status,
                errors: [],
            };
            if (error.validationErrors) {
                const validationErrorValues = [];
                error.validationErrors.forEach((validationError) => {
                    const validationErrorConstraints =
                        validationError.constraints;
                    // console.log(validationErrorConstraints);
                    for (let key in validationErrorConstraints) {
                        // console.log(key);
                        validationErrorValues.push(
                            validationErrorConstraints[key]
                        );
                    }
                });
                errorObject.errors = validationErrorValues;
            }
            res.status(error.status).json(errorObject);
        } else {
            res.status(500).send({ error: error.message });
        }
    } catch (error) {
        console.error(error.stack);
        next(error);
    }
};

export default errorMiddleware;

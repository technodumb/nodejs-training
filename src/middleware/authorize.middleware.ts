import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { JWT_SECRET } from "../utils/constants";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";
import HttpException from "../exception/http.exception";
import { Role } from "../utils/role.enum";

const authorize = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = getTokenFromRequsetHeader(req);

        if (token === "") {
            throw new HttpException(
                401,
                "Token not found. Please login to get access."
            );
        }

        // const payload = jsonwebtoken.verify(token, JWT_SECRET) as jwtPayload;

        // to add the first user with privilege to create employees
        const payload = {
            name: "test",
            email: "test@test.com",
            role: Role.HR,
        };

        req.name = payload.name;
        req.email = payload.email;
        req.role = payload.role;

        return next();
    } catch (error) {
        return next(error);
    }
};
function getTokenFromRequsetHeader(req: RequestWithUser) {
    const bearerToken = req.header("Authorization");
    const token = bearerToken ? bearerToken.replace("Bearer ", "") : "";
    return token;
}

export default authorize;

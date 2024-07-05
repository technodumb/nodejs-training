import { NextFunction, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { JWT_SECRET } from "../utils/constants";
import jsonwebtoken from "jsonwebtoken";
import { jwtPayload } from "../utils/jwtPayload";

const authorize = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = getTokenFromRequsetHeader(req);
        const payload = jsonwebtoken.verify(token, JWT_SECRET) as jwtPayload;

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

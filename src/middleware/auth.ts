import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import dotenv from "dotenv";

dotenv.config();

const {TOKEN_SECRET} = process.env;
export const authorize = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const header: string | undefined = req.headers.authorization;
        const token: string = header?.split(' ')[1] as string;
        jwt.verify(token, TOKEN_SECRET as string);
        next();
    }catch (err) {
        res.status(401).json(`Invalid authentication token  ${err}`);
    }
}
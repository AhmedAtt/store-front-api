import { Request, Response } from 'express';
import { User, UsersModel } from '../models/user';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const model = new UsersModel();

dotenv.config();
const {TOKEN_SECRET} = process.env;


// list users[token required]
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: User[] = await model.index();
        res.json({users});
    } catch (err) {
        res.status(500).json(err);
    }
}

// get user by id[token required]
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = await model.show(parseInt(req.params.id));
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create user[token required]

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        }
        const newUser: User = await model.create(user);
        let token = jwt.sign({ user: newUser },TOKEN_SECRET as string);
        res.json(token);
    } catch (err) {
        res.status(500).json(err);
    }
}
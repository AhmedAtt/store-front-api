import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
} from "../handlers/users.handler";
import {authorize} from "../middleware/auth";

const router = express.Router();


router.get('/users', authorize, getAllUsers);
router.get('/users/:id', authorize, getUserById);
router.post('/users', authorize, createUser);

export default router;



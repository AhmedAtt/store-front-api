import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

export type User = {
    id?: number;
    firstname: string;
    lastname: string;
    password: string;
}
dotenv.config()

const {
    BCRYPT_PASSWORD, SALT_ROUNDS
} = process.env;


export class UsersModel {

    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string));
            const result = await conn.query(sql, [user.firstname, user.lastname, hash]);
            const newUser = result.rows[0];
            conn.release();
            return newUser;
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }

    async authenticate(firstname: string, password: string): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT password FROM users WHERE firstname=($1)';

        const result = await conn.query(sql, [firstname]);

        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                return user;
            }
        }
        return null;
    }

}
import Client from '../database'


export type Order = {
    id: number,
    product_id: number[],
    quantity: number[],
    user_id: number,
    status: string
}

export type User = {
    id: number,
    firstname: string,
    lastname: string,
    password: string
}

export type Product = {
    id: number,
    firstname: string,
    lastname: string,
    password: string
}

export class Store {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get orders: ${err}`)
        }

    }

}

import Client from '../database'

export type Order = {
    id?: number;
    product_ids: number[];
    product_quantities: number[];
    user_id: number;
    status: string;
}


export class OrdersModel {

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }


    async show(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (product_ids, product_quantities, user_id, status) VALUES($1, $2, $3, $4) RETURNING *';
            const result = await conn.query(sql, [order.product_ids, order.product_quantities, order.user_id, order.status]);
            const newOrder = result.rows[0];
            conn.release();
            return newOrder;
        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }
}
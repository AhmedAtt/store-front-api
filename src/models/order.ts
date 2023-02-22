import client from '../database'

export type Order = {
    id?: number;
    user_id: number;
    status: string;
}

export type OrderItem = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
}

export type OrderWithItems = {
    id?: number;
    user_id: number;
    status: string;
    order_items: OrderItem[];

}


export class OrdersModel {

    // create order
    async create(o: OrderWithItems): Promise<OrderWithItems> {
        try {
            let conn = await client.connect();

            let sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const {rows} = await conn.query(sql, [o.user_id, o.status]);
            const order = rows[0];

            const orderItemsSql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            let orderItems = [];

            for (let item of o.order_items) {
                const{rows} =  await conn.query(orderItemsSql, [order.id, item.product_id, item.quantity]);

                orderItems.push(rows[0]);
            }
            await conn.release();
            return {...order, order_items: orderItems};

        } catch (err) {
            throw new Error(`Could not add new order. Error: ${err}`);
        }
    }

    // show active order by user id
    async showActiveOrder(userId: number): Promise<OrderWithItems> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const {rows} = await conn.query(sql, [userId, 'active']);
            const order = rows[0];

            const orderItemsSql = 'SELECT * FROM order_products WHERE order_id=($1)';
            const {rows:orderItems} = await conn.query(orderItemsSql, [order.id]);

            await conn.release();
            return {...order, order_items: orderItems};
        } catch (err) {
            throw new Error(`Could not find active order for user ${userId}. Error: ${err}`);
        }
    }

    // show completed order by user id
    async showCompletedOrders(userId: number): Promise<OrderWithItems[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)';
            const {rows:orders} = await conn.query(sql, [userId, 'complete']);



            const orderItemsSql = 'SELECT * FROM order_products WHERE order_id=($1)';
            const ordersWithItems = [];

            for (let order of orders) {
                const {rows:orderItems} = await conn.query(orderItemsSql, [order.id]);
                ordersWithItems.push({...order, order_items: orderItems});
            }


            await conn.release();
            return ordersWithItems;
        } catch (err) {
            throw new Error(`Could not find completed order for user ${userId}. Error: ${err}`);
        }
    }


}
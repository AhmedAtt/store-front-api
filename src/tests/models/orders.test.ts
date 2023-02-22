import {OrdersModel} from '../../models/order';
import {ProductsModel} from "../../models/product";
import {UsersModel} from "../../models/user";
import Client from "../../database";

const ordersModel = new OrdersModel();
const productsModel = new ProductsModel();
const usersModel = new UsersModel();
describe('Orders Model', () => {
    beforeAll(async () => {
        await usersModel.create({
            firstname: 'John',
            lastname: 'Doe',
            password: 'password'
        });
        await productsModel.create({
            name: 'Product 1',
            price: '10.00',
            category: 'category 1'
        });
        await productsModel.create({
            name: 'Product 2',
            price: '10.00',
            category: 'category 1'
        });

        const order1 = {
            user_id: 1,
            status: 'active',
            order_items: [
                {
                    product_id: 1,
                    quantity: 1,
                    order_id: 1
                },
                {
                    product_id: 2,
                    quantity: 1,
                    order_id: 1
                }
            ]
        };
        const order2 = {
            user_id: 1,
            status: 'complete',
            order_items: [
                {
                    product_id: 1,
                    quantity: 1,
                    order_id: 2
                },
                {
                    product_id: 2,
                    quantity: 1,
                    order_id: 2
                }
            ]
        };


        await ordersModel.create(order1);
        await ordersModel.create(order2);
    });

    it('should have a create order method', () => {
        expect(ordersModel.create).toBeDefined();
    });
    it('should have a show order by user id method', () => {
        expect(ordersModel.showCompletedOrders).toBeDefined();
    });
    it('should have a show completed orders for user method', () => {
        expect(ordersModel.showActiveOrder).toBeDefined();
    });
    it('should get current active order by user Id', async function () {
        const result = await ordersModel.showActiveOrder(1);
        expect(result.user_id).toEqual(1);
        expect(result.status).toEqual('active');
        expect(result.order_items.length).toEqual(2);
    });

    it('should get completed orders by user Id', async function () {
        const result = await ordersModel.showCompletedOrders(1);
        expect(result.length).toEqual(1);
        expect(result[0].user_id).toEqual(1);
        expect(result[0].status).toEqual('complete');
        expect(result[0].order_items.length).toEqual(2);
    });

    afterAll(
        async () => {
            const conn = await Client.connect();
            // delete all tables and reset auto increment
            await conn.query('DELETE FROM order_products');
            await conn.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1');
            await conn.query('DELETE FROM orders');
            await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
            await conn.query('DELETE FROM products');
            await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            await conn.query('DELETE FROM users');
            await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            conn.release();
        }
    );
});
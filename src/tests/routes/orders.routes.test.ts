import superTest from 'supertest';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Client from '../../database';
import { UsersModel } from '../../models/user';
import { OrdersModel } from '../../models/order';
import { ProductsModel } from '../../models/product';

const request = superTest(app);

dotenv.config();

const { TOKEN_SECRET } = process.env;
const TEST_USER = {
  id: 1,
  firstname: 'test',
  lastname: 'test',
  password: 'test',
};
const token = jwt.sign({ user: TEST_USER }, TOKEN_SECRET as string);

const ordersModel = new OrdersModel();
const productsModel = new ProductsModel();
const usersModel = new UsersModel();

describe('Test order endpoints', () => {
  beforeAll(async () => {
    await usersModel.create({
      firstname: 'test',
      lastname: 'test',
      password: 'test',
    });
    await productsModel.create({
      name: 'Product 1',
      price: '10.00',
      category: 'category 1',
    });
    await productsModel.create({
      name: 'Product 2',
      price: '10.00',
      category: 'category 1',
    });

    const order1 = {
      user_id: 1,
      status: 'active',
      order_items: [
        {
          product_id: 1,
          quantity: 1,
          order_id: 1,
        },
        {
          product_id: 2,
          quantity: 1,
          order_id: 1,
        },
      ],
    };
    const order2 = {
      user_id: 1,
      status: 'complete',
      order_items: [
        {
          product_id: 1,
          quantity: 1,
          order_id: 2,
        },
        {
          product_id: 2,
          quantity: 1,
          order_id: 2,
        },
      ],
    };

    await ordersModel.create(order1);
    await ordersModel.create(order2);
  });

  it('should return user active orders', async () => {
    const response = await request
      .get(`/orders/${1}`)
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    const order = response.body.order;
    expect(order.id).toBe(1);
    expect(order.user_id).toBe(1);
    expect(order.status).toBe('active');
    expect(order.order_items.length).toBe(2);
  });

  it('should return user complete orders', async () => {
    const response = await request
      .get(`/orders/completed/${1}`)
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    expect(response.body.orders.length).toBe(1);
  });

  afterAll(async () => {
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
  });
});

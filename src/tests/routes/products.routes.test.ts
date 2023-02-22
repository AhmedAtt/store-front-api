import superTest from 'supertest';
import app from '../../server';
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import Client from "../../database";
import {ProductsModel} from "../../models/product";


const request = superTest(app);

dotenv.config();

const {TOKEN_SECRET} = process.env;
const TEST_USER = {
    id: 1,
    firstname: 'test',
    lastname: 'test',
    password: 'test'
}
let token = jwt.sign({user: TEST_USER}, TOKEN_SECRET as string);

const model = new ProductsModel();


describe('Test product endpoints', () => {
    beforeAll(async () => {
        await model.create({
            name: 'test',
            price: '1',
            category: 'test'
        });
    });

    it('should return a list of products', async function () {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        let product = response.body.products[0];
        expect(product.id).toEqual(1);
        expect(product.name).toEqual('test');
        expect(product.price).toEqual('1');
        expect(product.category).toEqual('test');
    });
    it('should return a product by id', async function () {
        const response = await request.get('/products/1');
        expect(response.status).toBe(200);
        let product = response.body;
        expect(product.id).toEqual(1);
        expect(product.name).toEqual('test');
        expect(product.price).toEqual('1');
        expect(product.category).toEqual('test');

    });
    it('should create a new product', async function () {
        const response = await request.post('/products').set('Authorization', 'Bearer ' + token).send({
            name: 'test',
            price: '1',
            category: 'test'
        });
        expect(response.status).toBe(200);
        let product = response.body;
        expect(product.id).toEqual(2);
        expect(product.name).toEqual('test');
        expect(product.price).toEqual('1');
        expect(product.category).toEqual('test')
    });


    afterAll(async () => {
        const conn = await Client.connect();
        await conn.query('DELETE FROM products');
        await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');

    });
});


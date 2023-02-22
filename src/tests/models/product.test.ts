import {Product, ProductsModel} from "../../models/product";
import Client from "../../database"

const model = new ProductsModel();


describe('Product Model', () => {
    beforeAll(async () => {
        await model.create({
            name: 'test',
            price: '5.26',
            category: 'test',
        });
    });

    it('should have an index method', () => {
        expect(model.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(model.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(model.create).toBeDefined();
    });
    it('index method should return a list of products', async () => {
        const result = await model.index();
        expect(result[0].name).toEqual('test');
        expect(result[0].price).toEqual('5.26');
        expect(result[0].category).toEqual('test');
    });
    it('show method should return a product by id', async () => {
        const result = await model.show(1);
        expect(result.name).toEqual('test');
        expect(result.price).toEqual('5.26');
        expect(result.category).toEqual('test');
    });
    it('create method should add a product', async () => {
        const product: Product = {
            name: 'specialProduct',
            price: '5.26',
            category: 'Special Category',
        };
        const result = await model.create(product);
        expect(result.name).toEqual('specialProduct');
        expect(result.price).toEqual('5.26');
        expect(result.category).toEqual('Special Category');
    });

    afterAll(
        async () => {
            const conn = await Client.connect();
            // delete all products and reset auto increment
             await conn.query('DELETE FROM products');
            await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            conn.release();
        }
    );
});
import Client from '../database'

export type Product = {
    id?: number;
    name: string;
    price: string
}

export class ProductsModel {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Could not get Products. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
    }

    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products ( name,price) VALUES($1, $2) RETURNING *'
            const conn = await Client.connect()
            const result = await conn
                .query(sql, [product.name, product.price])
            const book = result.rows[0]
            conn.release()
            return book
        } catch (err) {
            throw new Error(`Could not add new product ${product.name}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }
}
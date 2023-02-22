import superTest from 'supertest';
import { UsersModel } from '../../models/user';
import app from '../../server';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Client from '../../database';
import bcrypt from 'bcrypt';

const request = superTest(app);

dotenv.config();

const { TOKEN_SECRET, BCRYPT_PASSWORD } = process.env;
const TEST_USER = {
  id: 1,
  firstname: 'test',
  lastname: 'test',
  password: 'test',
};
const model = new UsersModel();
const token = jwt.sign({ user: TEST_USER }, TOKEN_SECRET as string);

describe('Test user endpoints', () => {
  beforeAll(async () => {
    await model.create({
      firstname: 'test',
      lastname: 'test',
      password: 'test',
    });
  });

  it('should return a list of users', async function () {
    const response = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    const user = response.body.users[0];
    expect(user.id).toEqual(1);
    expect(user.firstname).toEqual('test');
    expect(user.lastname).toEqual('test');
    expect(
      bcrypt.compareSync('test' + BCRYPT_PASSWORD, user.password)
    ).toBeTruthy();
  });
  it('should return a user by id', async function () {
    const response = await request
      .get('/users/1')
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
    const user = response.body;
    expect(user.id).toEqual(1);
    expect(user.firstname).toEqual('test');
    expect(user.lastname).toEqual('test');
    expect(
      bcrypt.compareSync('test' + BCRYPT_PASSWORD, user.password)
    ).toBeTruthy();
  });
  it('should create a user', async function () {
    const response = await request
      .post('/users')
      .send({
        firstname: 'test',
        lastname: 'test',
        password: 'test',
      })
      .set('Authorization', 'Bearer ' + token);
    expect(response.status).toBe(200);
  });

  afterAll(async () => {
    const conn = await Client.connect();
    await conn.query('DELETE FROM users');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
  });
});

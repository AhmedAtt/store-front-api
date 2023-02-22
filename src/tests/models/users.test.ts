import { UsersModel } from '../../models/user';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import Client from '../../database';

const model = new UsersModel();

dotenv.config();

const { BCRYPT_PASSWORD } = process.env;
describe('User Model', () => {
  beforeAll(async () => {
    await model.create({
      firstname: 'test',
      lastname: 'test',
      password: 'test',
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
  it('should create a user', async function () {
    const result = await model.create({
      firstname: 'test2',
      lastname: 'test2',
      password: 'test2',
    });
    expect(result.firstname).toBe('test2');
    expect(result.lastname).toBe('test2');
    expect(
      bcrypt.compareSync('test2' + BCRYPT_PASSWORD, result.password)
    ).toBeTruthy();
  });
  it('should return a list of users', async function () {
    const result = await model.index();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toBe(1);
    expect(result[0].firstname).toBe('test');
    expect(result[0].lastname).toBe('test');
    expect(
      bcrypt.compareSync('test' + BCRYPT_PASSWORD, result[0].password)
    ).toBeTruthy();
  });
  it('should return a user by id', async function () {
    const result = await model.show(1);
    expect(result.id).toBe(1);
    expect(result.firstname).toBe('test');
    expect(result.lastname).toBe('test');
    expect(
      bcrypt.compareSync('test' + BCRYPT_PASSWORD, result.password)
    ).toBeTruthy();
  });

  afterAll(async () => {
    const conn = await Client.connect();
    // delete all users and reset auto increment
    await conn.query('DELETE FROM users');
    await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    conn.release();
  });
});

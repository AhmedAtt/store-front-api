import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_DEV_DB_NAME,
    POSTGRES_TEST_DB_NAME,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT
} = process.env;

let client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DEV_DB_NAME,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: parseInt(POSTGRES_PORT? POSTGRES_PORT : '5432')
})


if (ENV === 'test') {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB_NAME,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        port: parseInt(POSTGRES_PORT? POSTGRES_PORT : '5432')
    })
}

export default client;